/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 15:26:51
 * @LastEditTime: 2022-03-16 23:43:00
 */
import React from "react";
import { JSONEditor } from "react-schema-based-json-editor";
import * as common from "schema-based-json-editor";

import "./index.scss";

type Props = {
  schema: common.Schema;
  initialValue: common.ValueType;
  updateValue: (value: common.ValueType, _isValid: boolean) => void;
};

const SchemaEditor: React.FC<Props> = ({
  schema,
  initialValue,
  updateValue,
}) => {
  return (
    <div className="schema-based-json-editor">
      <JSONEditor
        schema={schema}
        initialValue={initialValue}
        updateValue={updateValue}
        icon="fontawesome5"
        minItemCountIfNeedFilter={999999}
      />
    </div>
  );
};

export default SchemaEditor;
