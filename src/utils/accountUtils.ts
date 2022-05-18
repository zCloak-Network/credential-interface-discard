/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-03-15 11:36:33
 * @LastEditTime: 2022-05-13 16:22:47
 */
import * as Kilt from "@kiltprotocol/sdk-js";
import { WSSURL } from "../constants";
const keyring = new Kilt.Utils.Keyring({
  ss58Format: 38,
  type: "sr25519",
});

export async function generateAccount(
  mnemonic: string
): Promise<Kilt.KeyringPair> {
  await Kilt.init({ address: WSSURL });

  return keyring.addFromMnemonic(mnemonic);
}

export async function generateLightDid(lightKeypairs: {
  authenticationKey: Kilt.NewDidVerificationKey;
  encryptionKey: Kilt.NewDidEncryptionKey;
}): Promise<Kilt.Did.LightDidDetails> {
  return Kilt.Did.LightDidDetails.fromDetails({
    ...lightKeypairs,
    authenticationKey: {
      publicKey: lightKeypairs.authenticationKey.publicKey,
      type: Kilt.VerificationKeyType.Sr25519,
    },
  });
}

export async function generateLightKeypairs(
  keystore: Kilt.Did.DemoKeystore,
  mnemonic?: string
): Promise<{
  authenticationKey: Kilt.NewDidVerificationKey;
  encryptionKey: Kilt.NewDidEncryptionKey;
}> {
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

  // build the keys object
  return {
    authenticationKey: {
      publicKey: signing.publicKey,
      type: Kilt.VerificationKeyType.Sr25519,
    },
    encryptionKey: {
      publicKey: encryption.publicKey,
      type: Kilt.EncryptionKeyType.X25519,
    },
  };
}

export async function generateFullKeypairs(
  keystore: Kilt.Did.DemoKeystore,
  mnemonic?: string
): Promise<{
  authentication: Kilt.NewDidVerificationKey;
  keyAgreement: Kilt.NewDidEncryptionKey;
  assertionMethod: Kilt.NewDidVerificationKey;
  capabilityDelegation: Kilt.NewDidVerificationKey;
}> {
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
      type: Kilt.VerificationKeyType.Sr25519,
    },
    keyAgreement: {
      publicKey: encryption.publicKey,
      type: Kilt.EncryptionKeyType.X25519,
    },
    capabilityDelegation: {
      publicKey: signing.publicKey,
      type: Kilt.VerificationKeyType.Sr25519,
    },
    assertionMethod: {
      publicKey: signing.publicKey,
      type: Kilt.VerificationKeyType.Sr25519,
    },
  };

  return keys;
}

export async function generateFullDid(
  keystore: Kilt.Did.DemoKeystore,
  account: Kilt.KeyringPair,
  fullKeypairs: {
    authentication: Kilt.NewDidVerificationKey;
    keyAgreement: Kilt.NewDidEncryptionKey;
    assertionMethod: Kilt.NewDidVerificationKey;
    capabilityDelegation: Kilt.NewDidVerificationKey;
  }
): Promise<Kilt.Did.FullDidDetails> {
  await Kilt.init({ address: WSSURL });
  const { api } = await Kilt.connect();

  return new Kilt.Did.FullDidCreationBuilder(api, fullKeypairs.authentication)
    .addEncryptionKey(fullKeypairs.keyAgreement)
    .setAttestationKey(fullKeypairs.assertionMethod)
    .setDelegationKey(fullKeypairs.capabilityDelegation)
    .consumeWithHandler(keystore, account.address, async (creationTx) => {
      await Kilt.BlockchainUtils.signAndSubmitTx(creationTx, account, {
        reSign: true,
        resolveOn: Kilt.BlockchainUtils.IS_FINALIZED,
      });
    });
}

export async function getFullDid(
  didIdentifier: Kilt.IDidIdentifier
): Promise<Kilt.Did.FullDidDetails> {
  // make sure the did is already on chain
  const onChain = await Kilt.Did.FullDidDetails.fromChainInfo(didIdentifier);
  if (!onChain)
    throw Error(`failed to find on chain did: did:kilt:${didIdentifier}`);
  return onChain;
}
