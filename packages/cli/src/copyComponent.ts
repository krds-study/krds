import path from "node:path";
import { fileURLToPath } from "node:url";

import * as p from "@clack/prompts";
import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COMPONENTS_DIR = (component: string) =>
  path.join(__dirname, `../dist/components/${component}/index.tsx`);

export async function copyComponent(componentName: string, outputPath: string) {
  const s = p.spinner();
  try {
    s.start(`Copying ${componentName} component...`);

    // 1. 컴포넌트 코드가 있는 경로
    const sourceFile = COMPONENTS_DIR(componentName);

    // 2. 유저 로컬 폴더 저장 경로 (CLI 실행 위치 기준)
    const targetFile = path.join(
      process.cwd(),
      outputPath,
      `${componentName}.tsx`,
    );

    await fs.copy(sourceFile, targetFile);

    s.stop(`✨ Successfully copied ${componentName} component`);

    p.note(
      `Component location: ${path.join(outputPath, componentName)}.tsx`,
      "Component copied!",
    );
  } catch (error) {
    s.stop("Failed to copy component");
    p.cancel(
      `Error copying component: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw new Error(`Failed to copy component: ${error}`);
  }
}
