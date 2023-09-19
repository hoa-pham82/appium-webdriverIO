const AddNoteScreen = require('../screenobjects/android/add-note.screen');

describe('Add Notes', () => {
  it('skip tutorial', async () => {
    await AddNoteScreen.skipButton.click();
    await expect(AddNoteScreen.addNote).toBeDisplayed();
  });

  it('Add note', async () => {
    await $('//*[@text="Add note"]').click();
    await $('//*[@text="Text"]').click();

    // assert editing screen
    await expect($('//*[@text="Editing"]')).toBeDisplayed();

    // add note title and body
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]'
    ).setValue('To do list');
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]'
    ).setValue('Homework\nWashing');

    await driver.back();
    await driver.back();

    // assertion
    await expect(
      $(
        '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]'
      )
    ).toBeDisplayed();
    await expect(
      $(
        '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]'
      )
    ).toHaveText('Homework\nWashing');
  });

  it('Delete note', async () => {
    const noteTitle = 'To do list';

    // check a list existing
    // await expect(
    //   $(
    //     '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]'
    //   )
    // ).toHaveText(noteTitle);
    // // click that list - delete note
    // await $(
    //   '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]'
    // ).click();

    await $('//*[@content-desc="More"]').click();
    await $('//*[@text="Delete"]').click();

    await $('//*[@text="OK"]').click();

    await expect(
      $(
        '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/note_list"]'
      )
    ).not.toHaveText(noteTitle);

    // check note in trash can

    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]'
    ).click();
    await $('//*[@text="Trash Can"]').click();
    await expect(
      $(
        '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]'
      )
    ).toHaveText(noteTitle);
  });
});
