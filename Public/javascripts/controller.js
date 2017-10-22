var controller = function controller(view) {
  view.onLogin = function onLogin(user, pass) {
    console.log('recibido: '+user+' '+pass);
    var params = new URLSearchParams();
    params.set('user', user);
    params.set('pass', pass);
    fetch('localhost:3000/api/login', {
        method: 'POST',
        body: params
      }).then((res) => res.json())
      .then((res) => {
        if (res.mensaje == 'logged') {
          console.log(res);
          view.user = res.user;
          console.log('logged');
          view.render('register');
        }
      });
  };

  view.onRegister = function onRegister(name, subName, user, pass, email, pais) {
    var params = new URLSearchParams();
    params.set('name', name);
    params.set('subName', subName);
    params.set('user', user);
    params.set('pass', pass);
    params.set('email', email);
    params.set('pais', pais);

    fetch('localhost:3000/api/register', {
      method: 'POST',
      body: params
    }).then((res) => res.json()).then((res) => console.log(res));

    view.render();
  };

  view.render('login');
/*
  fetch('localhost:3000/api/users').then((res)=> res.json()).then((res)=>{
    if (res.mensaje == 'ok') {
      view.render();
    }
  });*/
}

controller(view);
