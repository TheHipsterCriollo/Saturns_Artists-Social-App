var view = {
  user: null,
  post: null,
  posts: null,

  getLogin: function getLogin() {
    var formulario = document.createElement('div');
    var reg = 'register';
    formulario.setAttribute('id', 'formularioLogin');
    formulario.innerHTML = `
    <form id="login">
    <input type="text" name="user" placeholder="Usuario" /><br>
    <input type="password" name="pass" placeholder="Contraseña" /><br>
    <span>Si no tienes cuenta </span><a>regístrate</a>
    <input type="submit" style="display: none" />
    </form>
    <div id="saturns"><h1>SATURNS</h1><h4>take your design to higher level</h4></div>
    <div class="images">
    <img src="images/img/planet2.png">
    <img src="images/img/Logo.png">
    </div>
    `;
    var that = this;
    formulario.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      that.onLogin(e.target.user.value, e.target.pass.value);
    });
    formulario.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      that.render('register');
    });
    return formulario;
  },

  getRegistro: function getRegistro() {
    var registro = document.createElement('div');
    registro.setAttribute('id', 'formularioRegistro');
    registro.innerHTML = `
    <form id="registro">
    <h3>Nombre:</h3>
    <input type="text" name="name"><br>
    <h3>Apellidos:</h3>
    <input type="text" name="subName"><br>
    <h3>Usuario:</h3>
    <input type="text" name="user"><br>
    <h3>Contraseña:</h3>
    <input type="password" name="pass"><br>
    <h3>E-mail:</h3>
    <input type="email" name="email"><br>
    <h3>País</h3>
    <select id="pais" name="pais">
      <option value="">País</option>
       <option value="1">Colombia</option>
       <option value="2">México</option>
       <option value="3">Estados Unidos</option>
       <option value="4">Cánada</option>
       <option value="5">Chile</option>
       <option value="6">Argentina</option>
       <option value="7">Perú</option>
       <option value="8">Venezuela</option>
       <option value="9">España</option>
       <option value="10">Francia</option>
       <option value="11">Alemania</option>
    </select><br>
    <h3>Imagen de pérfil</h3>
    <input type="file" id="profile_pic" name="profile_pic"
         accept=".jpg, .jpeg, .png">
    <input type="submit" class="submitReg">
    </form>
    `;
    that = this;
    registro.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      that.onRegister(e.target.user.name, e.target.subName.value, e.target.user.value, e.target.pass.value, e.target.email.value, e.target.pais.value, e.target.profile_pic.files[0]);
    });
    return registro;
  },

  getUpload: function getUpload() {
    var upload = document.createElement('div');
    upload.setAttribute('id', 'uploadPost');
    upload.innerHTML = `
    <form id="uploading">
    <h3>Sube tu diseño</h3>
    <input type="file" id="images" name="img"
         accept=".jpg, .jpeg, .png">
    <h3>Comenta:</h3>
    <input type="text" name="description"><br>
    <input type="submit">
    </form>
    `;
    that = this;
    upload.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      that.onUpload(e.target.img.files[0], e.target.description.value, that.user.user);
    });
    return upload;
  },

  getPost: function getPost() {
    var post = document.createElement('div');
    post.setAttribute('id', 'post');
    post.innerHTML = `
      <div id='izq'>
      <img src='Public/img/posts/${post.img}' />
      </div>
      <div id='der'>
      <div class='header'>
      <!-- userImg----->
      <h5>${post.user}</h5>
      <p>${post.description}</p>
      </div>
      <div clas='comments'>
      <!-- commets----->
      </div>
      <div class='comment'>
    <input type="button" name="like" value="LIKE ${post.likes}">
    <form id="comment">
    <input type="text" name="comentario" placeholder="Da tu opinion"><br>
    <input type="submit">
    </form>
    </div>
    </div>
    `;
    post.querySelectorAll('input')[0].addEventListener('click', (e) => {
      e.preventDefault();
      console.log('soy un like');
      that.onLiked(post, this.user.user);
    });
    post.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      that.onComment(e.target.comentario.value, this.user.user, this.post);
    });
    return post;
  },

  getPosts: function getPosts() {
    console.log(posts);
    //console.log('wubba lubba dub dub: ' + this.posts);
    var biblioteca = document.createElement('div');
    biblioteca.setAttribute('id', 'biblioteca');
    biblioteca.innerHTML = `
    <button> SUBIR </button>
    `;
    var that = this;
    biblioteca.querySelector('button').addEventListener('click', (e) => {
      e.preventDefault();
      that.render('upload');
    });
    var posts = this.posts;
    var that = this;
    posts.forEach(function(post) {
      var post = that.getEachPost(post);
      biblioteca.appendChild(post);
    });
    return biblioteca;
  },

  getEachPost: function getEachPost(post) {
    var postH = document.createElement('div');
    postH.setAttribute('id', 'postH');
    postH.innerHTML = `
    <a>
      <h5>${post.user}</h5>
      <img src='images/posts/${post.img}' />
      <p>${post.description}</p>
      <div class='footer'></div>
      </a>
    `;
    var that = this;
    postH.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      that.onSelectedPost(post);
    });
    return postH;
  },

  render: function(pagina) {
    var container = document.getElementById('container');
    container.innerHTML = '';

    var login = this.getLogin();
    var registro = this.getRegistro();
    var upload = this.getUpload();
    var post = this.getPost();
    var home = this.getPosts();

    switch (pagina) {
      default: container.appendChild(login);
      break;
      case 'post':
          container.appendChild(post);
        break;
      case 'home':
          container.appendChild(home);
        break;
      case 'register':
          container.appendChild(registro);
        break;
      case 'upload':
          container.appendChild(upload);
        break;
    }
  }
};
