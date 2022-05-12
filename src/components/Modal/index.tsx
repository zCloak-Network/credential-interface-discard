/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:13:47
 * @LastEditTime: 2022-04-12 10:59:40
 */
import React, { useMemo } from "react";
import { Modal } from "antd";
import classNames from "classnames";

import closeImg from "../../images/close.png";

import "./index.scss";

interface Props {
  visible: boolean;
  hasDivider?: boolean;
  maskClosable?: boolean;
  title: string;
  wrapClassName?: string;
  onCancel: () => void;
  children?: React.ReactNode;
  width?: string;
}

export default function MyModal({
  title,
  maskClosable = true,
  hasDivider = false,
  visible,
  onCancel,
  children,
  wrapClassName,
  ...rest
}: Props): JSX.Element {
  const wrapClassNames = useMemo(
    () => classNames("my-modal-component", wrapClassName),
    [wrapClassName]
  );

  return (
    <Modal
      footer={null}
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      maskClosable={maskClosable}
      destroyOnClose={true}
      wrapClassName={wrapClassNames}
      closeIcon={
        <span className="close-btn">
          <img src={closeImg} />
        </span>
      }
      {...rest}
    >
      <div className={classNames("title", { "has-divider": hasDivider })}>
        {title}
      </div>
      {hasDivider && <i className="divider" />}
      {children}
    </Modal>
  );
}
