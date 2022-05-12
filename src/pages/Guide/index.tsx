/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-08 10:34:13
 * @LastEditTime: 2022-05-09 19:03:34
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
          <Button className="guide-home-btn" onClick={handleClick}>
            Go to Tutorial <i className="iconfont icon_1"></i>
          </Button>
          <Button className="guide-home-btn" onClick={jumpToZKID}>
            Go to Dashboard <i className="iconfont icon_1"></i>
          </Button>
        </div>
        <div className="guide-home-right">
          <img src={Img} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Guide;
