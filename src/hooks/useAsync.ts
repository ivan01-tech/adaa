import { useCallback, useEffect, useState } from "react";

export const useAsync = function (func: (params: unknown) => unknown) {
  const { executeFn, ...state } = useAsyncInternal(func, true, []);

  useEffect(function () {
    executeFn();
  }, [executeFn]);

  return state;
};
export const useAsyncFn = function (
  func: (params: unknown) => unknown,
  dependencies = []
) {
  return useAsyncInternal(func, false, dependencies);
};

/**
  An object that content error , loading , and the value of the resquest
 */
export function useAsyncInternal(
  func:  (params: unknown[]) => unknown,
  initial: boolean,
  dependencies: unknown[] = []
) {
  //state to handle to resquest correctly
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(initial);
  const [value, setValue] = useState<unknown>(null);

  /**
   * a function that will be call in orderto make the resquest at needed time
   */
  const executeFn = useCallback(
   async function (...params: unknown[]) {
      setLoading(true);
      return func(...params)
        .then((res) => {
          setValue(res);
          setError(null);
          return res;
        })
        .catch((err) => {
          // TODO
          setError(err);
          setValue(undefined);
          return Promise.reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [func,...dependencies]
  );

  return { error, loading, value, executeFn };
}
