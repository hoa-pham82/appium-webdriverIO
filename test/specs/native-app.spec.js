describe('Android native feature', () => {
  it('Access and Activity directly', async () => {
    await driver.startActivity(
      'io.appium.android.apis',
      '.app.AlertDialogSamples'
    );

    await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
  });

  it('Working with alert dialog box', async () => {
    await driver.startActivity(
      'io.appium.android.apis',
      '.app.AlertDialogSamples'
    );

    await $(
      '//*[@resource-id="io.appium.android.apis:id/two_buttons"]'
    ).click();

    // //accept alert
    // await driver.acceptAlert();

    // //dismiss alert
    // await driver.dismissAlert();

    // handle OK button on dialog
    await $('//*[@resource-id="android:id/button1"]').click();

    // assert the alert box is no loger visible
    await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();
  });

  it('handle vertical scrolling', async () => {
    await $('~App').click();
    await $('~Activity').click();

    // //Scroll to the end
    // await $(
    //   'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1)'
    // );

    // Scroll into text view
    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")'
    ).click();

    // await $('~Secure Surfaces').click();

    await expect($('~Secure Dialog')).toExist();
  });

  it('handle horizontal scrolling', async () => {
    await driver.startActivity(
      'io.appium.android.apis',
      'io.appium.android.apis.view.Gallery1'
    );

    // horizontal scrolling
    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()'
    );

    await driver.pause(3000);
  });

  it.only('Scrolling exercise', async () => {
    // access the date widget
    await driver.startActivity('io.appium.android.apis', '.view.DateWidgets1');

    // get the current date
    const date = await $(
      '//*[@resource-id="io.appium.android.apis:id/dateDisplay"]'
    );
    const currentDate = date.getText();

    // change the date

    await $('//*[@resource-id="io.appium.android.apis:id/pickDate"]').click();

    // scroll to the right
    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()'
    );

    // pick 10th date from the month
    await $('~10 February 2023').click();
    await $('//*[@resource-id="android:id/button1"]').click();

    // assert the date is updated
    await expect(await date.getText()).not.toEqual(currentDate);
  });
});
