document.addEventListener("DOMContentLoaded", function () {
    const tutorBtn = document.getElementById("tutorBtn");
    const studentBtn = document.getElementById("studentBtn");
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const passwordCheckbox = document.getElementById("showPassword");


    let selectedRole = "student";

    function setActive(button, role) {
        tutorBtn.classList.remove("active");
        studentBtn.classList.remove("active");
        button.classList.add("active");
        selectedRole = role;
    }

    tutorBtn.addEventListener("click", function () {
        setActive(tutorBtn, "tutor");
    });

    studentBtn.addEventListener("click", function () {
        setActive(studentBtn, "student");
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (selectedRole === "student" && username === "student" && password === "student") {
            window.location.href = 'courseListStudent.html';
        } else if (selectedRole === "tutor" && username === "tutor" && password === "tutor") {
            window.location.href = 'courseListTutor.html';
        } else {
            alert("Wrong login or password!");
        }
    });

    passwordCheckbox.addEventListener("change", function(){
        if(passwordCheckbox.checked){
            passwordInput.type = "text";
        }else{
            passwordInput.type = "password";
        }
    })
});