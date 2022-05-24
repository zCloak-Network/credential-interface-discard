/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-23 18:20:56
 * @LastEditTime: 2022-05-24 14:33:39
 */
import iconCorrect from "../../images/icon_correct.svg";
import iconError from "../../images/icon_error.svg";

export default function TransactionPopup({
  hash,
  title,
  success,
  summary,
}: {
  hash: string;
  success?: boolean;
  summary?: string;
  title?: string;
}) {
  return (
    <div className="transaction-popup">
      <span className="message">
        {success ? (
          <img src={iconCorrect} className="status-img" alt="success" />
        ) : (
          <img src={iconError} className="status-img" alt="fail" />
        )}
        {title}
      </span>
      <div className="description">
        {summary ?? "Hash: " + hash.slice(0, 8) + "..." + hash.slice(58, 65)}
      </div>
    </div>
  );
}
