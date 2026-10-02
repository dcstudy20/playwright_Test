import { test } from '@playwright/test';
import chalk from 'chalk';

type Level = "log" | "info" | "warn" | "error";

export async function log(level: Level, message: string) {
    const plainLine = `[${level.toUpperCase()}]: ${message}`; //For Allure report
    let coloredLine = plainLine;

    switch (level) {
        case 'info':
            coloredLine = chalk.blue(plainLine);
            break;
        case 'warn':
            coloredLine = chalk.yellow(plainLine);
            break;
        case 'error':
            coloredLine = chalk.red(plainLine);
            break;
        default:
            coloredLine = chalk.white(plainLine);
    }

    //Print coloured text in terminal
    (console[level] || console.log)(coloredLine);

    //Send plain text to Allure report
    await test.step(plainLine, async () => { });

}