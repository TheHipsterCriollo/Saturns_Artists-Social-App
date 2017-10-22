var view = {
  user: null,
  getLogin: function getLogin() {
    var formulario = document.createElement('div');
    var reg = 'register';
    formulario.setAttribute('id', 'formularioLogin');
    formulario.innerHTML = `
    <form id="login">
    <input type="text" name="user" placeholder="Usuario" /><br>
    <input type="password" name="pass" placeholder="Contraseña" /><br>
    </form>
    <span>Si no tienes cuenta </span><a href='#'>regístrate</a>
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
      console.log('got it');
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
    registro.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      that.onRegister(e.target.user.name, e.target.subName.value, e.target.user.value, e.target.pass.value, e.target.email.value, e.target.pais.value);
    });
    return registro;
  },

  getUpload: function getUpload() {
    var upload = document.createElement('div');
    upload.setAttribute('id', 'uploadPost');
    upload.innerHTML = `
    <form id="uploading">
    <h3>Sube tus diseños (máximo 3)</h3>
    <input type="file" id="images" name="images"
         accept=".jpg, .jpeg, .png" multiple>
    <h3>Comenta:</h3>
    <input type="text" name="description"><br>
    <input type="submit">
    </form>
    `;
    return upload;
  },

  getPost: function getPost() {
    var post = document.createElement('div');
    post.setAttribute('id', 'post');
    post.innerHTML = `
      <div id='izq'>
      <!-- IMAGENES----->
      </div>
      <div id='der'>
      <div class='header'>
      <!-- userImg----->
      <h5>UserName</h5>
      </div>
      <div clas='comments'>
      <!-- commets----->
      </div>
      <div class='comment'>
    <form id="comment">
    <input type="button" name="like" value="LIKE">
    <input type="text" name="comentario" placeholder="Da tu opinion"><br>
    <input type="submit">
    </form>
    </div>
    </div>
    `;
    return post;
  },

  render: function(pagina) {
    var container = document.getElementById('container');
    var login = this.getLogin();
    var registro = this.getRegistro();
    var upload = this.getUpload();
    var post = this.getPost();
    switch (pagina) {
      default:
      container.appendChild(login);
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
      case 'post':
        container.appendChild(post);
        break;
    }
  }
};
