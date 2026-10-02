import { type Page, type Locator } from '@playwright/test';

export class NopCommElements {
    readonly page: Page;
    //constructor
    constructor(page: Page) {
        this.page = page;
    }

    //Elements
    get userName(): Locator { return this.page.getByRole('textbox', { name: 'Email:' }) };
    get password(): Locator { return this.page.getByLabel('Password:') };
    get loginBtn(): Locator { return this.page.getByRole('button', { name: 'Log in' }) };
    get firstName(): Locator { return this.page.getByRole('textbox', { name: 'First name' }) };
    get lastname(): Locator { return this.page.getByRole('textbox', { name: 'Last name' }) };
    get searchBtn(): Locator { return this.page.getByRole('button', { name: 'Search' }) };
    get noCustFound(): Locator { return this.page.getByText('No data available in table', { exact: true }) };


}     