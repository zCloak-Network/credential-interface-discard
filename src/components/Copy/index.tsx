/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-24 10:33:24
 * @LastEditTime: 2022-03-25 17:35:10
 */

import React from "react";

import useCopyClipboard from "../../hooks/useCopyClipboard";

export default function CopyHelper(props: {
  toCopy: string;
  children?: React.ReactNode;
}) {
  const [isCopied, setCopied] = useCopyClipboard();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setCopied(props.toCopy);
      }}
    >
      {isCopied ? (
        <>
          <i className="iconfont icon_copy2"></i>
          Copied
        </>
      ) : (
        <i className="iconfont icon_copy"></i>
      )}
      {isCopied ? "" : props.children}
    </div>
  );
}
