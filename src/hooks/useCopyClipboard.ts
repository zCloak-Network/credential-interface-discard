/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 19:43:29
 * @LastEditTime: 2022-05-13 14:15:16
 */
import copy from "copy-to-clipboard";
import { useCallback, useEffect, useState } from "react";

export default function useCopyClipboard(
  timeout = 500
): [boolean, (toCopy: string) => void] {
  const [isCopied, setIsCopied] = useState(false);

  const staticCopy = useCallback((text: string) => {
    const didCopy = copy(text);
    setIsCopied(didCopy);
  }, []);

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return () => {
        clearTimeout(hide);
      };
    }
    return undefined;
  }, [isCopied, setIsCopied, timeout]);

  return [isCopied, staticCopy];
}
