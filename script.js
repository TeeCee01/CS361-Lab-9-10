//1. Grab and Change
const aboutHeading = document.querySelector("#about h2");
const aboutParagraph= document.querySelector("#about p");

aboutHeading.textContent = "About Me (page loaded!)";
aboutParagraph.style.color ="#e41978";

//2. Click Counter
let clickCount = 0;
const counterBtn = document.querySelector("#counter-btn");
const clickCountSpan = document.querySelector("#click-count");

counterBtn.addEventListener("click", () => {
  clickCount++;
  clickCountSpan.textContent = clickCount;
});

//3. Toggle a Theme
const toggleBtntheme = document.querySelector("#theme-toggle");

toggleBtntheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

//4. Build a List from Data
const courses = [
  "Artificial Intelligence",
  "Cyber Security Fundamentals",
  "Mobile App Development",
  "Cloud Computing",
  "Human-Computer Interaction"
];

const courseList = document.querySelector("#course-list");

function renderCourses(coursesArray) {
  courseList.innerHTML = coursesArray.map(course => `<li>${course}</li>`).join("");
}

renderCourses(courses);

const addCourseBtn = document.querySelector("#add-course-btn");

addCourseBtn.addEventListener("click", () => {
  const newCourseName = "New Course" + (courses.length + 1);
  courses.push(newCourseName);

  renderCourses(courses);

  //const newItem = document.createElement("li");
  //newItem.textContent = newCourseName;
  //courseList.appendChild(newItem);
});

//5. Live Search Filter 
const courseSearchInput = document.querySelector("#course-search");

courseSearchInput.addEventListener("input", () => {
  const searchTerm = courseSearchInput.value.toLowerCase();
  const filteredCourses = courses.filter(course =>
    course.toLowerCase().includes(searchTerm)
  );
  renderCourses(filteredCourses);
});

//6. Validate a Form
const signupForm = document.querySelector("#signup-form");
const formMessage = document.querySelector("#form-message");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#signup-name");
  const email = document.querySelector("#signup-email");
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();

  if (nameValue === "" || !emailValue.includes("@")) {
    formMessage.textContent = "Please enter a valid name and email address.";
    formMessage.className = "form-error";
  } else {
    formMessage.textContent = `Thanks for signing up, ${nameValue}!`;
    formMessage.className = "form-success";

    signupForm.reset();
  }
});
