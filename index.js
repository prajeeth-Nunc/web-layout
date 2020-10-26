window.$serverUrl = 'https://984180ee7d8a.ngrok.io'

// Notification Manager
function Notification(Msg,statusFlag){
    const NotificationContainer = document.querySelector(".notification-container");
    const messageTag = NotificationContainer.querySelector('#notification-message');
    messageTag.innerHTML = Msg;
    if (statusFlag === 'success'){
        NotificationContainer.style.cssText = "display : block;"

    }else if(statusFlag === "failed"){
        NotificationContainer.style.cssText = "display : block;background:#fa626b;"
    }else{
        NotificationContainer.style.cssText = "display : block;background:#fdb901;"
    }
    setTimeout(()=>{NotificationContainer.style.cssText = "display : none;"},3000)
}

// Show Sign up form
function ShowSignUp(event){
    event.preventDefault();
    const loginContainer =document.querySelector(".login-container");
    loginContainer.style.display = "none";
    const changePwdContainer =document.querySelector(".ChangePassword-container");
    changePwdContainer.style.display = "none";
    const SignUpContainer =document.querySelector(".SignUp-container");
    SignUpContainer.style.display = "block";
}

// Show login form
function ShowLogin(event){
    event.preventDefault();
    const SignUpContainer =document.querySelector(".SignUp-container");
    SignUpContainer.style.display = "none";
    const changePwdContainer =document.querySelector(".ChangePassword-container");
    changePwdContainer.style.display = "none";
    const loginContainer =document.querySelector(".login-container");
    loginContainer.style.display = "block";
}

// SignUp form handling
function SignUp(event){
    event.preventDefault();
    const validators = ["",null,undefined]
    const SignForm =document.querySelector(".SignUp-form");
    const Saluation = SignForm.querySelector('#saluation').value;
    const FirstName = SignForm.querySelector('#firstname1').value;
    const LastName = SignForm.querySelector('#lasttname1').value;
    const Email =  SignForm.querySelector('#email1').value;
    const Password =  SignForm.querySelector('#password1').value;
    const PasswordAgain =  SignForm.querySelector('#passwordAgain1').value;
    console.log({Saluation,FirstName,LastName,Email,Password});
    
    if(validators.includes(FirstName)){
        Notification('Please Enter FirstName','warning');
    }else if(validators.includes(LastName)){
        Notification('Please Enter LastName','warning');
    }else if(validators.includes(Email)){
        Notification('Please Enter Email ID','warning');
    }else if(validators.includes(Password)){
        Notification('Please Enter Password','warning');
    }else if(validators.includes(PasswordAgain)){
        Notification('Please Re-Enter Password','warning');
    }else if(Password !== PasswordAgain){
        Notification('Passwords Doesn\'t match','warning');
    }else{
        let data = {Saluation,FirstName,LastName,Email,Password}
        console.log('SignUp : ',data);
        fetch(window.$serverUrl+'/Signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(resData => {
            if(resData.msg === "SignUp Successfull"){
                Notification('&#10004;   Signned up Successfully','success')
                ShowLogin(event);
            }else{
                Notification(resData.msg,'failed')
            }
        })
        .catch((error) => {
            console.log(error)
            Notification(error,'failed')
        });
    }
}

// Login form handling
function Login(event){
    event.preventDefault();
    console.log(window.$serverUrl);
    const validators = ["",null,undefined]
    const loginForm =document.querySelector(".login-form");
    const Email =  loginForm.querySelector('#email').value;
    const Password =  loginForm.querySelector('#password').value;
    console.log(Email,Password);
    if(validators.includes(Email)){
        Notification('Email ID missing','warning');
    }else if (validators.includes(Password)){
        Notification('Password missing','warning');
    }else{
        let data = {Email,Password}
        console.log('Login : ',data);
        fetch(window.$serverUrl + '/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(resData => {
            console.log(resData)
            if(resData.msg === "Logged in Successfully"){
                Notification(`&#10004;   ${resData.msg}`,'success')
                window.location.href = 'home.html';
            }else{
                Notification(resData.msg,'failed')
            }
        })
        .catch((error) => {
            console.log(error)
            Notification(error,'failed')
        });
    }
}

