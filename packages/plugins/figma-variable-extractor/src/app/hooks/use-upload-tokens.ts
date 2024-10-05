import { useState } from "react";
import { TokenFile } from "../../types";
import { uploadTokens } from "../apis/github";
import { useNavigate } from "react-router-dom";

export function UseUploadTokens() {
  const [isUplaoding, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const upload = async (accessToken: string, designTokens: TokenFile[]) => {
    uploadTokens(accessToken, designTokens);
    setIsUploading(false);
    navigate("/complete");
  };

  const requestDesignTokens = () => {
    setIsUploading(true);
    parent.postMessage(
      {
        pluginMessage: {
          type: "extractTokens",
        },
        pluginId: "*",
      },
      "*",
    );
  };

  return {
    isUplaoding,
    requestDesignTokens,
    upload,
  };
}
