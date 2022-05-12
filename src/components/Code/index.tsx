/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-02-25 17:38:07
 * @LastEditTime: 2022-03-16 15:45:49
 */
import React, { ReactNode } from "react";
import ReactJsonView, { ReactJsonViewProps } from "react-json-view";

import "./index.scss";

type Props = {
  children?: ReactNode;
  collapsed?: boolean | number;

  onAdd?: ReactJsonViewProps["onAdd"];
  onEdit?: ReactJsonViewProps["onEdit"];
};

const Code: React.FC<Props> = ({ children, collapsed, onAdd, onEdit }) => {
  if (children && typeof children === "object") {
    return (
      <ReactJsonView
        src={children}
        name={false}
        theme="monokai"
        collapsed={collapsed != null ? collapsed : 1}
        collapseStringsAfterLength={30}
        enableClipboard
        displayDataTypes={false}
        onEdit={onEdit}
        onAdd={onAdd}
      />
    );
  }
  return <pre className="Code">{String(children)}</pre>;
};

export default Code;
