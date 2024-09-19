import { Octokit } from "@octokit/rest";
import { TokenFile } from "../../types";
import { config } from "../config";
import { v4 as uuidv4 } from "uuid";

export async function uploadTokens(
  accessToken: string,
  designTokenFiles: TokenFile[]
) {
  const { owner, repo, dir, branch, commitMsg, prTitle, prBody } = config;
  const newBranch = `design-token-${uuidv4()}`;
  const octokit = new Octokit({ auth: accessToken });

  try {
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    });
    const latestCommitSha = refData.object.sha;

    await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranch}`,
      sha: latestCommitSha,
    });

    const { data: baseTreeData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: latestCommitSha,
    });
    const baseTreeSha = baseTreeData.tree.sha;

    const tree = await Promise.all(
      designTokenFiles.map(async (file) => {
        const filePath = `${dir}/${file.fileName}`;
        const jsonContent = JSON.stringify(file.body, null, 2);

        const { data: blobData } = await octokit.git.createBlob({
          owner,
          repo,
          content: jsonContent,
          encoding: "utf-8",
        });
        return {
          path: filePath,
          mode: "100644" as const,
          type: "blob" as const,
          sha: blobData.sha,
        };
      })
    );

    const { data: newTree } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree,
    });

    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: commitMsg,
      tree: newTree.sha,
      parents: [latestCommitSha],
    });

    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${newBranch}`,
      sha: newCommit.sha,
    });

    const { data: pullRequest } = await octokit.pulls.create({
      owner,
      repo,
      head: newBranch,
      base: branch,
      title: prTitle,
      body: prBody,
    });

    console.log(`Pull request created: ${pullRequest.html_url}`);
  } catch (error) {
    console.error("An error occurred during the upload process:", error);
    throw error;
  }
}
