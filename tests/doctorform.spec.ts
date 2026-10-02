import {test, expect} from '@playwright/test';

test('To fill the doctors appointment form',{tag: "@smoke"}, async ({page}) =>{
    await page.goto('https://www.jotform.com/form-templates/doctor-diagnosis-form');
    const frameloc=page.frameLocator('#formPreviewArea');
    await frameloc.getByLabel('First Name').fill('John');
    await frameloc.getByLabel('Last Name').fill('Doe');
    await frameloc.getByLabel('Email').fill('john.doe@example.com');
    await frameloc.getByLabel('Phone Number').fill('123-456-7890');
    await frameloc.locator('//*[@id="input_13_addr_line1"]').fill('Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016.');
    await frameloc.getByLabel('City').fill('Bangalore');
    await frameloc.getByLabel('State / Province').fill('Karnataka');
    await frameloc.getByLabel('Postal / Zip Code').fill('560016');
    await frameloc.locator('#lite_mode_5').fill('08-12-2026');
    const genderDropdown = frameloc.locator('#input_6');
    await genderDropdown.selectOption({ label: 'Male' });
    await frameloc.getByLabel('Symptoms').fill('Fever, Cough, Headache');
    await frameloc.getByLabel('Medical History').fill('No medical history.');
    await frameloc.locator('#input_9').fill('Paracetamol 500mg, Ibuprofen 200mg');
    await frameloc.locator('#input_10').fill('No known allergies.');
    await frameloc.locator('#input_14').fill('I have been experiencing mild fever and cough for the past few days. I would like to schedule an appointment with a doctor.');
    await frameloc.locator('#input_11').fill('NA');
    await frameloc.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(5000);
    });