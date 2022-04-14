/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-12 16:11:50
 * @LastEditTime: 2022-04-14 16:55:34
 */
export const credentialClass = [
  {
    name: "Warrior",
    value: 1,
  },
  {
    name: "Paladin",
    value: 2,
  },
  {
    name: "Priest",
    value: 3,
  },
  {
    name: "Mage",
    value: 4,
  },
];

export const ADMINATTESTER =
  "did:kilt:4rdUX21mgJYGPpU3PmmjSMDkthg9yD2eFeRXyh84tD6ssvS4";

export const CTYPE = {
  $schema: "http://kilt-protocol.org/draft-01/ctype#",
  title: "credential_test0412",
  properties: {
    name: {
      type: "string",
    },
    class: {
      type: "integer",
    },
    age: {
      type: "integer",
    },
    helmet_rarity: {
      type: "integer",
    },
    chest_rarity: {
      type: "integer",
    },
    weapon_rarity: {
      type: "integer",
    },
  },
  type: "object",
};

export const CTYPEHASH =
  "0xe21c5f437332f33db0e6f9cef958f2ff3fedfbcdeb60d4ff24db978b487aad1a";

export const MESSAGECODE = {
  GET_CREDENTIAL_SEND: "GET_CREDENTIAL_SEND",
  GET_CREDENTIAL_BACK: "GET_CREDENTIAL_BACK",
  OPEN_GENERATE_PROOF: "OPEN_GENERATE_PROOF",
  OPEN_IMPORT_CREDENTIAL: "OPEN_IMPORT_CREDENTIAL",
  GENRATE_PROOF_SEND: "GENRATE_PROOF_SEND",
  GENRATE_PROOF_BACK: "GENRATE_PROOF_BACK",
  SEND_PROOF_TO_WEB: "SEND_PROOF_TO_WEB",
  SEND_NEXT_TO_WEB: "SEND_NEXT_TO_WEB",
  EXTENSION_CLOSED: "EXTENSION_CLOSED",
  SEND_BACKNEXT_TO_WEB: "SEND_BACKNEXT_TO_WEB",
  SEND_CREATE_PASSWORD_SUCCESS_TO_WEB: "SEND_CREATE_PASSWORD_SUCCESS_TO_WEB",
  SEND_IMPORT_CREDENTIAL_SUCCESS_TO_WEB: "SEND_IMPORT_CREDENTIAL_SUCCESS",
};

export const ZKPROGRAM = {
  name: "zkPortrait Issuance Rule",
  hash: "0x55f013ed6f944a65ee4cec04fdaf1c95a0a151a275b424401d386dc1c4eccffe",
  filed: "Age,Class,Helmet,Chest,Weapon",
  detailString:
    "begin repeat.5 read.a end read.a dup.1 push.18 lt.128 repeat.7 roll.8 end read.ab kvalid pick.2 roll.4 swap.2 swap.4 roll.8 drop.1 repeat.5 read.a end read.a dup.1 dup.1 push.1 push.2 roll.4 eq pad.1 swap.2 eq swap.1 drop.1 or if.true push.0 else push.1 end repeat.7 roll.8 end read.ab kvalid repeat.5 roll.8 end repeat.6 read.a end dup.1 repeat.7 roll.8 end read.ab kvalid pad.3 repeat.3 roll.8 end repeat.3 roll.4 drop.1 end swap.1 repeat.6 read.a end dup.1 repeat.7 roll.8 end read.ab kvalid swap.2 pad.3 roll.8 repeat.3 swap.1 drop.1 end repeat.6 read.a end dup.1 repeat.7 roll.8 end read.ab kvalid pad.3 repeat.3 roll.8 end repeat.3 roll.4 drop.1 end read.ab read.ab pad.1 repeat.3 roll.8 end roll.4 drop.1 push.5 push.7 khash pad.3 repeat.3 roll.8 end repeat.3 roll.4 drop.1 end add add push.18 lt.128 pad.3 roll.4 swap.4 swap.2 swap.1 swap.2  end",
  detail: `begin 
  repeat.5 
      read.a 
    end 
    read.a dup.1 push.18 lt.128 
    repeat.7
      roll.8
    end
    read.ab kvalid pick.2 roll.4 swap.2 swap.4 roll.8 drop.1
 
    repeat.5 
      read.a 
    end 
    read.a dup.1 dup.1 push.1 push.2 roll.4 eq pad.1 swap.2 eq swap.1 drop or
    if.true
      push.0
    else 
      push.1
    end
 
    repeat.7
      roll.8
    end 
    read.ab kvalid 
    repeat.5 
      roll.8
    end  
 
    repeat.6
      read.a
    end
    dup.1 
 
    repeat.7 
      roll.8
    end
    read.ab kvalid 
 
    pad.3 
    repeat.3
      roll.8
    end
    repeat.3
    roll.4 drop.1
    end
 
    swap.1 
    repeat.6
      read.a
    end 
    dup.1 
    repeat.7
      roll.8
    end
    read.ab kvalid 
 
    swap.2
 
    pad.3 roll.8 
    repeat.3 
      swap.1 drop.1
    end

 
    repeat.6
      read.a
    end 
    dup.1 
    repeat.7
      roll.8
    end
    read.ab kvalid 

    pad.3
    repeat.3
      roll.8
    end
    repeat.3
      roll.4 drop.1
    end
    read.ab read.ab
    pad.1
    repeat.3
      roll.8
    end
    roll.4 drop.1 push.5 push.7 
    khash
 
    pad.3 
    repeat.3 
      roll.8
    end
    repeat.3
      roll.4 drop.1
    end
    add add push.18 lt.128 
 
    pad.3 roll.4 swap.4 swap.2 swap.1 swap.2 `,
};
