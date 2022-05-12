/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-14 15:37:27
 * @LastEditTime: 2022-04-14 15:48:33
 */
import { message } from "antd";

export function openMessage(messageText, messageType, messageKey = null) {
  return message[messageType]({
    content: messageText,
    duration: 0,
    key: messageKey,
  });
}

export function destroyMessage(messageKey = null) {
  return message.destroy(messageKey);
}
