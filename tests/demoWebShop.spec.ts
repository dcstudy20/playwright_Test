import {test, expect} from '@playwright/test';
import pwHelper from '../helpers/pw-helper';

test('Validating home page', { annotation: { type: "Test", description: "Validate the landing page of the demo web shop site" }, tag: "@smoke"}, async ({ page, browserName }, testInfo) => {
    // test.skip(browserName === 'chromium', "Skip it!!");
    await page.goto('https://demowebshop.tricentis.com/');
    const initialTitle = await page.title();
    console.log("Title of the page is: ", initialTitle);
    expect(initialTitle).toContain('Demo Web Shop');
    console.log("Browser name is :", browserName);

    //Count all links and print in console
    const allLinks = await page.locator('a').all();
    console.log("Total number of links available are: ", allLinks.length)
    for (const li of allLinks) {
        const textLink = await li.textContent();
        console.log("The link text is: ", textLink);
        if (textLink === 'Register') {
            await li.click();
            await page.waitForTimeout(2000);
            pwHelper.takeFullScreenShot(page, "Register page screenshot");
            // const registerSS = await page.screenshot({ fullPage: true });
            // testInfo.attach("Register page screenshot", { body: registerSS, contentType: "image/png" })
            const registerTitle = await page.title();
            console.log("Title of the page is: ", registerTitle);
            expect(registerTitle).toContain('Register');
            await page.goBack();
        }
    }

    //Community poll
    await expect(page.locator('strong:has-text("COMMUNITY POLL")')).toBeVisible();
    await expect(page.locator('strong:has-text("Do you like nopCommerce?")')).toBeVisible();
    await page.locator('#pollanswers-2').click();
    await page.locator('#vote-poll-1.button-2.vote-poll-button').click();
    await expect(page.locator('div.poll-vote-error')).toHaveText('Only registered users can vote.');
})

// test('To place an order', async({page})=>{
//     await page.goto('https://demowebshop.tricentis.com/');
//     await page.locator('a:has-text("Apparel & Shoes")').nth(0).click();
//     const prodPageTitle= await page.title();
//     console.log("Title of the page is: ", prodPageTitle);
//     expect(prodPageTitle).toContain('Apparel & Shoes');
//     const dropDownSort= page.locator('#products-orderby');
//     await dropDownSort.selectOption({label:'Name: A to Z'});
//     await page.locator('a[href$="/50s-rockabilly-polka-dot-top-jr-plus-size"]').nth(1).click();
//     expect(page.locator('.price-value-5')).toHaveText('11.00');
//     await page.getByRole('textbox',{name:'Qty:'}).fill('2');
//     await page.locator('input[value="Add to cart"]').nth(0).click();
//     await page.waitForTimeout(2000);
//     await page.locator('p:has-text("The product has been added to your shopping cart.")').isVisible();
//     await expect(page.locator('.cart-qty')).toHaveText('(2)');
//     await page.locator('span:has-text("Shopping cart")').click();
//     await page.waitForTimeout(3000);
//     expect(page.locator('.cart-total-left').nth(0)).toHaveText('Sub-Total:');
//     expect(page.locator('.cart-total-right').nth(0)).toHaveText('22.00');
//     await page.locator('#termsofservice').check();
//     await page.getByRole('button',{name:"Checkout"}).click();
//     await page.locator('.button-1.checkout-as-guest-button').click();
//     await page.locator('input[id="BillingNewAddress_FirstName"]').fill('John');
//     await page.locator('input[id="BillingNewAddress_LastName"]').fill('Doe');
//     await page.locator('input[id="BillingNewAddress_Email"]').fill('johndoe@example.com');
//     await page.locator('select[id="BillingNewAddress_CountryId"]').selectOption({label:'United States'});
//     await page.locator('input[id="BillingNewAddress_City"]').fill('New York');
//     await page.locator('input[id="BillingNewAddress_Address1"]').fill('123 Main St');
//     await page.locator('input[id="BillingNewAddress_ZipPostalCode"]').fill('10001');
//     await page.locator('input[id="BillingNewAddress_PhoneNumber"]').fill('1234567890');
//     await page.locator('.button-1.new-address-next-step-button').nth(0).click();
//     await page.waitForTimeout(4000);
//     await page.locator('#PickUpInStore').click();
//     await page.locator('.button-1.new-address-next-step-button').nth(1).click();
//     await page.locator('#paymentmethod_0').check();
//     await page.locator('.button-1.payment-method-next-step-button').click();
//     expect(page.getByText('You will pay by COD')).toBeVisible();
//     await page.locator('.button-1.payment-info-next-step-button').click();
//     expect(page.locator('.product-name')).toHaveText("50's Rockabilly Polka Dot Top JR Plus Size");
//     expect(page.locator('.product-subtotal')).toHaveText('22.00');
//     expect(page.locator('.cart-total-left').nth(4)).toHaveText('Total:');
//     expect(page.locator('.cart-total-right').nth(4)).toHaveText('29.00');
//     await page.locator('.button-1.confirm-order-next-step-button').click();
//     await page.waitForTimeout(2000);
//     expect(page.locator('.page-title')).toHaveText('Thank you');
//     expect(page.locator('.title').nth(0)).toHaveText('Your order has been successfully processed!');
//     const orderNum= await page.locator('.details').locator('li').nth(0).textContent();
//     console.log("The order number is: ", orderNum);
//     await page.locator('a:has-text("Click here for order details.")').click();
//     await page.waitForTimeout(3000);
// }) 