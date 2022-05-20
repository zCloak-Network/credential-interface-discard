/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-05-20 16:41:13
 */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Button from "../../components/Button";
import { ZKID } from "../../constants/guide";
import { InitDataContext } from "../Guide";
import {
  useToggleGuideReplay,
  useToggleConnectWalletModal,
  useToggleWrongNetworkModal,
} from "../../state/application/hooks";
import { openMessage, destroyMessage } from "../../utils/message";
import { GUIDE_ACCOUNT, GUIDE_CREDENTIAL } from "../../constants/guide";

import Img from "../../images/poap.webp";
import Star from "../../images/star.svg";
import Star_1 from "../../images/star_1.svg";

import "./index.scss";

export interface IButtonStaus {
  button: {
    buttonText: string | React.ReactElement;
    buttonType: string | null;
    func: any;
  }[];
  message: string | null;
  messageType: "warning" | "error" | null;
}

const MESSAGE_KEY = "GUIDE_HOME";

const GuideHome: React.FC = () => {
  const navigate = useNavigate();
  const { error, account } = useWeb3React();
  const [pageStatus, setPageStatus] = useState("loading");
  const toggleGuideReplayModal = useToggleGuideReplay();

  const toggleWrongNetworkModal = useToggleWrongNetworkModal();
  const toggleConnectWalletModal = useToggleConnectWalletModal();
  const initData = useContext(InitDataContext);

  const handleStart = () => {
    navigate("/tutorial/new");
  };

  const jumpToZKID = () => {
    window.open(ZKID);
  };

  const updateMessage = async () => {
    const details = PAGE_STATUS[pageStatus];

    if (details.message) {
      openMessage(details.message, details.messageType, MESSAGE_KEY);
    } else {
      destroyMessage(MESSAGE_KEY);
    }
  };

  const updateStatus = () => {
    const localAccount = localStorage.getItem(GUIDE_ACCOUNT);
    const credentail = localStorage.getItem(GUIDE_CREDENTIAL);

    if (error instanceof UnsupportedChainIdError) {
      setPageStatus("switchNetwork");
    }
    if (!account) {
      setPageStatus("connect");
      return;
    }

    if (!initData.poapId && !initData.nftId && localAccount && credentail) {
      setPageStatus("replayWithNewAccount");

      return;
    }

    if (initData.poapId && initData.nftId && !localAccount && !credentail) {
      setPageStatus("playedError");
      return;
    }

    if (initData.poapId && initData.nftId && localAccount && credentail) {
      setPageStatus("played");
      return;
    }

    setPageStatus("getStart");
  };

  const PAGE_STATUS: {
    [statusName: string]: IButtonStaus;
  } = {
    loading: {
      button: [
        {
          buttonText: "loading",
          buttonType: "loading",
          func: null,
        },
      ],
      message: null,
      messageType: null,
    },
    connect: {
      button: [
        {
          buttonText: (
            <div>
              Connect wallet and Get start
              <i className="iconfont icon_1"></i>
            </div>
          ),
          buttonType: null,
          func: toggleConnectWalletModal,
        },
      ],
      message: null,
      messageType: null,
    },
    switchNetwork: {
      button: [
        {
          buttonText: "Switch network",
          buttonType: null,
          func: toggleWrongNetworkModal,
        },
      ],
      message: "You are on the wrong network",
      messageType: "error",
    },
    getStart: {
      button: [
        {
          buttonText: (
            <div>
              Get start<i className="iconfont icon_1"></i>
            </div>
          ),
          buttonType: null,
          func: handleStart,
        },
      ],
      message: null,
      messageType: null,
    },
    playedError: {
      button: [
        {
          buttonText: "Change account in MetaMask",
          buttonType: null,
          func: null,
        },
      ],
      message: "You have already received POAP,  please change account.",
      messageType: "error",
    },
    played: {
      button: [
        {
          buttonText: (
            <div>
              Replay<i className="iconfont shuaxin iconfont-refresh"></i>
            </div>
          ),
          buttonType: null,
          func: toggleGuideReplayModal,
        },
        {
          buttonText: (
            <div>
              Go To Dashboard <i className="iconfont icon_1"></i>
            </div>
          ),
          buttonType: null,
          func: jumpToZKID,
        },
      ],
      message: null,
      messageType: null,
    },
    replayWithNewAccount: {
      button: [
        {
          buttonText: (
            <div>
              Replay<i className="iconfont shuaxin iconfont-refresh"></i>
            </div>
          ),
          buttonType: null,
          func: toggleGuideReplayModal,
        },
      ],
      message: null,
      messageType: null,
    },
  };

  useEffect(() => {
    updateStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, error, initData]);

  useEffect(() => {
    updateMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageStatus]);

  const detail = PAGE_STATUS[pageStatus];

  return (
    <div className="guide-home">
      <div className="guide-content">
        <div className="guide-home-left">
          <div className="guide-home-left-title">
            A Privacy-Preserving <br />
            Passport to the <br />
            Web 3.0 World
            <span className="guide-home-left-icon">
              <img src={Star} alt="" />
              <img src={Star_1} alt="" className="star-img" />
            </span>
          </div>
          <div className="guide-home-left-desc">
            Prove who you are, without telling who you are.
            <br /> Data and computation, keep both in your own hands.
          </div>
          {detail.button.map((it, index) => (
            <Button className="guide-home-btn" onClick={it.func} key={index}>
              {it.buttonText}
            </Button>
          ))}
        </div>
        <div className="guide-home-right">
          <img src={Img} alt="poap" />
        </div>
      </div>
    </div>
  );
};
export default GuideHome;
