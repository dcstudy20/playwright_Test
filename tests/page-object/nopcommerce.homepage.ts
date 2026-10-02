import { expect, Locator, type Page } from '@playwright/test';
import BasePage from '../page-object/base.page';
import { log } from '../../helpers/logger';
import { NopCommElements } from '../../config/nopcomm/nopcomm.ele';

export default class Homepage extends BasePage {
    private nopCommElements: NopCommElements;

    //constructor
    constructor(page: Page) {
        super(page);
        this.nopCommElements = new NopCommElements(this.page);
    }

    // //Elements
    // get userName() { return this.page.getByRole('textbox', { name: 'Email:' }) };
    // get password() { return this.page.getByLabel('Password:') };
    // get loginBtn() { return this.page.getByRole('button', { name: 'Log in' }) };

    //Actions
    async loginToNopCommerce(url: string, username: string, password: string) {
        await log("info", `Login to ${url}`);
        await this.navigateTo(url);
        await this.typeInto(this.nopCommElements.userName, username);
        await this.typeInto(this.nopCommElements.password, password);
        await this.click(this.nopCommElements.loginBtn);
        await log("info", `Login successful`);

        //Assertion
        await expect(this.page).toHaveURL(`${url}/admin/`);
        await log("info", `Homepage is successfully launched`);
    }

}