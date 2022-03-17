/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-03 16:03:26
 * @LastEditTime: 2022-03-16 23:37:04
 */
import React from "react";
import * as common from "schema-based-json-editor";
import Button from "../Button";
import CTypeInputModel from "../../utils/CtypeUtils/CtypeInputSchema";
import SchemaEditor from "../SchemaEditor/index";

import "./index.scss";

type Props = {
  // input
  connected: boolean;
  cType: string;
  isValid: boolean;
  // output
  cancel: () => void;
  submit: () => void;
  updateCType: (cType: any, isValid: boolean) => void;
};

const CTypeEditor: React.FC<Props> = ({
  cancel,
  connected,
  isValid,
  submit,
  cType,
  updateCType,
}) => {
  return (
    <div className="cTypeEditor">
      <SchemaEditor
        schema={CTypeInputModel as common.Schema}
        initialValue={cType}
        updateValue={updateCType}
      />
      <div className="actions">
        <Button
          type="button"
          className="submit-cType"
          disabled={!connected || !isValid}
          onClick={submit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CTypeEditor;
