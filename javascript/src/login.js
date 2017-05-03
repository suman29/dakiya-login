var Parse = require('parse'),
    $ = require("jquery"),
    ConfigVars = window.config;

Parse.initialize(ConfigVars.APP_ID);
Parse.serverURL = ConfigVars.ServerURL;

function submitForm() {
  var username = $("#username"),
      password = $("#password"),
      name = username.val(),
      pswd = password.val();

  Parse.User.logIn(name, pswd, {
    success: function (user) {
      console.log("UserID: ", user.get('username'));
    },
    error: function (user, error) {
      // The login failed. Check error to see why.
      alert('Login failure: ', error);
    }
  });
}

$("#btnLogin").click(submitForm);