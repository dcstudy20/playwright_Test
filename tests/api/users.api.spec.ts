import { test, expect, request, TestInfo } from '@playwright/test';
import { log } from '../../helpers/logger';
import TestData from '../../data/test-data';
import constants from '../../data/constants.json';
import { writeFile } from '../../helpers/file-helper';

test.describe('Rest API demo', () => {
    // let envConfig = undefined;
    // test.beforeEach("Get env config", async({request}, testInfo) =>{
    //     const envConfig = testInfo.project.use as any;
    // })

    test('Validate GET call', async ({ request }, testInfo) => {
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
        await log('info', `User list is: ${JSON.stringify(userData)}`);

        //Write the data in the file
        writeFile(`${process.cwd()}/data/api/userList.json`, `${JSON.stringify(userData, undefined, 5)}`);
    });

    test('Validate POST call', async ({ request }, testInfo) => {
        await log('info', `Making a POST call to ${testInfo.project.use.baseURL}${constants.REQ_RES_API.POST_USER}`);
        const payload = TestData.postCallUserData()[0];
        const res = await request.post(`${testInfo.project.use.baseURL}${constants.REQ_RES_API.POST_USER}`,
            {
                headers: {
                    'x-api-key': process.env.REQ_RES_API_KEY,
                    'Content-Type': process.env.api_contentType,
                },
                data: payload,
            }
        );

        //Assertion

        expect(res.status()).toBe(201);
        await log('info', `POST call is successfull with ${res.status()}`);

        //Get data from the response
        const userData = await res.json();
        await log('info', `User list is: ${JSON.stringify(userData)}`);

    });
});

/**var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://reqres.in/api/users?page=2',
  'headers': {
    'x-api-key': 'reqres_2a345c348ae14cd6be9a41aaa35c254b'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
 */