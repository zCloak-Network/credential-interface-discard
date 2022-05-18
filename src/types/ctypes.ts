/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-21 16:42:32
 * @LastEditTime: 2022-05-16 16:58:43
 */
import { ICTypeMetadata, ICType as SDKICType, ICTypeSchema, InstanceType } from "@kiltprotocol/types";

export interface ICType extends ICTypeMetadata {
  cType: SDKICType;
}

export interface ICTypeWithMetadata {
  cType: SDKICType;
  ctypeHash: string;
  metadata: ICTypeSchema;
  owner:  string | null;
}

export interface ICTypeInput {
  $id: string;
  $schema: string;
  properties: { any: ICTypeInputProperty };
  required: string[];
  title: string;
  description: string;
  type: InstanceType;
  owner: string | null;
}

export interface ICTypeInputProperty {
  title: string;
  $id?: string;
  type?: InstanceType;
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
  type: InstanceType;
  owner?: string;
}
