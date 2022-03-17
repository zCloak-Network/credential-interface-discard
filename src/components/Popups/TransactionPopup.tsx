/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-23 18:20:56
 * @LastEditTime: 2021-12-31 15:16:04
 */
import React from "react";
// import { AlertCircle, CheckCircle } from 'react-feather'

// import ExternalLink from '../../components/ExternalLink'
// import { getExplorerLink } from "../../functions/explorer";
// import { useActiveWeb3React } from "../../hooks";
// import { ExternalLinkIcon } from "@heroicons/react/outline";
import iconCorrect from "../../images/icon_correct.svg";

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
  // const { chainId } = useActiveWeb3React();
  // const { i18n } = useLingui();

  return (
    <div className="transaction-popup">
      <span className="message">
        {success ? (
          <img src={iconCorrect} className="status-img" />
        ) : (
          <img src={iconCorrect} className="status-img" />
        )}
        {title}
      </span>
      <div className="description">
        {summary ?? "Hash: " + hash.slice(0, 8) + "..." + hash.slice(58, 65)}
      </div>
    </div>
    // <div className="pr-4">
    //   {success ? (
    //     <CheckCircle className="text-2xl text-yellow" />
    //   ) : (
    //     <AlertCircle className="text-2xl text-red" />
    //   )}
    // </div>
    // <div className="flex flex-col gap-1">
    //   <div className="font-bold text-high-emphesis">
    //     {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
    //   </div>
    //   {chainId && hash && (
    //     <ExternalLink
    //       className="text-yellow hover:underline p-0 md:p-0"
    //       href={getExplorerLink(chainId, hash, 'transaction')}
    //     >
    //       <div className="flex flex-row items-center gap-1">
    //         {i18n._(t`View on explorer`)} <ExternalLinkIcon width={20} height={20} />
    //       </div>
    //     </ExternalLink>
    //   )}
    // </div>
  );
}
