import { expect, type Page, TestInfo } from "@playwright/test";
import BasePage from "./base.page";
import { log } from "../../helpers/logger";
import { NopCommElements } from "../../config/nopcomm/nopcomm.ele";
import constants from "../../data/constants.json";
import { readFile } from "../../helpers/file-helper";
import { takeFullScreenShot } from "../../helpers/pw-helper";

export default class CustSearch extends BasePage {
    private nopCommElements: NopCommElements;
    //constructor
    constructor(page: Page) {
        super(page);
        this.nopCommElements = new NopCommElements(this.page);

    }

    async searchCustomer(custsearchURL: string, testInfo: TestInfo, request: any) {
        // const userData = {
        //     "firstname": "Thomas",
        //     "lastname": "Edison"
        // }

        await log('info', `Making a GET call to ${testInfo.project.use.baseURL}${constants.REQ_RES_API.GET_USER_LIST}`)
        const res = await request.get(`${testInfo.project.use.baseURL}${constants.REQ_RES_API.GET_USER_LIST}`,
            {
                headers: {
                    'x-api-key': process.env.REQ_RES_API_KEY
                }
            }
        );

        //Assertion

        expect(res.status()).toBe(200);
        await log('info', `GET call is successfull with ${res.status()}`);

        //Get data from the response
        const userData = await res.json();
        const userList = JSON.parse(JSON.stringify(userData.data));
        // await log('info', `User list is: ${userList}`);
        // const userData = JSON.parse(readFile(`${process.cwd()}/data/api/userList.json`)).data;
        await this.navigateTo(`${custsearchURL}${constants.NOP_COMMERCE.URL}`);
        for (const user of userList) {
            await log("info", `Searching customer with firstname as ${user.first_name} and lastname as ${user.last_name}`);
            await this.typeInto(this.nopCommElements.firstName, `${user.first_name}`);
            await this.typeInto(this.nopCommElements.lastname, `${user.last_name}`);
            await this.click(this.nopCommElements.searchBtn);
            // await log("info",`Searching customer with firstname as ${userData.firstname} and lastname as ${userData.lastname}`);
            // await this.navigateTo(`${custsearchURL}${constants.NOP_COMMERCE.URL}`);
            // await this.typeInto(this.nopCommElements.firstName, `${userData.firstname}`);
            // await this.typeInto(this.nopCommElements.lastname, `${userData.lastname}`);
            // await this.click(this.nopCommElements.searchBtn);

            //Assertion
            await this.page.waitForTimeout(2_000);
            const custmSearch = await this.nopCommElements.noCustFound.isVisible().catch(() => false);
            await takeFullScreenShot(this.page, `No customer found with name ${user.first_name} ${user.last_name}`);

            if (custmSearch) {
                await log("warn", `Customer ${user.first_name} ${user.last_name} not found in the list`);
            } else {
                await log("info", `Customer ${user.first_name} ${user.last_name} found in the list`);
            }
        }
    }
}
