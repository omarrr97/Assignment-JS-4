var signupNameInput = document.getElementById("signupName");
var signupEmailInput = document.getElementById("signupEmail");
var signupPasswordInput = document.getElementById("signupPassword");
var signinEmailInput = document.getElementById("signinEmail");
var signinPasswordInput = document.getElementById("signinPassword");

var accountList = [];
if (localStorage.getItem("users") !== null) {
  accountList = JSON.parse(localStorage.getItem("users"));
}

function addAccount() {
  if (isEmpty() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }

  var account = {
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };

  if (isEmail() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">email already exists</span>';
  } else {
    accountList.push(account);
    localStorage.setItem("users", JSON.stringify(accountList));
    clearForm();
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
  }
}

function clearForm() {
  signupNameInput.value = null;
  signupEmailInput.value = null;
  signupPasswordInput.value = null;
 
}

function isEmpty() {
  if (
    signupNameInput.value == "" ||
    signupEmailInput.value == "" ||
    signupPasswordInput.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function isEmail() {
  for (var i = 0; i < accountList.length; i++) {
    if (accountList[i].email == signupEmailInput.value) {
      return false;
    }
  }
}

// ============ for login ===========

function isLogin() {
  if (isLoginEmpty() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }

  var email = signinEmailInput.value;
  var pass = signinPasswordInput.value;

  for (var i = 0; i < accountList.length; i++) {
    if (
      accountList[i].email == email &&
      accountList[i].password == pass
    ) {
      localStorage.setItem("userName", accountList[i].name);
      location = "home.html";
      clearFormLogin()
    } else {
      document.getElementById("exist").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}

function clearFormLogin() {
  signinEmailInput.value = null;
  signinPasswordInput.value = null;
}

function isLoginEmpty() {
  if (
    signinEmailInput.value == "" ||
    signinPasswordInput.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

// ============== for home ==============

function isLogout() {
  localStorage.removeItem('userName')
}

var username = localStorage.getItem("userName");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}


