/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-14 15:37:27
 * @LastEditTime: 2022-05-13 15:24:14
 */
import { message } from "antd";

export function openMessage(messageText: string | null, messageType: 'warning' |'error' | null, messageKey?: string ) {
  if(messageText && messageType) {
    return message[messageType]({
      content: messageText,
      duration: 0,
      key: messageKey,
    });
  }
}

export function destroyMessage(messageKey?: string) {
  return message.destroy(messageKey);
}
