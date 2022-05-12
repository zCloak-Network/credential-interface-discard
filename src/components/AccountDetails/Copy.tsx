/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 19:41:25
 * @LastEditTime: 2021-12-28 20:00:35
 */
import React from "react";
import { CheckCircle, Copy } from "react-feather";

import useCopyClipboard from "../../hooks/useCopyClipboard";

export default function CopyHelper(props: {
  toCopy: string;
  children?: React.ReactNode;
}) {
  const [isCopied, setCopied] = useCopyClipboard();

  return (
    <div onClick={() => setCopied(props.toCopy)}>
      {isCopied ? (
        <>
          <CheckCircle size={"16"} className="icon" />
          Copied
        </>
      ) : (
        <Copy size={"16"} className="icon" />
      )}
      {isCopied ? "" : props.children}
    </div>
  );
}
