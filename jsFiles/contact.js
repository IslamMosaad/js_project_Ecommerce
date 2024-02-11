
//#region upArrow
let myUPArrow = document.getElementById("scroll-icon");


window.onscroll = function() {
    if (window.scrollY >= 300) {
        myUPArrow.style.display = "block";
      } else {
        myUPArrow.style.display = "none";
      }
};

myUPArrow.onclick = function() {
    window.scrollTo({left:0,top:0,behavior:'smooth'});
}
  
//#endregion


let contactForm = document.getElementById("contact-form");


contactForm.addEventListener("submit", function(event) {
     event.preventDefault();

  let fullname = document.getElementById("fullname");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirm-password");
  let message = document.getElementById("message");


  let fullnameError = document.getElementById("fullname-error");
  let emailError = document.getElementById("email-error");
  let passwordError = document.getElementById("password-error");
  let confirmPasswordError = document.getElementById("confirm-password-error");
  let messageError = document.getElementById("message-error");

 
  let isValid = true;

  // Validate the fullname field
  if (fullname.value.trim() === "") {
    fullnameError.textContent = "Please enter your full name.";
    fullname.classList.add("is-invalid");
    isValid = false;
  } else {
    fullnameError.textContent = "";
    fullname.classList.remove("is-invalid");
  }

  // Validate the email field
  if (email.value.trim() === "") {
    emailError.textContent = "Please enter your email address.";
    email.classList.add("is-invalid");
    isValid = false;
  } else if (!validateEmail(email.value)) {
    emailError.textContent = "Please enter a valid email address.";
    email.classList.add("is-invalid");
    isValid = false;
  } else {
    emailError.textContent = "";
    email.classList.remove("is-invalid");
  }

  // Validate the password field
  if (password.value.trim() === "") {
    passwordError.textContent = "Please enter your password.";
    password.classList.add("is-invalid");
    isValid = false;
  } else if (password.value.length < 8) {
    passwordError.textContent = "Please enter a password of at least 8 characters.";
    password.classList.add("is-invalid");
    isValid = false;
  } else {
    passwordError.textContent = "";
    password.classList.remove("is-invalid");
  }

  // Validate the confirm password field
  if (confirmPassword.value.trim() === "") {
    confirmPasswordError.textContent = "Please confirm your password.";
    confirmPassword.classList.add("is-invalid");
    isValid = false;
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "The passwords do not match.";
    confirmPassword.classList.add("is-invalid");
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
    confirmPassword.classList.remove("is-invalid");
  }

  // Validate the message field
  if (message.value.trim() === "") {
    messageError.textContent = "Please enter your message.";
    message.classList.add("is-invalid");
    isValid = false;
  } else {
    messageError.textContent = "";
    message.classList.remove("is-invalid");
  }

  if (isValid) {
    alert("your message has been sent. Thank you for contacting us");
  }
  
});




function validateEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


let numberOfProductsInCart=document.getElementById("numberOfProductsInCart");
let productsCounter=Number(sessionStorage.getItem("productsCounter")) || 0;
numberOfProductsInCart.textContent=productsCounter;