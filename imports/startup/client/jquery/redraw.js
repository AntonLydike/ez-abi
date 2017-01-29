// force browser to redraw the item
// usefull to get dimensions right after a dom-insert
$.fn.redraw = function(){
  return this.each(function(){
    var redraw = this.offsetHeight; // offsetHeight forces a redraw!
  });
};
