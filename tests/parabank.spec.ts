import { test, expect, devices } from '@playwright/test';
import TestData from "../data/test-data";
import { readCSVFile } from '../helpers/fileHelper';
import { log } from '../helpers/logger';
import pwHelper from '../helpers/pw-helper';

// test('To validate Parabank home page', async ({ page , browserName }) => {
//     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
//     const title = await page.title();
//     console.log("Title of the page is: ", title);
//     expect(title).toContain('ParaBank | Welcome | Online Banking');
//     console.log("Browser name is :", browserName)
//     //To check pages
//     await expect(page.locator('.home')).toBeVisible();
//     await expect(page.locator('.aboutus')).toBeVisible();
//     await expect(page.locator('.contact')).toBeVisible();

//     //To check links
//     const links = await page.locator('a').all();
//     console.log("Total number of links are: ", links.length);
//     for (const li of links) {
//         const linkTest = await li.textContent();
//         console.log("Link text is: ", linkTest);
//         if (linkTest === 'Withdraw Funds') {
//             await li.click();
//             await page.waitForTimeout(2000);
//             // const withdrawTitle= await page.title();
//             // console.log("Title of the page is: ", withdrawTitle);
//             // await expect(page.locator('.title')).toHaveText('ParaBank | Withdraw Funds');
//             await page.goBack();
//         }
//     }
// })

// test('Customer login', async ({ page }, testInfo) => {
    // const envData = testInfo.project.use as any; // Cast to any to access the properties
    // await page.goto(envData.appURL);
    // await page.locator('input[type="text"]').fill(process.env.TEST_USERNAME);// If "Strict" is enabled in tsconfig.json, then we need to use "!" operator to assert that the value is not null or undefined, like this: process.env.TEST_USERNAME!
    // await page.locator('input[type="password"]').fill(process.env.TEST_PASSWORD);
    // await page.locator('input[type="submit"]').click();
    // await expect(page.getByText('Error!')).toHaveText('Error!');
    // await expect(page.locator('#rightPanel p')).toHaveText('The username and password could not be verified.');
    // await page.locator('a:has-text("Register")').click();
    // await expect(page.locator('.title')).toHaveText('Signing up is easy!');
    // await page.locator('input[name="customer.firstName"]').fill('Dhanashree');
    // await page.locator('input[name="customer.lastName"]').fill('Chitnis');
    // await page.locator('input[name="customer.address.street"]').fill('123 Main St');
    // await page.locator('input[name="customer.address.city"]').fill('Mumbai');
    // await page.locator('input[name="customer.address.state"]').fill('Maharashtra');
    // await page.locator('input[name="customer.address.zipCode"]').fill('421501');
    // await page.locator('input[name="customer.phoneNumber"]').fill('1234567890');
    // await page.locator('input[name="customer.ssn"]').fill('123-45-6789');
    // await page.locator('input[name="customer.username"]').fill('Dhanashree2005');
    // await page.locator('input[name="customer.password"]').fill('Dhana@1234');
    // await page.locator('input[name="repeatedPassword"]').fill('Dhana@1234');
    // await page.locator('input[value="Register"]').click();
    // await expect(page.locator('.title')).toHaveText('Welcome Dhanashree1992');
    // await expect(page.locator('#rightPanel').locator('p')).toHaveText('Your account was created successfully. You are now logged in.');
    // await page.locator('a:has-text("Log Out")').click();
// })

