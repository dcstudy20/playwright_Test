import { expect, type Locator, type Page } from '@playwright/test';
import { log } from '../../helpers/logger';

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string) {
        await log("info", `Navigating to path: ${path}`);
        await this.page.goto(path);
    }

    async click(ele: Locator) {
        try {
            await expect(ele).toBeVisible({ timeout: 5_000 });
            await ele.click();
        }
        catch (err) {
            await log("error", `Element is not clickable: ${ele.toString()}, Original error: ${err}`);
            throw err;
        }
    }

    async typeInto(ele: Locator, text: string) {
        try {
            await expect(ele).toBeVisible({ timeout: 10_000 });
            await ele.fill(text);
        }
        catch (err) {
            await log("error", `Element is not visible for typing: ${ele.toString()}, Original error: ${err}`);
            throw err;
        }

    }
}