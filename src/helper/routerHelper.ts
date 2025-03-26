
import React from "react";
import type { NavigateOptions } from "react-router-dom";
import {  useSearchParams } from "react-router-dom";
import * as JSURL from "jsurl";

export function useQueryParam<T>(
  key: string
): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);

  let value = React.useMemo(() => {
    if (paramValue) {
      try {
        return JSURL.parse(paramValue) as T | undefined;
      } catch (error) {
        console.error("Parse error:", error);
        return undefined;
      }
    }
    return undefined;
  }, [paramValue]);

  let setValue = React.useCallback(
    (newValue: T, options?: NavigateOptions) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, JSURL.stringify(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}

export default {useQueryParam };