const WebdriverIO = require('webdriverio');

describe('Android Element', ()=> {
    it('Find element by accessibility id', async ()=> {
        // find element
        const appOption = await $('~App');

        // click on element
        await appOption.click();

        //assertion
        const actionBar = await $('~Action Bar');
        await expect(actionBar).toBeExisting();
    })

    it('Find elements by Xpath', async () => {
        // xpath - (//tagname[@attribute=value])
        await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();

        // find by resourceId
        await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();

        // find by text
        await $('//android.widget.TextView[@text="Command two"]').click();

        // find by class - aasertion
        const textAssertion = await $('//android.widget.TextView');
        await expect(textAssertion).toHaveText("You selected: 1 , Command two");
    })

    it('Find elements by UIAutomator', async () => {
        // find by text contains
        await $('android=new UiSelector().textContains("Alert")').click();
    })

    it('Find multiple elements', async () => {
        const expectedList = [
      'API Demos', "Access'ibility",
      'Accessibility', 'Animation',
      'App', 'Content',
      'Graphics', 'Media',
      'NFC', 'OS',
      'Preference', 'Text',
      'Views'
    ]
        const actualList = []

        // find multiple element
        const textList = await $$('android.widget.TextView')

        //loop through elements
        for (const element of textList){
            actualList.push(await element.getText());
        }

        // assert the list
        await expect(actualList).toEqual(expectedList);
    })

    it.only('Enter country name', async () => {
        
        const country = "Canada"

        // access the auto complete screen
        await $('android=new UiSelector().text("Views")').click();
        await $('android=new UiSelector().text("Auto Complete")').click();
        await $('android=new UiSelector().text("1. Screen Top")').click();

        // enter the country name
        const inputField = await $('//*[@resource-id="io.appium.android.apis:id/edit"]')
        await inputField.addValue(country)

        // assert the country name        
        await expect(inputField).toHaveText(country)    
    })
})