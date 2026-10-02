import { test as base } from '@playwright/test';

export type EnvConfig = {
  env: string;
  appURL: string;
  dbConfig: {}
  nopCommerce: string;
  BaseURL: string;
};

export const test = base.extend<EnvConfig>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  env: ["test", { option: true }],
  appURL: ["https://parabank.parasoft.com/parabank/index.htm", { option: true }],
  BaseURL: ['provideURL', { option: true }],
  nopCommerce: ['provideURL', { option: true }],
  dbConfig: [{}, { option: true }]

});