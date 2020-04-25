const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// all sanity checks for username
function checkUsername(input){
  const minLen = 8;
  const maxLen = 32;
  if(!checkRequired(input)){
    showError(input, `${getFieldName(input)} is required`);
  } else if(!checkLength(input, minLen, maxLen)){
    showError(input, `${getFieldName(input)} must be between ${minLen} to ${maxLen} characters`);
  } else{
    showSuccess(input);
  }
}

// all sanity checks for email
function checkEmail(input) {
  if(!checkRequired(input)){
    showError(input, `${getFieldName(input)} is required`);
  } else if(!isValidEmail(input)){
    showError(input, `${getFieldName(input)} is not valid`);
  }else{
    showSuccess(input);
  }
}

/**
 * All sanity checks for both passowords.
 * Kept both in same place as checks for some things of password2 need password1 also 
 */
function checkPasswords(input1, input2){
  /**
   * We will never check length of password2. Only condition that we will 
   * check for it is, if it is not empty, it should be equal to passoword1.
   */
 
   const isPassword1Present = checkRequired(input1);
   const isPassword2Present = checkRequired(input2);
   const minLen = 8;
   const maxLen = 32;
 
   if(!isPassword1Present){
     showError(input1, `Password is required`);
     if(!isPassword2Present){
       showError(input2, `Password is required`);
     }else{
       showError(input2, `Passwords do not match`);
     }
   }else{
     /**
      * Now password 1 is present. So, we will give error that passwords do not
      * mismatch even if password 2 is not present. Because, this will tell that
      * this field is required and should match the password 1 at the same time.
      * Instead, if password 1 is present and password 2 is not, then saying
      *  password2 is required will not tell the user that both should match.
      */
     if(!checkLength(input1, minLen, maxLen)){
       showError(input1, `${getFieldName(input1)} must be between ${minLen} to ${maxLen} characters`);
     }else{
       showSuccess(input1);
     }
 
     if(!checkPasswordsMatch(input1, input2)){
       showError(input2, 'Passwords do not match');
     }else{
       showSuccess(input2);
     }
   }
 }

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.remove('succes');
  formControl.classList.add('error');
  const smallTag = formControl.querySelector('small');
  smallTag.innerText = message;
}

// show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
}

function checkRequired(input) {
  return input.value.trim() !== '';
}


function isValidEmail(input){
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(input.value).toLowerCase());
}

// check input length
function checkLength(input, min, max) {
  const inputValue = input.value.trim(); 
  return inputValue.length >= min && inputValue.length <= max;
}

// get fieldname of a field in the form
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check passwords match
function checkPasswordsMatch(input1, input2){
  return input1.value === input2.value;
}

// event listerners
form.addEventListener('submit', function(event) {
  // to prevent the form from actually submitting to a file
  event.preventDefault();
  checkUsername(username);
  checkEmail(email);
  checkPasswords(password, password2);
});
