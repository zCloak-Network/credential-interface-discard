/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-26 16:38:18
 * @LastEditTime: 2022-03-29 17:05:47
 */
// /*
//  * @Description:
//  * @Author: lixin
//  * @Date: 2022-01-26 16:38:18
//  * @LastEditTime: 2022-01-26 16:39:35
//  */
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { persistentStoreInstance } from "../../state/PersistentStore";

type props = {
  password: string;
  isClaimer: boolean;
  children: React.ReactNode;
};

const StoreGate: React.FC<props> = ({ password, children, isClaimer }) => {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const initStore = async (): Promise<void> => {
      const newStore = await persistentStoreInstance.init(isClaimer, password);
      setStore(newStore);
    };

    initStore();
  }, [password]);

  if (!store) return null;

  return <Provider store={store}>{children}</Provider>;
};
export default StoreGate;
