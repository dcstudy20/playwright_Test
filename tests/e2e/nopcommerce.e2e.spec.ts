import { test } from '@playwright/test';
import { log } from '../../helpers/logger';
import Homepage from '../page-object/nopcommerce.homepage';
import CustSearch from '../page-object/nopcommerce.custsearch';

test("Login flow validation", async ({ page, request }, testInfo) => {
    //Env config
    const env = testInfo.project.use as any;

    //create a page object. Object of class that we have imported which has the methods and elements of the page
    const homepage = new Homepage(page);
    const custSearch = new CustSearch(page);

    //Call methods 
    await homepage.loginToNopCommerce(env.nopCommerce, process.env.NOP_COMM_USERNAME, process.env.NOP_COMM_PASSWORD);
    await custSearch.searchCustomer(env.nopCommerce, testInfo, request);
})