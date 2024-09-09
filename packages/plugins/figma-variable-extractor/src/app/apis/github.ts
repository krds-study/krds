import { Octokit } from "@octokit/rest";
import { TokenFile } from "../../types";
import { config } from "../config";
import { v4 as uuidv4 } from "uuid";

export async function uploadTokens(
  accessToken: string,
  designTokenFiles: TokenFile[]
) {
  const { owner, repo, dir, branch, CommitMsg } = config;
  const newBranch = `design-token-${uuidv4()}`;
  const octokit = new Octokit({ auth: accessToken });

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

      const blob = new Blob([jsonContent], { type: "application/json" });
      const arrayBuffer = await blob.arrayBuffer();
      const base64Content = btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer))
      );

      const blobData = await octokit.git.createBlob({
        owner,
        repo,
        content: base64Content,
        encoding: "utf-8",
      });
      return {
        path: filePath,
        mode: "100644" as const,
        type: "blob" as const,
        sha: blobData.data.sha,
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
    message: CommitMsg,
    tree: newTree.sha,
    parents: [latestCommitSha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${newBranch}`,
    sha: newCommit.sha,
  });
}
