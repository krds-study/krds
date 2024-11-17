import { textField, TextFieldVariant } from "@styled-system/recipes";
import { createContext, useContext } from "react";

import { useControlledState } from "../../utils/useControllableState";

type TextFieldContextType = {
  state?: TextFieldVariant["state"];
  setState?: (state: TextFieldVariant["state"]) => void;
  value?: string | undefined;
  setValue?: (value: string) => void;
  maxLength?: number;
};

const TextFieldContext = createContext<TextFieldContextType | undefined>(
  undefined,
);

const useTextField = () => {
  const context = useContext(TextFieldContext);
  if (!context) {
    throw new Error(
      "TextField compound components must be used within TextField",
    );
  }
  return context;
};

type TextFieldRootProps = Partial<TextFieldVariant> & {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onStateChange?: (state: TextFieldVariant["state"]) => void;
  maxLength?: number;
};

const TextFieldRoot = ({
  state,
  onStateChange,
  value,
  defaultValue,
  maxLength,
  onChange,
  children,
}: TextFieldRootProps) => {
  const styles = textField({ state });

  const [innerValue, setValue] = useControlledState({
    prop: value,
    onChange,
    defaultProp: defaultValue,
  }); //value 관리 state

  const [innerState, setInnerState] = useControlledState({
    prop: state,
    onChange: onStateChange,
    defaultProp: "default",
  });

  return (
    <TextFieldContext.Provider
      value={{
        state: innerState,
        value: innerValue,
        setValue,
        setState: setInnerState,
        maxLength,
      }}
    >
      <div className={styles.root}>{children}</div>
    </TextFieldContext.Provider>
  );
};

const TextFieldLabel = ({ children }: { children: React.ReactNode }) => {
  const { state } = useTextField();
  const styles = textField({ state });

  return <label className={styles.label}>{children}</label>;
};

const TextFieldInput = ({ disabled }: { disabled?: boolean }) => {
  const { state, value, setValue } = useTextField();
  const styles = textField({ state });

  return (
    <textarea
      className={styles.input}
      value={value}
      disabled={disabled}
      onChange={e => typeof setValue === "function" && setValue(e.target.value)}
    />
  );
};

const TextFieldCounter = () => {
  const { state, value, maxLength } = useTextField();
  const styles = textField({ state });
  return (
    <div className={styles.counter}>
      {value?.length ?? 0}/{maxLength}
    </div>
  );
};

export const TextField = Object.assign(TextFieldRoot, {
  Label: TextFieldLabel,
  Input: TextFieldInput,
  Counter: TextFieldCounter,
});
