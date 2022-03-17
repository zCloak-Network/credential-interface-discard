/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-15 11:36:33
 * @LastEditTime: 2022-03-17 19:34:32
 */
import * as Kilt from "@kiltprotocol/sdk-js";
const keystore = new Kilt.Did.DemoKeystore();

export function getSigningKeypair(mnemonic) {
  return keystore.generateKeypair({
    // alg: Kilt.Did.SigningAlgorithms.Ed25519,
    alg: Kilt.Did.SigningAlgorithms.Sr25519,
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

export async function generateKeypairs(mnemonic: string) {
  // signing keypair
  const signing = await keystore.generateKeypair({
    alg: Kilt.Did.SigningAlgorithms.Sr25519,
    seed: mnemonic,
  });
  // encryption keypair
  const encryption = await keystore.generateKeypair({
    alg: Kilt.Did.EncryptionAlgorithms.NaclBox,
    seed: mnemonic,
  });

  // build the Attester keys object
  const keys = {
    authentication: {
      publicKey: signing.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(signing.alg),
    },
    keyAgreement: {
      publicKey: encryption.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(encryption.alg),
    },
    capabilityDelegation: {
      publicKey: signing.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(signing.alg),
    },
    assertionMethod: {
      publicKey: signing.publicKey,
      type: Kilt.Did.DemoKeystore.getKeypairTypeForAlg(signing.alg),
    },
  };

  return keys;
}

export function getFullDid(account, keys) {
  return Kilt.Did.DidUtils.writeDidFromPublicKeys(
    keystore,
    account.address,
    keys
  );
}
