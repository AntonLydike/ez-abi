const cursor = {
  toEnd(elm) {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(elm, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    elm.focus();
  },
  toStart(elm) {
    // TODO implement


  },
  insert(text) {
    pasteHTML(text);
  }
}


function pasteHTML (html) {
  const selection = window.getSelection(),
        range     = selection.getRangeAt(0),
        fragment  = range.createContextualFragment(html);

  range.deleteContents();
  range.insertNode(fragment);

  // collapse to end
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
}

export default cursor;
