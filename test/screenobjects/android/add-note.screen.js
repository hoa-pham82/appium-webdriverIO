class AddNoteScreen {
  get skipButton() {
    return $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]'
    );
  }

  get addNote() {
    return $('//*[@text="Add note"]');
  }
}

export default new AddNoteScreen();
