import { Store } from "redux";
import nacl from "tweetnacl";
import { Crypto } from "@kiltprotocol/utils";
import {
  encryption,
  decryption,
  passwordHashing,
} from "../utils/Encryption/Encryption";
import { configureStore } from "@reduxjs/toolkit";
import application, {
  ApplicationState,
  initialState as applicationInitialState,
} from "./application/reducer";
import wallet, { WalletState } from "./wallet/reducer";
import transactions, { TransactionState } from "./transactions/reducer";
import claim, { SerializedState as ClaimState } from "./claim/reducer";
import attestation, { AttestationState } from "./attestations/reducer";

declare global {
  /* eslint-disable */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }

  /* eslint-enable */
}

export type AppState = {
  claim: ClaimState;
  application: ApplicationState;
  transactions: TransactionState;
  wallet: WalletState;
  attestation: AttestationState;
};

export class PersistentStore {
  // public get store(): Store {
  //   if (!this.storeInternal) throw Error("store not initialized");
  //   return this.storeInternal;
  // }

  private static NAME = "zloakCredentialsData";
  private static SALT = "credentialSalt";

  private static deserialize(encryptedState: string) {
    const obj = JSON.parse(encryptedState);

    return obj;
    // return {
    //   claims: Claims.Store.deserialize(obj.claims),
    // };
  }

  private static serialize(state): string {
    // const obj: SerializedState = {
    //   claims: Claims.Store.serialize(state.claims),
    // };

    return JSON.stringify(state);
  }

  private storeInternal: Store | undefined;

  public static createSalt(): void {
    const salt = Crypto.u8aToHex(nacl.randomBytes(24));
    localStorage.setItem(PersistentStore.SALT, salt);
  }

  public static async createLocalState(password: string): Promise<void> {
    const hashedPassword = await PersistentStore.getHashedPassword(password);
    // const combinedReducers = PersistentStore.getCombinedReducers();
    // const state = combinedReducers({} as State, {
    //   type: "",
    //   // payload: undefined,
    // });
    PersistentStore.serializeEncryptAndStore({} as AppState, hashedPassword);
  }

  public static getLocalState(): string | null {
    return localStorage.getItem(PersistentStore.NAME);
  }

  public static getLocalSalt(): string | null {
    return localStorage.getItem(PersistentStore.SALT);
  }

  public static async getHashedPassword(password: string): Promise<Uint8Array> {
    const salt = PersistentStore.getLocalSalt();
    if (!salt) throw new Error("No password salt found");

    return passwordHashing(password, salt);
  }

  public static async decrypt(password: string): Promise<string | null> {
    const localState = PersistentStore.getLocalState();

    const hashedPassword = await PersistentStore.getHashedPassword(password);
    if (!localState) throw new Error("LocalState not found");

    return decryption(localState, hashedPassword);
  }

  public static async decryptAndDeserialize(
    password: string
  ): Promise<Partial<AppState>> {
    const decryptedState = await PersistentStore.decrypt(password);

    if (!decryptedState) throw new Error("Store could not be decrypted");
    const persistedState = PersistentStore.deserialize(decryptedState);

    return persistedState;
  }

  public static serializeEncryptAndStore(
    state: AppState,
    hashedPassword: Uint8Array
  ): void {
    const serializedState = PersistentStore.serialize(state);
    const encryptedState = encryption(serializedState, hashedPassword);
    localStorage.setItem(PersistentStore.NAME, JSON.stringify(encryptedState));
  }

  public static clearLocalStorage(): void {
    localStorage.removeItem(PersistentStore.NAME);
    localStorage.removeItem(PersistentStore.SALT);
  }

  /* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
  // public static getCombinedReducers() {
  //   return combineReducers({
  //     claims: Claims,
  //   });
  // }

  public async init(isClaimer: boolean, password?: string): Promise<Store> {
    let persistedState = {} as any;
    if (password) {
      persistedState = await PersistentStore.decryptAndDeserialize(password);
      persistedState.application = applicationInitialState;
      if (isClaimer) {
        persistedState.wallet.currentIdentity =
          persistedState.wallet.claimers[0] || null;
      } else {
        persistedState.wallet.currentIdentity =
          persistedState.wallet.attesters[0] || null;
      }

      console.log("state----", persistedState);
    }

    this.storeInternal = configureStore({
      preloadedState: persistedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      reducer: {
        claim,
        attestation,
        wallet,
        application,
        transactions,
      },
    });

    this.storeInternal.subscribe(async () => {
      console.log("state", this.storeInternal?.getState());

      const {
        wallet: { password },
      } = this.storeInternal?.getState();
      if (password) {
        const hashedPassword = await PersistentStore.getHashedPassword(
          password
        );

        // delete newData.wallet.currentIdentity;
        PersistentStore.serializeEncryptAndStore(
          this.storeInternal?.getState(),
          hashedPassword
        );
      }
    });

    return this.storeInternal;
  }

  // eslint-disable-next-line class-methods-use-this
  public reset(): void {
    localStorage.clear();
  }
}

export const persistentStoreInstance = new PersistentStore();
