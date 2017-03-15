const cursor = {
  toEnd:createCaretPlacer(false),
  toStart:createCaretPlacer(true),
  insert(text) {
    pasteHTML(text);
  },
  info:cursorInfo
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

function cursorInfo () {
  // get affected nodes
  let textNode = document.getSelection().anchorNode,
      node = textNode.nodeType == 3 ? textNode.parentNode : textNode,
      info = {
        node,
        textNode,
        isHeader: true,
        x: window.getSelection().anchorOffset,
        y:1,
        line: node.innerHTML,
        lines:[node.innerHTML]
      };


  // if it's inside the text body
  if (node !== textNode && node.tagName != 'H3') {

    // cleanup empty textNodes
    // TODO: investigate performance with and without
    _.each(node.childNodes, n => {
      if (n && n.data == "") node.removeChild(n)
    });

    // get all lines from the node
    let lines = node.innerHTML.split(/\n/g)

    // TODO last line isn't counted if it's not empty and there are more than three lines?
    // more than three lines filled or one filled, one empty and the last one filled

    let _childNodes = _(node.childNodes);
    let linesUntil = _childNodes
      .slice(0, _childNodes.indexOf(textNode))
      .map('data')
      .push(textNode.data.slice(0,info.x+1))
      .join("").split(/\n/g);

    // get the info
    info = {
      x: window.getSelection().anchorOffset,
      y: linesUntil.length,
      line: textNode.data.replace(/\n/g, ""),
        // strip newlines, as they're inconsistent
      lines,
      linesUntil,
      node,
      textNode,
      isHeader: false
    }

  }

  return info;
}

export default cursor;

function createCaretPlacer(atStart) {
    return function(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(atStart);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(atStart);
            textRange.select();
        }
    };
}
