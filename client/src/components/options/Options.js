import React, { useState, useContext, useEffect, useRef } from "react";
import * as classes from "./Options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../../context/VideoContext";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import Hang from "../../assests/hang.svg";
import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { socket } from "../../context/VideoState";

const Options = () => {
  const [idToCall, setIdToCall] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio = useRef();
  const {
    name,
    setName,
    leaveCall,
    answerCall,
    otherUser,
    call,
    callAccepted,
    myVideo,
    callEnded,
    me,
    callUser,
    userVideo,
    stream,
    setOtherUser,
    leaveCall1,
  } = useContext(VideoContext);

  useEffect(() => {  
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal) => {  
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {  
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {    // for the box to accept or deny the call 
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.isReceivingCall]);

  return (
    <div className={classes.options}>
      <div style={{ marginBottom: "0.5rem" }}>
        {/* for entering the name */}
        <h2>Name</h2>           
        <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined />}
          maxLength={15}
          suffix={<small>{name.length}/15</small>}
          value={name}
          onChange={(e) => {      // changing value of the variable name
            setName(e.target.value);
           localStorage.setItem("name", e.target.value);
          }}
          className={classes.inputgroup}
        />

          {/* //for copying the code */}
        <div className={classes.share_options}> 
          <CopyToClipboard text={me}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              className={classes.btn}
              tabIndex="0"
              onClick={() =>{ 
                message.success("Code copied successfully!")
                console.log(me);

              }
              }
            >
              Copy code
            </Button>
          </CopyToClipboard>
            {/* // for sharing the code obtained  */}
          <div className={classes.share_social}>
            <WhatsappShareButton
              url={`https://video-chat-mihir.web.app/`}
              title={`Join this meeting with the given code :` + me}
              separator="Link: "
              className={classes.share_icon}
            >
              <WhatsappIcon size={26} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={`https://video-chat-mihir.web.app/`}
              title={`Join this meeting with the given code ""\n`}
              className={classes.share_icon}
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://video-chat-mihir.web.app/`}
              title={`Join this meeting with the given code  \n`}
              className={classes.share_icon}
            >
              <TwitterIcon size={26} round className={classes.share_border} />
            </TwitterShareButton>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Make a call</h2>
            {/* setting the value of the variable idToCall to the url of the room u r joining */}
        <Input
          placeholder="Enter code to call"
          size="large"
          className={classes.inputgroup}
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter code of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
  {/* // hanging up the call */}
        {callAccepted && !callEnded ? (
          <Button
            variant="contained"
            onClick={leaveCall}
            className={classes.hang}
            tabIndex="0"
          >
            <img src={Hang} alt="hang up" style={{ height: "15px" }} />
            &nbsp; Hang up
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            onClick={() => {      // for call button
              if (name.length) callUser(idToCall); //checking whether u have entered the name or not
              else message.error("Please enter your name to call!");
            }}
            className={classes.btn}
            tabIndex="0"
          >
            Call
          </Button>
        )}
      </div>

      {call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} is calling you:{" "}
                <img
                  src={Phone}
                  alt="phone ringing"
                  className={classes.phone}
                  style={{ display: "inline-block" }}
                />
              </h1>
            </div>
            <div className={classes.btnDiv}>
              <Button
                variant="contained"
                className={classes.answer}
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  answerCall();
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Answer
              </Button>
              <Button
                variant="contained"
                className={classes.decline}
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Decline
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Options;
