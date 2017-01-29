// a nifty helper to set a class depending on an if-clauses
$.fn.setClass = function (class_,state) {
  state = state === undefined ? true : state; // state is true by default
  // if state is true
  if (state) {
    // add class
    this.addClass(class_);
  } else {
    // if not
    this.removeClass(class_);
    // remove class
  }
};
