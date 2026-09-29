// ========================================
// PORTFOLIO JAVASCRIPT
// ========================================


// ========================================
// 1. SELECT DOM ELEMENTS
// ========================================

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const moreBtn = document.getElementById("moreBtn");
const moreText = document.getElementById("moreText");

const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const successMessage =
    document.getElementById("successMessage");


// ========================================
// 2. DARK MODE
// ========================================

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const darkMode =
        document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", darkMode);

    updateThemeButton();
}


function updateThemeButton() {

    const darkMode =
        document.body.classList.contains("dark-mode");

    if (darkMode) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
}


function loadDarkMode() {

    const savedTheme =
        localStorage.getItem("darkMode");

    if (savedTheme === "true") {

        document.body.classList.add("dark-mode");
    }

    updateThemeButton();
}


themeToggle.addEventListener(
    "click",
    toggleDarkMode
);

loadDarkMode();


// ========================================
// 3. MOBILE MENU
// ========================================

function toggleMenu() {

    navLinks.classList.toggle("show");
}


menuToggle.addEventListener(
    "click",
    toggleMenu
);


// Close menu after clicking a link

const navigationLinks =
    document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("show");

    });

});


// ========================================
// 4. SHOW / HIDE ABOUT CONTENT
// ========================================

function toggleMoreContent() {

    moreText.classList.toggle("hidden");

    if (moreText.classList.contains("hidden")) {

        moreBtn.textContent = "Show More";

    } else {

        moreBtn.textContent = "Show Less";

    }
}


moreBtn.addEventListener(
    "click",
    toggleMoreContent
);


// ========================================
// 5. IMAGE / PROJECT SLIDER
// ========================================

let currentSlide = 0;


function showSlide(index) {

    slides.forEach(function(slide) {

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");
}


function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);
}


function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);
}


nextBtn.addEventListener(
    "click",
    nextSlide
);


prevBtn.addEventListener(
    "click",
    previousSlide
);


// ========================================
// 6. TO-DO LIST
// ========================================

function addTask() {

    const task =
        todoInput.value.trim();

    if (task === "") {

        alert("Please enter a task.");

        return;
    }


    createTodoItem(task);

    todoInput.value = "";

    saveTasks();
}


function createTodoItem(task) {

    const li =
        document.createElement("li");

    const taskText =
        document.createElement("span");

    taskText.textContent = task;


    const deleteButton =
        document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.classList.add(
        "delete-btn"
    );


    deleteButton.addEventListener(
        "click",
        function() {

            li.remove();

            saveTasks();

        }
    );


    li.appendChild(taskText);

    li.appendChild(deleteButton);

    todoList.appendChild(li);
}


addTodo.addEventListener(
    "click",
    addTask
);


// Allow Enter key to add task

todoInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// ========================================
// 7. SAVE TASKS TO LOCAL STORAGE
// ========================================

function saveTasks() {

    const tasks = [];

    const items =
        todoList.querySelectorAll("li");


    items.forEach(function(item) {

        const text =
            item.querySelector("span").textContent;

        tasks.push(text);

    });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


function loadTasks() {

    const savedTasks =
        JSON.parse(
            localStorage.getItem("tasks")
        );


    if (savedTasks === null) {

        return;

    }


    savedTasks.forEach(function(task) {

        createTodoItem(task);

    });
}


loadTasks();


// ========================================
// 8. EMAIL VALIDATION
// ========================================

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


// ========================================
// 9. SHOW FORM ERROR
// ========================================

function showError(input, message) {

    input.classList.add("error");

    const errorElement =
        input.parentElement.querySelector(
            ".error-message"
        );

    errorElement.textContent = message;
}


// ========================================
// 10. CLEAR FORM ERROR
// ========================================

function clearError(input) {

    input.classList.remove("error");

    const errorElement =
        input.parentElement.querySelector(
            ".error-message"
        );

    errorElement.textContent = "";
}


// ========================================
// 11. CONTACT FORM VALIDATION
// ========================================

function validateForm(event) {

    event.preventDefault();


    let valid = true;


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const message =
        messageInput.value.trim();


    // Clear old errors

    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);

    successMessage.textContent = "";


    // Validate name

    if (name.length < 2) {

        showError(
            nameInput,
            "Please enter your name."
        );

        valid = false;
    }


    // Validate email

    if (!validateEmail(email)) {

        showError(
            emailInput,
            "Please enter a valid email address."
        );

        valid = false;
    }


    // Validate message

    if (message.length < 10) {

        showError(
            messageInput,
            "Message must be at least 10 characters."
        );

        valid = false;
    }


    // If everything is valid

    if (valid) {

        successMessage.textContent =
            "Message sent successfully!";

        contactForm.reset();

    }

}


// Add submit event listener

contactForm.addEventListener(
    "submit",
    validateForm
);


// ========================================
// 12. REAL-TIME EMAIL VALIDATION
// ========================================

emailInput.addEventListener(
    "input",
    function() {

        const email =
            emailInput.value.trim();


        if (email === "") {

            clearError(emailInput);

            return;
        }


        if (validateEmail(email)) {

            clearError(emailInput);

        } else {

            showError(
                emailInput,
                "Please enter a valid email address."
            );

        }

    }
);


// ========================================
// 13. REAL-TIME MESSAGE VALIDATION
// ========================================

messageInput.addEventListener(
    "input",
    function() {

        const message =
            messageInput.value.trim();


        if (message.length >= 10) {

            clearError(messageInput);

        } else {

            showError(
                messageInput,
                "Message must be at least 10 characters."
            );

        }

    }
);


// ========================================
// 14. REAL-TIME NAME VALIDATION
// ========================================

nameInput.addEventListener(
    "input",
    function() {

        const name =
            nameInput.value.trim();


        if (name.length >= 2) {

            clearError(nameInput);

        } else {

            showError(
                nameInput,
                "Name must be at least 2 characters."
            );

        }

    }
);


// ========================================
// JAVASCRIPT LOADED
// ========================================

console.log(
    "Portfolio JavaScript loaded successfully!"
);
