const prBody = `> **Warning:** This PR was automatically generated.

## Changes
This pull request updates the design tokens in the \`packages/design-tokens/src\` directory. These changes reflect the latest designs from Figma.

### Next Steps
1. Please review the changes carefully.
2. Test the updated design tokens in your local environment.
3. If everything looks good, approve and merge this PR.

If you have any questions or concerns, please comment on this PR or contact the design team.

---
*This is an automated process. If you encounter any issues, please report them to the development team.*`;

export const config = {
  owner: "krds-study",
  repo: "krds",
  dir: "packages/design-tokens/src",
  branch: "main",
  commitMsg:
    "feat(design-tokens): sync design tokens with latest Figma updates",
  prTitle: "update design tokens from figma plugin",
  prBody,
};
