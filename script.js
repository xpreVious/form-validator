const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");
const formArr = document.querySelectorAll("input"); // All inputs
const allBoxes = document.querySelectorAll(".form-box") // All ".form-box"


// Error functions

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector(".error-text");

	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};


// Check functions

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value.trim() === "") {
			showError(el, el.placeholder);
            el.value = "";
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
    if(input.value.length < min){
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} musi składać się z ${min} znaków!`)
    }
}

const checkPass = (pass1, pass2) => {
    if(pass1.value !== pass2.value){
        showError(pass2, 'Hasła się różnią!')
    }
}

const checkMail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    
    if(re.test(email.value)){
        clearError(email)
    } else{
        showError(email, 'Nieprawidłowy E-mail')
    }
}

const checkErrors = () => {
    let errorCount = 0;

    allBoxes.forEach(el => {
        if(el.classList.contains('error')){
            errorCount++
        }
    })

    if(errorCount === 0){
        popup.classList.add('show-popup')
    }
}


//Event listeners

sendBtn.addEventListener("click", (e) => {
	e.preventDefault();
	checkForm(formArr);
    checkLength(username, 3);
    checkLength(password, 8);
    checkPass(pass, pass2);
    checkMail(email);
    checkErrors();
});

clearBtn.addEventListener("click", (e) => {
	e.preventDefault();
	formArr.forEach((el) => {
		el.value = "";
        clearError(el);
	});
});
