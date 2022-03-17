/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 14:20:49
 * @LastEditTime: 2022-03-16 16:30:51
 */
import React from "react";
import ListItem from "./ListItem";
import { Select } from "antd";
import DetailModal from "../DetailModal";

import "./index.scss";

const data = [
  {
    claimer: "lixin",
    ctype: "zcloak",
    status: "pending",
    time: "2021-12-02 17:34:53",
  },
  {
    claimer: "lixin2",
    ctype: "zcloak",
    status: "pending",
    time: "2021-12-02 17:34:53",
  },
];

const STATUS = ["Pending", "processed"];

const Option = Select.Option;

const detail = {
  claim: {
    cTypeHash: "oxxxxxx",
    contents: {
      age: 22,
    },
    owner: "oxxxxxxxxx",
  },
};

const Content: React.FC = () => {
  const handleTypeChange = () => {};

  return (
    <div className="attester-content">
      <div className="select-wrapper">
        <Select
          defaultValue=""
          onChange={handleTypeChange}
          className="status-select"
        >
          <Option value={""} key="all">
            All
          </Option>
          {STATUS.map((it) => (
            <Option value={it} key={it}>
              {it}
            </Option>
          ))}
        </Select>
      </div>

      <div className="header">
        <span></span>
        <span>Claimer</span>
        <span>Ctype</span>
        <span>status</span>
        <span>Time</span>
        <span></span>
      </div>
      <div className="content-list">
        {data.map((it, index) => (
          <ListItem data={it} index={index + 1} key={index} />
        ))}
      </div>

      <DetailModal data={detail} />
    </div>
  );
};
export default Content;
