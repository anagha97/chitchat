var $passwordmodel = $("#password-model");
var $passwordreq = $("#password-requirements");
var $loginmodal = $("#login-modal");
var $cremodal = $("#create-modal");
var $forgotpwd = $(".forgot-pwd");
var $forgoPassButton = $('#forgot-pass-button-modal');
var $errornomatch = $("#error-no-match");
var $errorNoMatchForgot = $('#error-no-match-forgot');
var $forgotPassInput = $('#forgot-pass-input');
var $validEmailForgot = $('#valid-email-forgot');


function user(first, last, email, password, id, verified, connected) {
  this.fName = first;
  this.lName = last;
  this.email = email;
  this.password = password;
  this.type = "Family";
  this.exp = "7/24/17";
  this.id = id;
  this.verified = verified;
  this.connected = connected;
  this.neverMem = false;
}

$forgoPassButton.click(function() {
  var email = $forgotPassInput.val();
  
  if (email === "" || !testEmail(email)) {
    $errorNoMatchForgot.show();
    $validEmailForgot.show();
  } else {
    $validEmailForgot.hide();
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      var userE = user.email;
      
      if (userE == email) {
        // if it does exist then show success message on members page
        resetPass(user);
        index = i;
        $errorNoMatchForgot.hide();
        break;
      } else {
        $errorNoMatchForgot.show();
      }
    }
  }
});

function resetPass(user) {  
  $errornomatch.hide();
  displayLoginModal(false);
  displayCreateModal(false);
  displayForgotModal(false);

  hideScrollModal(false);
  $(window).scrollTop(0);
  $('.msg-reset').show();
}

function displayLoginModal(display) {
  $loginmodal.toggle(display);
}
function displayForgotModal(display) {
  $passwordmodel.toggle(display);
}
function displayCreateModal(display) {
  $passwordreq.hide();
  // $weakbox.hide();
  // $fairbox.hide();
  // $strongbox.hide();
  $cremodal.toggle(display);
}

function hideScrollModal(display) {
  if (display) {
    $body.css("overflow", "hidden");
  } else {
    $body.css("overflow", "visible");
  }
}