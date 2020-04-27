import Parse from 'parse';

Parse.initialize(process.env.REACT_APP_PARSE_APP_ID || '', process.env.REACT_APP_PARSE_JS_KEY || '');
Parse.serverURL = 'https://parseapi.back4app.com/';

// @ts-ignore
export const client = new Parse.LiveQueryClient({
  applicationId: process.env.REACT_APP_PARSE_APP_ID,
  serverURL: 'wss://functionalfitness.back4app.io',
  javascriptKey: process.env.REACT_APP_PARSE_JS_KEY,
  masterKey: process.env.REACT_APP_PARSE_MASTER_KEY,
});
client.open();

export const login = async () => {
  const user = await Parse.User.logIn('admin', 'admin');
};

export * from './hooks';
export * from './types';