// const custCareData = TestData.customerContact();
// Adding fileHelper to read data from csv file and return in array of objects format
const custCareData = readCSVFile('paratestdata.csv');
for (const appData of custCareData) {
    test(`${appData.testID}: To validate different pages`, async ({ page }, testInfo) => {
        const envData = testInfo.project.use as any; // Cast to any to access the properties
        await page.goto(envData.appURL);
        await log('info',`The web app is loading in '${envData.env}' environment`);
        // await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await page.locator('.contact').click();
        const contactTitle = await page.title();
        console.log("Title of the page is: ", contactTitle);
        pwHelper.takeFullScreenShot(page, 'ContactPage');
        expect(contactTitle).toContain('Customer Care');
        await log('log','Title validated');
        await log('error',`Error found!!`);
        // const custcareCookie = await page.context().cookies();
        // process.env.CUSTOMERCARE_COOKIE = JSON.stringify(custcareCookie);
        // console.log("Customer care cookie is: ", process.env.CUSTOMERCARE_COOKIE);
        await expect(page.locator('.title')).toHaveText('Customer Care');
        await expect(page.locator('#rightPanel').locator('p')).toHaveText('Email support is available by filling out the following form.');
        await page.locator('//*[@id="name"]').fill(appData.name);
        await page.locator('//*[@id="email"]').fill(appData.email);
        await page.locator('//*[@id="phone"]').fill(appData.phone);
        await page.locator('//*[@id="message"]').fill(appData.message);
        await page.locator('input[value="Send to Customer Care"]').click();
        pwHelper.takeElementScreenshot('CustomerCareConfirmation', page.locator('#rightPanel'));
        await expect(page.locator('.title')).toHaveText('Customer Care');
        await expect(page.locator('#rightPanel').locator('p').nth(0)).toHaveText(`Thank you ${appData.name}`);
        await expect(page.locator('#rightPanel').locator('p').nth(1)).toHaveText('A Customer Care Representative will be contacting you.');
        await page.waitForTimeout(5000);
    })

}

// test('To validate different pages', async ({ page }) => {
//     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
//     await page.locator('.aboutus').click();
//     const title = await page.title();
//     expect(title).toContain('About Us');
//     console.log("Title of the page is: ", title);
//     await expect(page.locator('.title')).toHaveText('ParaSoft Demo Website');
//     await expect(page.locator('#rightPanel').locator('p').nth(0))
//         .toHaveText('ParaBank is a demo site used for demonstration of Parasoft software solutions. All materials herein are used solely for simulating a realistic online banking website.');
//     await expect(page.locator('#rightPanel').locator('p').nth(1))
//     const infoPara = page.locator('#rightPanel p').filter({ hasText: 'For more information' }).first();
//     await expect(infoPara).toContainText(
//         /For more information about Parasoft solutions please visit us at:\s*www\.parasoft\.com or call 888-305-0041/);
//     // .toHaveText('In other words: ParaBank is not a real bank!');
//     // await expect(page.locator('#rightPanel').locator('p').nth(2)).toHaveText(/^For more information about Parasoft solutions please visit us at: www\.parasoft\.com or call 888-305-0041$/);
//     // await expect(page.locator('#rightPanel').locator('p').nth(2))
//     // .toHaveText('For more information about Parasoft solutions please visit us at: www.parasoft.com or call 888-305-0041');
//     await page.locator('.contact').click();
//     const contactTitle = await page.title();
//     console.log("Title of the page is: ", contactTitle);
//     expect(contactTitle).toContain('Customer Care');
//     await expect(page.locator('.title')).toHaveText('Customer Care');
//     await expect(page.locator('#rightPanel').locator('p')).toHaveText('Email support is available by filling out the following form.');
//     await page.locator('//*[@id="name"]').fill('Dhanashree');
//     await page.locator('//*[@id="email"]').fill('dhanashree@example.com');
//     await page.locator('//*[@id="phone"]').fill('1234567890');
//     await page.locator('//*[@id="message"]').fill('Unable to login with my bank account.');
//     await page.locator('input[value="Send to Customer Care"]').click();
//     await expect(page.locator('.title')).toHaveText('Customer Care');
//     await expect(page.locator('#rightPanel').locator('p').nth(0)).toHaveText('Thank you Dhanashree');
//     await expect(page.locator('#rightPanel').locator('p').nth(1)).toHaveText('A Customer Care Representative will be contacting you.');
//     await page.waitForTimeout(5000);
// })

// test('To check config',async({page}, testInfo)=>{
//     console.log("Test info is: ", JSON.stringify(testInfo.config));
// })

// test('To validate Parabank home page', async ({ page , browserName }) => {
//    console.log(`>>List of devices ${Object.keys(devices)}`);   
// })