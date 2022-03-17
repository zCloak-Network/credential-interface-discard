/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-15 11:36:33
 * @LastEditTime: 2022-03-17 15:36:10
 */
import * as Kilt from "@kiltprotocol/sdk-js";
const keystore = new Kilt.Did.DemoKeystore();

export function getSigningKeypair(mnemonic) {
  return keystore.generateKeypair({
    alg: Kilt.Did.SigningAlgorithms.Ed25519,
    seed: mnemonic,
  });
}

export function getEncryptionKeypair(mnemonic) {
  return keystore.generateKeypair({
    alg: Kilt.Did.EncryptionAlgorithms.NaclBox,
    seed: mnemonic,
  });
}

export function getLightDid(signingKeypair, encryptionKeypair) {
  return new Kilt.Did.LightDidDetails({
    authenticationKey: {
      publicKey: signingKeypair.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(signingKeypair.alg),
    },
    encryptionKey: {
      publicKey: encryptionKeypair.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(encryptionKeypair.alg),
    },
  });
}

export function getFullDid(account, accountMnemonic) {
  return Kilt.Did.createOnChainDidFromSeed(
    account,
    keystore,
    accountMnemonic,
    Kilt.Did.SigningAlgorithms.Ed25519
  );
}