// Forgot Password
function ForgotPassword(event){
    event.preventDefault();
    const loginContainer =document.querySelector(".login-container");
    loginContainer.style.display = "none";
    const changePwdContainer =document.querySelector(".ChangePassword-container");
    changePwdContainer.style.display = "block";
}

// Validate Email
function ValidateEmail(event){
    event.preventDefault();
    const validators = ["",null,undefined]
    const SendEmailForm =document.querySelector(".SendEmail-form");
    const Email =  SendEmailForm.querySelector('#email2').value;
    console.log(Email);
    if(validators.includes(Email)){
        Notification('Email ID missing','warning');
    }else{
        let data = {Email};
        fetch(window.$serverUrl + '/isValidUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(resData => {
            console.log(resData)
            if(resData.status){
                Notification('Valid Email Id','success')
                localStorage.setItem('Email',Email);
                displayChangePassword(event)
            }else{
                Notification('Invalid Email Id','failed')
            }
        })
        .catch((error) => {
            console.log(error)
            Notification(error,'failed')
        });
    }
}

// get Email 
function displayChangePassword(event){
    event.preventDefault();
    const SendEmailForm =document.querySelector(".SendEmail-form");
    SendEmailForm.style.display = "none";
    const ChangePasswordForm =document.querySelector(".ChangePassword-form");
    ChangePasswordForm.style.display = "block";
    
}

// Change Password
function ChangePassword(event){
    event.preventDefault();
    const validators = ["",null,undefined]
    const ChangePasswordForm =document.querySelector(".ChangePassword-form");
    const ChangePassword =  ChangePasswordForm.querySelector('#password2').value;
    const PasswordAgain =  ChangePasswordForm.querySelector('#passwordAgain2').value;
    console.log(ChangePassword,PasswordAgain)
    if(validators.includes(ChangePassword)){
        Notification('Please Enter Password','warning');
    }else if(validators.includes(PasswordAgain)){
        Notification('Please Re-Enter Password','warning');
    }else if(ChangePassword !== PasswordAgain){
        Notification('Both Passwords Doesn\'t match','warning');
    }else{
        let Email = localStorage.getItem('Email');
        let data = {Email,ChangePassword}
        fetch(window.$serverUrl+'/changePassword',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(resData => {
            if(resData.msg === 'Password changed successfully'){
                Notification('Password changed Successfully','success')
                ShowLogin(event);
            }else{
                Notification('Password change failed','failed')
            }
        })
        .catch((error) => {
            console.log(error)
            Notification(error,'failed')
        });
    }
}

// Home Page/nav-header 
const barIcon = document.querySelector('.nav-han')
barIcon.addEventListener('click', showMainMenuLabels)

function showMainMenuLabels() {
    let  mainMenu = document.querySelectorAll('.main-menu ul li a span');
    let spanItem = document.querySelector('.main-menu ul li a span');
    console.log(spanItem);
    if(spanItem.style !== undefined){
        if(spanItem.style.display !== 'none'){
            mainMenu.forEach(item => item.style.display = 'none');
        }else{
            mainMenu.forEach(item => item.style.display = 'inline-block');
        }
    }else{
        mainMenu.forEach(item => item.style.display = 'none');
    }
}

// show side menu 
const sidebar = document.querySelector('.side-bar');
sidebar.addEventListener('click', showSideBarMenu)

function showSideBarMenu() {
    const validators = ["",null,undefined]
    let  sideMenuText = document.querySelectorAll('.main-menu-side ul li a span');
    let sideMenu = document.querySelector('.main-menu-side')
    console.log('sideMenu.style.display :',sideMenu.style.display)
    if(validators.includes(sideMenu.style)){
        sideMenu.style.display = 'block';
        sideMenuText.forEach(item => item.style.display = 'inline-block');
    }else{
        if( sideMenu.style.display === 'block'){
            sideMenu.style.display = 'none';
        }else{
            sideMenu.style.display = 'block';
            sideMenuText.forEach(item => item.style.display = 'inline-block');
        }
    }
}