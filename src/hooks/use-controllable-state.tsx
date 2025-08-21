import { Dispatch, SetStateAction, useCallback, useState } from "react";

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: Dispatch<SetStateAction<T>>;
}): [T, (next: T | ((prev: T) => T)) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;

  const state = isControlled ? value : internalValue;

  const setState = useCallback(
    (next: T | ((prev: T) => T)) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [state, setState];
}
