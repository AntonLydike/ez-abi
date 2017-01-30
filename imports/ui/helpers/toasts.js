const  error = function error (msg, icon, iconcolor) {  // a function to display nice errors (toasts) to the user
  if (icon === undefined) {
    icon = "";
  } else {
    if (iconcolor === undefined) iconcolor = "red";

    icon = '<i class="material-icons ' + iconcolor + '-text">' + icon + '</i> ';
  }

  Materialize.toast(msg, 6000, 'err');
},
toast =  function toast (msg, icon, iconcolor) {  // a function to display nice messages (toasts) to the user
  if (icon === undefined) {
    icon = "";
  } else {
    if (iconcolor === undefined) iconcolor = "white";

    icon = '<i class="material-icons ' + iconcolor + '-text">' + icon + '</i> ';
  }

  Materialize.toast(icon + msg, 6000);
};

export {error, toast};
