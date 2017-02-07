const  error = function error (msg, icon, iconcolor) {  // a function to display nice errors (toasts) to the user
  if (icon === undefined) {
    icon = "";
  } else {
    if (iconcolor === undefined) iconcolor = "red";

    icon = '<i class="material-icons left ' + iconcolor + '-text">' + icon + '</i> ';
  }

  Materialize.toast(msg + icon, 6000000, 'err');
},
toast =  function toast (msg, icon, iconcolor) {  // a function to display nice messages (toasts) to the user
  if (icon === undefined) {
    icon = "";
  } else {
    if (iconcolor === undefined) iconcolor = "white";

    icon = '<i class="material-icons left ' + iconcolor + '-text">' + icon + '</i> ';
  }

  Materialize.toast(icon + msg, 60000000);
};

export {error, toast};
