/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-24 10:33:24
 * @LastEditTime: 2022-03-24 11:33:29
 */

import React from "react";
// import { CheckCircle, Copy } from "react-feather";

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
          {/* <CheckCircle size={"16"} className="icon" /> */}
          <i className="iconfont icon_copy2"></i>
          Copied
        </>
      ) : (
        // <Copy size={"16"} className="icon" />
        <i className="iconfont icon_copy"></i>
      )}
      {isCopied ? "" : props.children}
    </div>
  );
}
