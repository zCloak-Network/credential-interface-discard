import React from 'react';
import { ApiProps } from './types';

const ApiContext: React.Context<ApiProps> = React.createContext(({} as unknown) as ApiProps);
const ApiProvider: React.Provider<ApiProps> = ApiContext.Provider;
const ApiConsumer: React.Consumer<ApiProps> = ApiContext.Consumer;

export default ApiContext;

export { ApiConsumer, ApiProvider };
