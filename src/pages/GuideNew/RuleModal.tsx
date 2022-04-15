/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-12 22:55:50
 * @LastEditTime: 2022-04-15 11:43:41
 */
import React from "react";
import Modal from "../../components/Modal";
import {
  useModalOpen,
  useToggleGuideRule,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { ZKPROGRAM } from "../../constants/guide";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

import "./RuleModal.scss";

const RuleModal: React.FC = () => {
  const toggleModal = useToggleGuideRule();
  const modalOpen = useModalOpen(ApplicationModal.GUIDE_RULE);

  return (
    <Modal
      width="656px"
      visible={modalOpen}
      title="zkPortrait Issuance Rule"
      onCancel={toggleModal}
      wrapClassName="rule-modal"
    >
      <p className="content-title">
        The zkPortrait classification and other calculation rules are as
        follows:
      </p>
      <table className="table">
        <tr className="table-header">
          <th>Profession</th>
          <th>Damage Type</th>
          <th>Age</th>
          <th>Portrait</th>
        </tr>
        <tr>
          <td rowSpan={2}>{`Warrior & Paladin`}</td>
          <td rowSpan={2}>Physical Damage</td>
          <td>{`Age < 18`}</td>
          <td>Hold a Shield</td>
        </tr>
        <tr>
          <td>Age ≥ 18</td>
          <td>Hold a Sword</td>
        </tr>
        <tr>
          <td rowSpan={2}>{`Priest & Mage`}</td>
          <td rowSpan={2}>Magical Damage</td>
          <td>{`Age < 18`}</td>
          <td>Hold a Spellbook</td>
        </tr>
        <tr>
          <td>Age ≥ 18</td>
          <td>Hold a Wand</td>
        </tr>
        <tr>
          <td colSpan={4}>
            P.s. If the average of all equipment rarities is over 6, the
            Adventurer‘s zkPortrait will be gold-edged.
          </td>
        </tr>
      </table>
      <p className="content-title">Features:</p>
      <p>1. Range Check—to check whether the Summoner’s age is over 18.</p>
      <p>
        2. Membership Check—to check whether the profession belongs to
        Physical/Magical Damage group.
      </p>
      <p>
        3. Rarity calculation—to compute the average of all equipment rarities.
      </p>
      <p className="content-title">Program Hash</p>
      <p>{ZKPROGRAM.hash}</p>
      <p className="content-title">zkVM Program Code</p>
      <AceEditor
        mode="javascript"
        theme="terminal"
        value={ZKPROGRAM.detail}
        name="UNIQUE_ID_OF_DIV"
        className="program-code"
        editorProps={{ $blockScrolling: true }}
      />
    </Modal>
  );
};
export default RuleModal;
