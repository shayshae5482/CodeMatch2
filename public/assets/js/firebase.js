
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDmy45P5faEmQB7A6fxpTPYqia4aWM4z6c",
  authDomain: "codematch-grp2.firebaseapp.com",
  databaseURL: "https://codematch-grp2.firebaseio.com",
  projectId: "codematch-grp2",
  storageBucket: "codematch-grp2.appspot.com",
  messagingSenderId: "451759923507"
};
firebase.initializeApp(config);
var db = firebase.database();
var username ;

//=====================================================================

$(document).ready(function () {
  //	Listens for users signing in or out
  firebase.auth().onAuthStateChanged(function (user) {
    if (user && username != '') {
      //	User successfully created
      user.updateProfile({
        displayName: username
      }).then(function () {
        db.ref('users/' + user.uid + '/userInfo').set({
          displayName: user.displayName,
          email: user.email
        });

        sendEmailVerification();
        window.location.href = '../index.html';
      }, function (error) {
        alert(error.message);
      });
    }
  });
  $('#signup-btn').click(function (event) {
    event.preventDefault();
    signUp();
  });
  //	Toggles Help Info on hover
  $('.help-icon').hover(function () {
    $('.tooltip-text').removeClass('js-hidden');
  }, function () {
    $('.tooltip-text').addClass('js-hidden');
  });
});

$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //	redirect to homepage if logged in
      // window.location.href = "../index.html";
    } else {
      //	User is signed out
      console.log('User is signed out');
    }
  });
  $('#login-btn').click(function (event) {
    event.preventDefault();
    signIn();
  });
});

function escapeHTML(string) {
  var HTMLentities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  return String(string).replace(/[&<>"'`=\/]/g, function (entity) {
    return HTMLentities[entity];
  });
};

function displayErrors(input, errorMsg) {
  $('#errors-display').empty();
  var errorsDiv = $('<h3>');
  errorsDiv.text('Please fix the following error:');
  errorsDiv.addClass('errors-container');
  var error = $('<p>');
  error.html('&middot; ' + errorMsg);
  error.addClass('errors');
  errorsDiv.append(error);
  $('#errors-display').append(errorsDiv);
  $('#errors-display').removeClass('js-hidden');
  $('#' + input + '-icon').removeClass('js-hidden');
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    $('input').removeClass('error');
  }
  if (input == 'password') {
    $('#password-icon').text('!').addClass('error-icon');
  }
};

function signUp() {
  var email = $('#email').val().trim();
  var password = $('#password').val().trim();
  var passwordConfirm = $('#password-confirm').val().trim();
  var username = $('#username').val().trim();
  var errors = false;
  // $('#username-icon').addClass('js-hidden');
  // $('#email-icon').addClass('js-hidden');
  // $('#password-icon').text().removeClass('error-icon');
  // $('#confirm-icon').addClass('js-hidden');

  if (username == '') {
    displayErrors('username', 'Username required');
    errors = true;
    $('#username').focus().addClass('error');
  } else if (!/^[A-Za-z0-9_-]*$/.test(username)) {
    displayErrors('username', 'Username can only contain letters, numbers, dashes and underscores');
    errors = true;
    $('#username').focus().addClass('error');
  } else if (!/(^.{4,25}$)/.test(username)) {
    displayErrors('username', 'Username must be between 4 and 25 characters long');
    errors = true;
    $('#username').focus().addClass('error');
  } else if (email == '') {
    displayErrors('email', 'Email is required');
    errors = true;
    $('#email').focus().addClass('error');
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    displayErrors('email', 'Email address is not valid');
    errors = true;
    $('#email').focus().addClass('error');
  } else if (password == '') {
    displayErrors('password', 'Password is required');
    errors = true;
    $('#password').focus().addClass('error');
  } else if (!/(?=.*[A-Z])/.test(password)) {
    displayErrors('password', 'Password requires a capital letter');
    errors = true;
    $('#password').focus().addClass('error');
  } else if (!/(?=.*[a-z])/.test(password)) {
    displayErrors('password', 'Password requires a lowercase letter');
    errors = true;
    $('#password').focus().addClass('error');
  } else if (!/(?=^\S*$)/.test(password)) {
    displayErrors('password', 'Password cannot contain any white spaces');
    errors = true;
    $('#password').focus().addClass('error');
  } else if (!/(?=.*\d)/.test(password)) {
    displayErrors('password', 'Password requires a number');
    errors = true;
    $('#password').focus().addClass('error');
  } else if (!/(?=.*[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\\\|\;\:\'\"\,\.\<\>\/\?])/.test(password)) {
    displayErrors('password', 'Password requires a non-alphanumeric character');
    errors = true;
    $('#password').focus().addClass('error');
  } else if (!/(^.{6,15}$)/.test(password)) {
    displayErrors('password', 'Password must be between 6 and 15 characters');
    errors = true;
    $('#password').focus().addClass('error');
  } else if (passwordConfirm == '') {
    displayErrors('confirm', 'Please confirm password');
    errors = true;
    $('#password-confirm').focus().addClass('error');
  } else if (password != passwordConfirm) {
    displayErrors('confirm', 'Passwords do not match');
    errors = true;
    $('#password-confirm').focus().addClass('error');
  }

  if (!errors) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/weak-password') {
        displayErrors('password', 'The password is too weak.');
      } else {
        displayErrors('email', errorMessage);
      }
      console.log(error);
    })
    db.ref().push({
      username: username,
      email: email
    })
  }
}; //closes signUp function

function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function () {
    console.log('Email verification sent');
  });
}; //closes sendEmailVerification function

function signIn() {
  var errors = false;
  $('#email-icon').addClass('js-hidden');
  $('#password-icon').addClass('js-hidden');
  if (firebase.auth().currentUser) {
    //	If user is signed in, sign them out
    firebase.auth().signOut();
  } else {
    var email = $('#email').val().trim();
    var password = $('#password').val().trim();
    if (email == '') {
      displayErrors('email', 'Email required');
      $('#email').focus().addClass('error');
      errors = true;
    } else if (password == '') {
      displayErrors('password', 'Password required');
      $('#password').focus().addClass('error');
      errors = true;
    }
    if (!errors) {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        //	Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          displayErrors('password', 'Incorrect password');
          $('#password').focus().addClass('error');
        } else {
          displayErrors('email', errorMessage);
          $('#email').focus().addClass('error');
        }
        console.log(error);
      })
      window.location.href = "../index.html";
    }
  }
}; //closes signIn function

function logOut() {

  if (firebase.auth().currentUser) {
    //	If user is signed in, sign them out
    firebase.auth().signOut();
  }
}; //closes logOut function

function resetPassword() {
  var errors = false;
  var email = $('#email').val().trim();
  $('#email-icon').addClass('js-hidden');
  if (email == '') {
    displayErrors('email', 'Email required');
    $('#email').focus().addClass('error');
    errors = true;
  }
  if (!errors) {
    firebase.auth().sendPasswordResetEmail(email).then(function () {
      alert('Password has been reset. Follow the instructions in the email sent to your inbox to change your password and login.');
      window.location.href = "login.html";
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        displayErrors('email', errorMessage);
        $('#email').focus().addClass('error');
      } else if (errorCode == 'auth/user-not-found') {
        displayErrors('email', errorMessage);
        $('#email').focus().addClass('error');
      }
      console.log(error);
    });
  }
}; // closes resetPassword function

