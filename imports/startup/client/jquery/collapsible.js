$.fn.collapsible_list = function ({
  class_open,
  onChange,
  header,
  handle,
  transition_time
}) {
  onChange = onChange || (() => {});

  this.each((k, elm) => {
    const $e = $(elm),
          $handle = $e.find(handle),
          $head = $e.find(header);

    let   is_open = $e.hasClass(class_open),
          closedH = $head.outerHeight(true),
          openH = 0;


    if (is_open) {
      openH = $e.outerHeight(true);
    } else {
      $e.css({height: 'auto'}).redraw();

      openH = $e.outerHeight(true);

      $e.css({height: ''});
    }

    $e.css({
      height: is_open ? openH : closedH
    })

    $handle.click(() => {
      is_open = !is_open;

      onChange(is_open);

      $e.setClass(class_open, is_open);

      if (!is_open) {
        openH = $e.outerHeight(true);
        $e.css('height', openH)
      }

      $e.transition({
        height: is_open ? openH : closedH
      }, (transition_time || 300), () => {
        if (is_open) $e.css('height', '');
      });

    })

  })
}
