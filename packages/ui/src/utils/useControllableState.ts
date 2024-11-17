/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const useCallbackRef = <T extends (...args: any[]) => any>(
  callback?: T,
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(
    () =>
      (...args: any[]) =>
        callbackRef.current?.(...args),
    [],
  );
};
//그냥 useState인데, onChange 이벤트를 할수있게 해준 hook
export const useUncontrolledState = <T>({
  defaultValue,
  onChange,
}: {
  defaultValue?: T | undefined;
  onChange?: (params: T) => void;
}) => {
  const unControlledState = useState(defaultValue);
  const [value] = unControlledState;
  const handleChange = useCallbackRef(onChange);
  const ref = useRef(value);
  useEffect(() => {
    if (ref.current !== value) {
      handleChange(value);
      ref.current = value;
    }
  }, [value, ref, handleChange]);

  return unControlledState;
};

type SetStateFn<T> = (prev: T) => void;

type UseControllableState<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};

export const useControlledState = <T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableState<T>) => {
  const isControlled = prop !== undefined;
  const [unControlledProp, setUncontrolledProp] = useUncontrolledState({
    defaultValue: defaultProp,
    onChange,
  });

  const value = isControlled ? prop : unControlledProp;
  const handleChange = useCallbackRef(onChange);
  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    nextValue => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value !== prop) {
          handleChange?.(value as T);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange],
  );

  return [value, setValue] as const;
};
