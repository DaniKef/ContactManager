class User 
{
    #login;
    #password;
    constructor()
    {
        let localStorageLogin = localStorage.getItem("login");
        let localStoragePassword = localStorage.getItem("password");
        if((localStorageLogin == null || localStorageLogin == "none") && (localStoragePassword == null || localStoragePassword == "none"))
        {
            localStorage.setItem("login", "none");
            localStorage.setItem("password", "none");
            this.#login = "none";
            this.#password = "none";
        }
        else
        {
            this.#login = localStorageLogin;
            this.#password = localStoragePassword;
        }
    }
    userExists()
    {
       if((this.#login == null || this.#login == "none") && (this.#password == null || this.#password == "none")) { return false; }
       else { return true; }
    }
    setButton()
    {
        divAuthBtn.innerHTML = "";
        if((this.#login == null || this.#login == "none") && (this.#password == null || this.#password == "none")) 
        { 
            divAuthBtn.innerHTML += "<button id='authBtn' onclick='LogInForm();'>Log In</button>";
            listOfContact.style.display = "none";
            sortForm.style.display = "none";
            navbartogglerbtn.style.display = "none";
        }
        else 
        {
            divAuthBtn.innerHTML += "<button id='authBtn' onclick='LogOutForm();'>Log Out</button>";
            showAllContacts(); // Показать все контакты\ было
        }
    }
}

function LogInForm()
{
    LogInFormDiv.innerHTML = "";
    LogInFormDiv.innerHTML += "    <div id='LogInForm' class='LogInOutForm'>" +
    "<div class='divLogInForm'><h4>Вхід</h4></div>" +
    "<div class='divLogInForm'><p>Пошта</p> <input type='text' id='inputEmail'></div>" +
    "<div class='divLogInForm'><p>Пароль</p> <input type='password' id='inputPassword'></div>" +
    "<div class='divLogButtons'>" +
        "<button id='logInBtn' onclick='logInUser();'>Увійти</button>"+
        "<button id='authCancelBtn' onclick='authCancel();'>Відміна</button>" +
    "</div>"+  
    "<div class='divLogSuggestion'><p>Немає облікового запису?</p><button id='showRegistrationBtn' onclick='showRegistration();'>Зареєструйтесь</button></div>"+
    "<div id='divLogInSuccess' class='divLogInForm' style='display:none; color:red;'><h4>Перевірте правильність введення даних.</h4></div>"+
"</div>";
}

function showRegistration(){
    LogInFormDiv.innerHTML = "";
    LogInFormDiv.innerHTML += "    <div id='LogInForm' class='LogInOutForm'>" +
    "<div class='divLogInForm'><h4>Реєстрація</h4></div>" +
    "<div class='divLogInForm'><p>Пошта</p> <input type='text' id='inputEmail'></div>" +
    "<div class='divLogInForm'><p>Пароль</p> <input type='password' id='inputPassword'></div>" +
    "<div class='divLogInForm'><p>Підтвердження пароля</p> <input type='password' id='inputConfirmPassward'></div>"+
    "<div class='divLogButtons'>" +
        "<button id='registrationBtn' onclick='Registration();'>Зареєструватись</button>"+
        "<button id='authCancelBtn' onclick='authCancel();'>Відміна</button>" +
    "</div>"+  
    "<div class='divLogSuggestion'><p>Вже є обліковий запис?</p><button id='showRegistrationBtn' onclick='LogInForm();'>Увійдіть</button></div>"+
    "<div id='divLogInFormPassShortErr' class='divLogInForm' style='display:none; color:red;'><h4>Мінімальна довжина пароля 4 символи.</h4></div>"+
    "<div id='divLogInFormPassErr' class='divLogInForm' style='display:none; color:red;'><h4>Перевірте правильність введеного пароля.</h4></div>"+
    "<div id='divLogInFormEmailErr' class='divLogInForm' style='display:none; color:red;'><h4>Перевірте правильність введеної пошти.</h4></div>"+
    "<div id='divLogInFormSuccessReg' class='divLogInForm' style='display:none; color:#41a364;'><h4>Реєстрація пройшла успішно.</h4></div>"+
    "<div id='divLogInFormErrorReg' class='divLogInForm' style='display:none; color:red;'><h4>Користувач із такою поштою вже існує.</h4></div>"+
"</div>";
}

function authCancel() {
    LogInFormDiv.innerHTML = "";
}


function Registration() {
    let regex = new RegExp("^[a-zA-Z\\d._-]+@[a-zA-Z\\d.-]+\\.");
    if(inputPassword.value.length < 4)
    {
        divLogInFormPassShortErr.style.display = "block";
    }
    else
    {
        divLogInFormPassShortErr.style.display = "none";
        if(inputPassword.value != inputConfirmPassward.value)
         {
            divLogInFormPassErr.style.display = "block";
         }
        else
         {
            divLogInFormPassErr.style.display = "none";
            if(!(regex.test(inputEmail.value)))
            {
                divLogInFormEmailErr.style.display = "block";
            }
            else
            {
                divLogInFormEmailErr.style.display = "none";
                const formData = new FormData();
                formData.append('operation', 'registration');
                formData.append('emailUser', inputEmail.value);
                formData.append('password', inputPassword.value);
                fetch(scriptUrl, {
                    method: 'POST', body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data[0].result == "NotExists")
                        {
                            divLogInFormSuccessReg.style.display = "block";
                            divLogInFormErrorReg.style.display = "none";
                        }
                        else
                        {
                            divLogInFormSuccessReg.style.display = "none";
                            divLogInFormErrorReg.style.display = "block";
                        }
                        
                });
            }
        }
    }
}

function logInUser() {
    const formData = new FormData();
    formData.append('operation', 'logIn');
    formData.append('emailUser', inputEmail.value);
    formData.append('password', inputPassword.value);
    fetch(scriptUrl, {
        method: 'POST', body: formData
    })
        .then(res => res.json())
        .then(data => {
            if(data[0].result == "NotExists")
            {
                divLogInSuccess.style.display = "block";
            }
            else
            {
                divLogInSuccess.style.display = "none";
                localStorage.setItem("login", data[0].result);
                localStorage.setItem("password", data[0].password);
                window.location.href = "index.html";
            }
         });
}

function LogOutForm() {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('dataOnSite');
    localStorage.removeItem('size');
    window.location.href = "index.html";
}