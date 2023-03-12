import clone from "lodash/clone";
import { useDebugValue, useState } from "react";
import { AcceptableTypes } from "../types";

/** Signal Hook */
export function useSignal<T extends AcceptableTypes>(
 /** Initial Value */ initialValue: T,
 /** Debug Name */ debugName?: string
): [T, (applier: (prev: T) => void) => void] {
  const [value, setState] = useState(initialValue);

  if (!!debugName) useDebugValue(debugName);

  const setValue = (applier: (prev: T) => void) => {
    const cloned = clone(value);
    applier(cloned);
    setState(cloned);
  };

  return [value, setValue];
}
