import clone from "lodash/clone";
import { useDebugValue, useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Subscription } from "rxjs/internal/Subscription";
import { AcceptableTypes } from "../types";

/** Subject Hook */
export function useSubject<T extends AcceptableTypes>(
  /** Subject */ subject: BehaviorSubject<T>,
  /** Debug Name */ debugName?: string
): [T, (applier: (prev: T) => void) => void] {
  let subscription: Subscription;
  const [value, setState] = useState(subject.getValue());
  if (!!debugName) useDebugValue(debugName);

  useEffect(() => {
    subscription = subject.subscribe((v) => setState(v));
    return () => subscription.unsubscribe();
  }, []);

  const setValue = (applier: (prev: T) => void) => {
    const cloned = clone(value);
    applier(cloned);
    subject.next(cloned);
  };

  return [value, setValue];
}
