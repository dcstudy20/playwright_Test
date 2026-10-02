import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config";
import { EnvConfig } from "../helpers/config-fixtures";
import path from 'path';

export default defineConfig<EnvConfig>({
    ...baseConfig, // Spread the base configuration
    // You can add or override any configuration options here if needed
    testDir: path.resolve(process.cwd(), './tests'),

    use: {
        env: "test",
        appURL: "https://parabank.parasoft.com/parabank/index.htm",
        nopCommerce: "https://admin-demo.nopcommerce.com",
        baseURL: 'https://reqres.in',
        dbConfig: {},
        headless: true, // Override headless option if needed
        screenshot: 'only-on-failure', // Override screenshot option if needed
    }
})


