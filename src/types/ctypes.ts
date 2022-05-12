/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 16:42:32
 * @LastEditTime: 2022-03-16 15:38:38
 */
import { ICTypeMetadata, ICType as SDKICType } from "@kiltprotocol/types";

export interface ICType extends ICTypeMetadata {
  cType: SDKICType;
}

export interface ICTypeWithMetadata {
  cType: SDKICType;
  ctypeHash: string;
  metadata: ICTypeInput;
}

export interface ICTypeInput {
  $id: string;
  $schema: string;
  properties: { any: ICTypeInputProperty };
  required: string[];
  title: string;
  description: string;
  type: string;
  owner: string | null;
}

export interface ICTypeInputProperty {
  title: string;
  $id?: string;
  type: string;
  format?: string;
  description?: string;
}

export interface IClaimInput {
  $id: string;
  $schema: string;
  properties: any;
  required: string[];
  title: string;
  description?: string;
  type: string;
  owner?: string;
}
