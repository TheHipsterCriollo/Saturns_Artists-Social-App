var controller = function controller(view) {
  view.render();
  view.onLogin = function onLogin(user, pass){
    console.log(user, pass);
  }
}

controller(view);
