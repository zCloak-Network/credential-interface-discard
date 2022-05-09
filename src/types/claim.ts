import { MessageBodyType } from "@kiltprotocol/types";

/*DelegationId*/
type DelegationId = string | null;

/*Attestation*/
export interface IAttestation {
  claimHash: string;
  cinterfaceHash: string;
  delegationId: string | null;
  owner: string;
  revoked: boolean;
}

/*Contents*/
export interface IContents {
  name: string;
  age: number;
  class: number;
  helmet_rarity: number;
  chest_rarity: number;
  weapon_rarity: number;
}

/*Claim*/
export interface IClaim {
  cTypeHash: string;
  contents: IContents;
  owner: string;
}

/*ClaimNonceMap*/
export interface ClaimNonceMap {
  string: string;
}

/*Request*/
export interface IRequest {
  claim: IClaim;
  claimHashes: string[];
  claimNonceMap: ClaimNonceMap;
  legitimations: IAttestedClaim[];
  delegationId: DelegationId;
  rootHash: string;
}

export interface IAttestedClaim {
  attestation: IAttestation;
  request: IRequest;
}

export interface ISubmitAttestation {
  receiver: string;
  sender: string;
  createdAt: number;
  body: {
    content: IAttestedClaim;
    type: MessageBodyType.SUBMIT_ATTESTATION;
  };
  messageId: string;
}
