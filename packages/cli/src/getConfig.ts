import path from "node:path";

import * as p from "@clack/prompts";
import fs from "fs-extra";
import { packageDirectory } from "pkg-dir";
//TODO: json schema 제공

const initialPath = "./src/components/ui";
const jsonFileName = "component.json";

export async function getConfig(): Promise<{ outputPath: string }> {
  const packageDir = await packageDirectory();
  const configPath = path.join(packageDir || process.cwd(), jsonFileName);
  try {
    console.log(configPath);

    const config = await fs.readJSON(configPath); //프로젝트 root 경로에 설정 파일이 있는지 확인
    return config;
  } catch {
    p.note("설정 파일이 존재하지 않습니다");
    const config = await promptConfig(); //3. 사용자에게 경로 관련 입력 받기

    // 4. 새 설정 파일 저장
    await fs.outputJSON(
      configPath,
      {
        ...config,
      },
      { spaces: 2 },
    );

    return config;
  }
}

const promptConfig = async () =>
  p.group(
    {
      outputPath: () =>
        p.text({
          message: "컴포넌트 저장 경로를 설정해주세요",
          initialValue: initialPath,
          validate: value => {
            if (!value) return "Please enter a path.";
            if (!value.startsWith("."))
              return "Please enter a relative path to the project root.";
          },
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    },
  );
