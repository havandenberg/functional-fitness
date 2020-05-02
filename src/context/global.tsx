import React from 'react';
import Parse from 'parse';

interface GlobalState {
  user?: Parse.User | null;
}

const defaultContext = {};

export interface GlobalActions {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const noopActions = {
  login: (email: string, password: string) => undefined,
  logout: () => undefined,
};

export const GlobalContext = React.createContext<[GlobalState, GlobalActions]>([defaultContext, noopActions]);

export const useGlobalContext = () => React.useContext(GlobalContext);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState<GlobalState>(defaultContext);

  const login = async (username: string, password: string) => {
    const user = await Parse.User.logIn(username, password);
    setState({ ...state, user });
  };

  const logout = () => {
    Parse.User.logOut();
    setState({ ...state, user: null });
  };

  return <GlobalContext.Provider children={children} value={[state, { login, logout }]} />;
};
