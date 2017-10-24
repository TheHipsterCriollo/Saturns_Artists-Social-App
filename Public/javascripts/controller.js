var controller = function controller(view) {

  // clear DB in mongoshell
  // use [database];
  // db.dropDatabase();

  fetch('http://localhost:3000/api/users').then((res) => res.json()).then((res) => {
    if (res.mensaje == 'ok') {
      // console.log(res.users);
    }
  });
//REVISAR POSTS
  fetch('http://localhost:3000/api/home').then((res) => res.json()).then((res) => {
    if (res.mensaje == 'ok') {
      view.posts = res.posts;
      // console.log(res.posts);
      view.render('home');
    }
  });

  view.onLogin = function onLogin(user, pass) {
    console.log('recibido: ' + user + ' ' + pass);
    var params = new URLSearchParams();
    params.set('user', user);
    params.set('pass', pass);
    fetch(`${location.origin}/api/login`, {
        method: 'POST',
        body: params
      }).then((res) => res.json())
      .then((res) => {
        if (res.mensaje == 'logged') {
          console.log(res);
          view.user = res.user;
          console.log('logged');
          view.render('home', posts);
        }
      });
  };

  view.onRegister = function onRegister(name, subName, user, pass, email, pais, img) {
    var params = new FormData();
    params.set('name', name);
    params.set('subName', subName);
    params.set('user', user);
    params.set('pass', pass);
    params.set('email', email);
    params.set('pais', pais);
    params.set('img', img);

    fetch(`http://localhost:3000/api/register`, {
      method: 'POST',
      body: params,
    }).then((res) => res.json()).then((res) => console.log(res));

    view.render('login');
  };

  view.onUpload = function onUpload(img, description, user) {
      var params = new FormData();
      params.set('img', img);
      params.set('description', description);
      params.set('user', user);
      fetch(`http://localhost:3000/api/upload/${user}`, {
        method: 'POST',
        body: params
      })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      view.render('home', posts);
    });
};
view.render('login');
}

controller(view);
