/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-04-28 18:17:11
 */
import React from "react";
import GuideHeader from "../../components/GuideHeader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { ZKID } from "../../constants/guide";

import Img from "../../images/png_home.png";
import Star from "../../images/star.svg";
import Star_1 from "../../images/star_1.svg";

import "./index.scss";

const Guide: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tutorial/new");
  };

  const jumpToZKID = () => {
    window.open(ZKID);
  };

  return (
    <div className="guide-home">
      <GuideHeader />
      <div className="guide-content">
        <div className="guide-home-left">
          <div className="guide-home-left-title">
            A Privacy-Preserving <br />
            Passport to the DeFi <br />
            World
            <span className="guide-home-left-icon">
              <img src={Star} alt="" />{" "}
              <img src={Star_1} alt="" className="star-img" />
            </span>
          </div>
          <div className="guide-home-left-desc">
            It helps users to perform computation and analysis on their data to
            acquire corresponding services without sending their data to 3rd
            parties, which might expose their privacy.
          </div>
          <Button className="guide-home-btn" onClick={handleClick}>
            Go To Tutorial <i className="iconfont icon_1"></i>
          </Button>
          <Button className="guide-home-btn" onClick={jumpToZKID}>
            Go To Dashboard <i className="iconfont icon_1"></i>
          </Button>
        </div>
        <div className="guide-home-right">
          <img src={Img} alt="" />
          {/* <div className="guide-home-right-content">
            <p className="guide-home-right-title">zkID POAP</p>
            <p className="guide-home-right-desc">
              After completing the registration
              <br />
              operation, you can get an nft.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Guide;
