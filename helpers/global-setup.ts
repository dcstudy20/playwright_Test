import { type FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export default async function globalSetup(config: FullConfig) {
    console.log("Global setup is running...");
    if (process.env.RUNNER?.toUpperCase() === 'LOCAL') {
        console.log("Running tests in local environment");
        const resultDir = path.resolve(process.cwd(), 'allure-results');
        console.log(`Allure root dir is: ${resultDir}`);
        if (fs.existsSync(resultDir)) {
            fs.rmSync(resultDir, { recursive: true, force: true });
            console.log(`Allure results directory ${resultDir} has been deleted.`);
        }
    }
    console.log("Global setup is completed.");

    // process.env.CUSTOMERCARE_COOKIE = undefined;
}