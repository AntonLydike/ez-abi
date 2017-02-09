// a function to display nice errors (toasts) to the user
const  error = function error (msg, icon, iconcolor) {
  if (icon === undefined) {
    icon = "";
  } else {
    if (iconcolor === undefined) iconcolor = "white";

    icon = '<i class="material-icons left ' + iconcolor + '-text">' + icon + '</i> ';
  }

  Materialize.toast(icon + msg, 6000, 'err');
},
// a function to display nice messages (toasts) to the user
toast =  function toast (msg, icon, iconcolor) {
  if (icon === undefined) {
    icon = "";
  } else {
    if (iconcolor === undefined) iconcolor = "white";

    icon = '<i class="material-icons left ' + iconcolor + '-text">' + icon + '</i> ';
  }

  Materialize.toast(icon + msg, 6000);
};

export {error, toast};
