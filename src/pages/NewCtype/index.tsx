/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 14:49:25
 * @LastEditTime: 2022-03-16 23:21:31
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as common from "schema-based-json-editor";
// import SchemaEditor from "../../components/SchemaEditor";
import CTypeEditor from "../../components/CtypeEditor";

// import CTypeInputModel from "../../utils/CtypeUtils/CtypeInputSchema";

import arrowDownInactiveImg from "../../images/icon_arrow_inactive.png";

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

const NewCtype: React.FC = () => {
  const navigate = useNavigate();
  const [cType, setType] = useState<any>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  const handleClick = () => {
    navigate("/attester/ctypes");
  };

  const updateCType = (type: string, isValid: boolean): void => {
    setType(type);
    setIsValid(isValid);
  };

  const connect = () => {
    // TODO: test unmount and host change
    // TODO: test error handling
    // const blockUi: BlockUi = FeedbackService.addBlockUi({
    //   headline: "Connecting to block chain",
    // });
    // setConnected(true);
    // blockUi.remove();
  };

  useEffect(() => {
    // connect();
  }, []);

  const cancel = () => {
    // const { history } = this.props
    // // TODO: goto CTYPE list or previous screen?
    // history.push('/cType')
  };
  // Promise<void>
  const submit = () => {
    // const { selectedIdentity, history } = this.props;
    // const { connected, isValid, cType: stateCtype } = this.state;
    // stateCtype.owner = selectedIdentity?.identity.address;
    // if (selectedIdentity && connected && isValid) {
    //   let cType: CType;
    //   let metaData: ICTypeMetadata;
    //   try {
    //     const inputICTypeWithMetadata = fromInputModel(stateCtype);
    //     ({ cType, metaData } = inputICTypeWithMetadata);
    //   } catch (error) {
    //     errorService.log({
    //       error,
    //       message: "could not create CTYPE from Input Model",
    //       origin: "CTypeCreate.submit()",
    //     });
    //     return;
    //   }
    //   const blockUi: BlockUi = FeedbackService.addBlockUi({
    //     headline: "Creating CTYPE",
    //   });
    //   const cTypeWrapper: ICTypeWithMetadata = {
    //     cType: {
    //       schema: cType.schema,
    //       owner: cType.owner,
    //       hash: cType.hash,
    //     },
    //     metaData,
    //   };
    //   const tx = cType.store();
    //   await BlockchainUtils.signAndSubmitTx(
    //     await tx,
    //     selectedIdentity.identity,
    //     {
    //       resolveOn: BlockchainUtils.IS_IN_BLOCK,
    //     }
    //   )
    //     .then(() => {
    //       blockUi.updateMessage(
    //         `CTYPE stored on blockchain,\nnow registering CTYPE`
    //       ); // TODO: add onrejected when sdk provides error handling
    //     })
    //     .catch((error) => {
    //       errorService.log({
    //         error,
    //         message: "Could not submit CTYPE to the Blockchain",
    //         origin: "CType.store()",
    //       });
    //       notifyError(error);
    //       blockUi.remove();
    //     })
    //     .then(() => {
    //       return CTypeRepository.register(cTypeWrapper)
    //         .then(() => {
    //           blockUi.remove();
    //           notifySuccess(
    //             `CTYPE ${metaData.metadata.title.default} successfully created.`
    //           ); // something better?
    //           history.push("/cType");
    //         })
    //         .catch((error) => {
    //           errorService.log({
    //             error,
    //             message: "Could not submit CTYPE to the Registry",
    //             origin: "CTypeRepository.register()",
    //           });
    //           notifyError(error);
    //           blockUi.remove();
    //         });
    // });
    // }
  };

  return (
    <div className="new-ctype">
      <div className="new-ctype-header">
        <div>
          <img
            src={arrowDownInactiveImg}
            className="back-btn"
            onClick={handleClick}
          />
          Create CTYPE
        </div>
      </div>
      {/* <i className="iconfont icon_development_tasks"></i> */}
      {/* <SchemaEditor
        schema={CTypeInputModel as common.Schema}
        initialValue={cType}
        updateValue={updateCType}
      >
        <div className="actions">
          <button type="button" className="cancel-cType" onClick={cancel}>
            Cancel
          </button>
          <button
            type="button"
            className="submit-cType"
            disabled={!connected || !isValid}
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </SchemaEditor> */}

      <CTypeEditor
        cType={cType}
        updateCType={updateCType}
        submit={submit}
        cancel={cancel}
        connected={connected}
        isValid={isValid}
      />
    </div>
  );
};

export default NewCtype;
