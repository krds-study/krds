import React, { useEffect, useState } from "react";
import {
  ExtractTokenAction,
  ExtractTokenActionPayload,
  PluginMessage,
} from "../../types";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { UseUploadTokens } from "../hooks/use-upload-tokens";
import { Loader2 } from "lucide-react";

const Extract: React.FC = () => {
  const { isUplaoding, requestDesignTokens, upload } = UseUploadTokens();
  const [acessToken, setAcessToken] = useState("");

  useEffect(() => {
    window.onmessage = async (
      event: MessageEvent<
        PluginMessage<ExtractTokenAction, ExtractTokenActionPayload>
      >
    ) => {
      const { type, payload } = event.data.pluginMessage;
      if (type === "extractTokens" && payload) {
        upload(acessToken, payload);
      }
    };
  }, [acessToken]);

  return (
    <div className="flex flex-col gap-2 mx-3 my-2">
      <p className="text-xs">
        You will need a token with access rights to upload to the GitHub
        repository. Please contact the development team for information about
        the token.
      </p>
      <Label htmlFor="token">Token</Label>
      <Input
        id="token"
        value={acessToken}
        onChange={(e) => setAcessToken(e.target.value)}
      />
      <Button
        disabled={isUplaoding || !acessToken}
        onClick={requestDesignTokens}
        size="sm"
      >
        {isUplaoding ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading
          </>
        ) : (
          "Extract"
        )}
      </Button>
    </div>
  );
};

export default Extract;
