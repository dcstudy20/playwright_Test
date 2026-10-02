import { type FullConfig } from '@playwright/test';
import {exec} from 'child_process';

export default async function globalTeardown(config: FullConfig) {
    console.log("Global teardown is running...");
    // Add any cleanup logic here
    if(process.env.RUNNER?.toUpperCase() === 'LOCAL') {
        console.log("Running tests in local environment");
        // Generate Allure report
        exec('allure serve', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating Allure report: ${error.message}`);
                return;
            }
            console.log("Allure report generated successfully.");
        });
    }
    console.log("Global teardown is completed.");
}