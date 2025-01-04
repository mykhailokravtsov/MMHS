document.addEventListener("DOMContentLoaded", function () {
    const tutorBtn = document.getElementById("tutorBtn");
    const studentBtn = document.getElementById("studentBtn");
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    let selectedRole = "";

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

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (selectedRole === "student" && username === "student" && password === "student") {
            alert("You are logined as student!");
        } else if (selectedRole === "tutor" && username === "tutor" && password === "tutor") {
            alert("You are logined as tutor!");
        } else {
            alert("Wrong login or password!");
        }
    });
});