/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-12 16:11:50
 * @LastEditTime: 2022-04-12 20:20:41
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
  $id: "kilt:ctype:0xe21c5f437332f33db0e6f9cef958f2ff3fedfbcdeb60d4ff24db978b487aad1a",
  type: "object",
};
