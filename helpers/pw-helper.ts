import {test, type Page, type Locator} from '@playwright/test';

async function takeFullScreenShot(page:Page, screenShotName: string) {
    const screenshot = await page.screenshot({fullPage: true});
    await test.info().attach(screenShotName, {
        body: screenshot,
        contentType: 'image/png'
    })
}

async function takeElementScreenshot(screenshotName:string, ele:Locator) {
    const screenshot = await ele.screenshot();
    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: 'image/png'
    })
}

export default {takeFullScreenShot, takeElementScreenshot }