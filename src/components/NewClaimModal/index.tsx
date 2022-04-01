/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:49:32
 * @LastEditTime: 2022-04-01 18:13:23
 */
import React, { useState, useEffect } from "react";
import omit from "omit.js";
import { Claim, CType } from "@kiltprotocol/sdk-js";
import Modal from "../Modal";
import { Form, Input, Select } from "antd";
import { ICTypeWithMetadata } from "../../types/ctypes";
import Button from "../Button";
import { queryCtypes } from "../../services/api";
import {
  useModalOpen,
  useToggleCreateClaimModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import Loading from "../Loading";
import PropertyInput from "./PropertyInput";
import { useSaveClaim, useGetClaims } from "../../state/claim/hooks";
import { useGetCurrIdentity } from "../../state/wallet/hooks";

import "./index.scss";

const { Option } = Select;

export default function NewClaimModal(): JSX.Element {
  const [ctypes, setCtypes] = useState<ICTypeWithMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectCtype, setSelectCtype] = useState(null);
  const saveClaim = useSaveClaim();
  const allClaims = useGetClaims();
  const toggleModal = useToggleCreateClaimModal();
  const currAccount = useGetCurrIdentity();
  const modalOpen = useModalOpen(ApplicationModal.CREATE_CLAIM);

  const getData = async () => {
    const res = await queryCtypes();

    // 已经生成过claim的ctype 不可选
    const allClaimsCurr = allClaims.filter(
      (it) => it?.claim.owner === currAccount?.lightDidDetails?.did
    );
    const isTestedCtype = allClaimsCurr.map((it) => it.claim.cTypeHash) || [];

    const formatData = res.data.data?.filter(
      (it) => !isTestedCtype.includes(it.ctypeHash)
    );

    await setCtypes(formatData);
    await setLoading(false);
  };

  const handleChange = (value) => {
    const find = ctypes.find((it) => it.ctypeHash === value);

    setSelectCtype(find);
  };

  useEffect(() => {
    setLoading(true);
    setSelectCtype(null);
    getData();
  }, [modalOpen]);

  const handleSubmit = async (values) => {
    const newPro = {};
    Object.keys(selectCtype?.metadata?.properties).forEach((key) => {
      newPro[key] = {
        type: selectCtype?.metadata?.properties[key].type,
      };
    });

    const ctype = CType.fromSchema(
      {
        $schema: "http://kilt-protocol.org/draft-01/ctype#",
        title: selectCtype?.metadata?.title,
        properties: newPro,
        type: "object",
      },
      selectCtype.owner
    );

    const claim = Claim.fromCTypeAndClaimContents(
      ctype,
      omit(values, ["ctype", "alias"]),
      currAccount?.lightDidDetails?.did
    );

    await saveClaim(claim, {
      alias: values.alias,
      time: Date.now(),
      ctype: selectCtype,
    });
    await toggleModal();
  };

  return (
    <Modal
      width="700px"
      visible={modalOpen}
      title="Create Claim"
      onCancel={toggleModal}
      wrapClassName="create-claim-modal"
    >
      <div className="create-claim-modal-content">
        {loading && <Loading />}
        {!loading && (
          <Form
            name="basic"
            labelAlign="left"
            colon={false}
            onFinish={handleSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="Claim alias"
              name="alias"
              className="form-item"
              rules={[{ required: true, message: "Please input your alias!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="ctype"
              name="ctype"
              className="form-item"
              rules={[{ required: true, message: "Please input your ctype!" }]}
            >
              <Select style={{ width: "100%" }} onChange={handleChange}>
                {ctypes.map((it) => (
                  <Option value={it.ctypeHash} key={it.ctypeHash}>
                    {it.metadata?.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {selectCtype && (
              <div className="content-wrapper">
                <div className="content-wrapper-header">
                  <span>Name</span>
                  <span>Please enter</span>
                </div>
                {Object.keys(selectCtype?.metadata?.properties)?.map(
                  (key, index) => {
                    const data = selectCtype?.metadata?.properties[key];

                    return (
                      <PropertyInput
                        data={{ title: key, ...data }}
                        key={index}
                      />
                    );
                  }
                )}
              </div>
            )}
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" className="submit-btn" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Modal>
  );
}
