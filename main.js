//header

const barsIcon = document.querySelector(".landing .header-area i.bars");
const headerArea = document.querySelector(".landing .header-area");
const headerMenu = document.querySelector(".landing .header-area ul");

barsIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  headerArea.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (
    !headerArea.contains(event.target) &&
    headerArea.classList.contains("active")
  ) {
    headerArea.classList.remove("active");
  }
});

headerMenu.addEventListener("click", (event) => {
  event.stopPropagation();
});

//header

// landing
let backgrounds = document.querySelector(".backgrounds"),
  bgBut = document.querySelectorAll(".backgrounds button");

let landing = document.querySelector(".landing");
let images = [
  "/imgs/01.jpg",
  "/imgs/02.jpg",
  "/imgs/03.jpg",
  "/imgs/04.jpg",
  "/imgs/05.jpg",
  "/imgs/06.jpg",
  "/imgs/07.jpg",
  "/imgs/08.jpg",
];
let currentIndex = 0;
let intervalId; // To hold the interval reference

// Function to start changing the background
function startChangingBackground() {
  intervalId = setInterval(() => {
    landing.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
  }, 5000);
}

// Function to stop changing the background
function stopChangingBackground() {
  clearInterval(intervalId);
}

// Function to handle active class switching
function toggleActiveClass(buttons, clickedButton) {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  clickedButton.classList.add("active");
}

// Save the active state ("yes" or "no") to localStorage
function saveBgStateToLocalStorage(state) {
  localStorage.setItem("backgroundChange", state);
}

// Load the saved state from localStorage
function loadBgStateFromLocalStorage() {
  return localStorage.getItem("backgroundChange");
}

// Event listener for "Yes" button (starts background change)
bgBut[0].addEventListener("click", () => {
  toggleActiveClass(bgBut, bgBut[0]); // Make "Yes" active
  startChangingBackground(); // Start background change
  saveBgStateToLocalStorage("yes"); // Save "yes" state to localStorage
});

// Event listener for "No" button (stops background change)
bgBut[1].addEventListener("click", () => {
  toggleActiveClass(bgBut, bgBut[1]); // Make "No" active
  stopChangingBackground(); // Stop background change
  saveBgStateToLocalStorage("no"); // Save "no" state to localStorage
});

// Load saved state from localStorage when page loads
window.onload = function () {
  let savedState = loadBgStateFromLocalStorage();
  landing.style.backgroundImage = `url(${images[0]})`; // Set initial background

  if (savedState === "yes") {
    toggleActiveClass(bgBut, bgBut[0]); // Set "Yes" as active
    startChangingBackground(); // Start background change
  } else if (savedState === "no") {
    toggleActiveClass(bgBut, bgBut[1]); // Set "No" as active
    stopChangingBackground(); // Stop background change
  } else {
    // If no state is saved, default to "yes"
    toggleActiveClass(bgBut, bgBut[0]);
    startChangingBackground();
  }

  // Load bullets state
  let savedBulsState = loadBulsStateFromLocalStorage();
  if (savedBulsState) {
    toggleBulletsVisibility(savedBulsState); // Apply saved bullets visibility
    toggleActiveClass(
      bulsButt,
      savedBulsState === "yes" ? bulsButt[0] : bulsButt[1]
    ); // Set active button
  } else {
    // Default state: show bullets and set "Yes" as active
    toggleBulletsVisibility("yes");
    toggleActiveClass(bulsButt, bulsButt[0]);
  }
};

// Navigation buttons for bullets
let navBuls = document.querySelector(".nav-buls"),
  bulsButt = document.querySelectorAll(".settings .bullets button");

// Function to show/hide bullets based on user choice
function toggleBulletsVisibility(state) {
  navBuls.style.display = state === "yes" ? "flex" : "none"; // Show or hide bullets
}

// Save the bullets state (show/hide) to localStorage
function saveBulsStateToLocalStorage(state) {
  localStorage.setItem("showBuls", state);
}

// Load the saved bullets state from localStorage
function loadBulsStateFromLocalStorage() {
  return localStorage.getItem("showBuls");
}

// Event listener for "Yes" button (show bullets)
bulsButt[0].addEventListener("click", () => {
  toggleActiveClass(bulsButt, bulsButt[0]); // Make "Yes" button active
  toggleBulletsVisibility("yes"); // Show bullets
  saveBulsStateToLocalStorage("yes"); // Save "yes" state to localStorage
});

// Event listener for "No" button (hide bullets)
bulsButt[1].addEventListener("click", () => {
  toggleActiveClass(bulsButt, bulsButt[1]); // Make "No" button active
  toggleBulletsVisibility("no"); // Hide bullets
  saveBulsStateToLocalStorage("no"); // Save "no" state to localStorage
});

// sttings

const gear = document.querySelector(".gear");
const settingsPanel = document.querySelector(".settings");

gear.addEventListener("click", () => {
  settingsPanel.classList.toggle("open");
  gear.classList.toggle("open");
});

const colorSpans = document.querySelectorAll(".landing .settings .colors span");
const colors = [
  "#FF9800",
  "rgb(233, 30, 99)",
  "rgb(0, 150, 136)",
  "rgb(3, 169, 244)",
  "rgb(76, 175, 80)",
];

colorSpans.forEach((span, index) => {
  if (colors[index]) {
    span.style.backgroundColor = colors[index];
    span.addEventListener("click", () => {
      let varColor = document.documentElement.style.setProperty(
        "--main-color",
        colors[index]
      );
      localStorage.setItem("mainColor", colors[index]);
    });
  }
});

if (localStorage.getItem("mainColor")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("mainColor")
  );
}

// sttings

// landing

// gallery

let gallery = document.querySelector(".gallery"),
  galleryImages = document.querySelectorAll(".box .image");

galleryImages.forEach((img) => {
  img.onclick = function () {
    let overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
        z-index: 999; /* Set behind the popup but above other content */
      `;

    // Create the popup div
    let div = document.createElement("div");
    div.style.cssText = `
        background-color: white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        border-radius: 10px;
        padding: 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000; /* Popup on top of the overlay */
        text-align: center;
      `;

    // Create the image element for the clicked image
    let popupImg = document.createElement("img");
    popupImg.src = img.firstChild.src;
    popupImg.style.cssText = `
        max-width: 100%;
        max-height: 400px;
        border-radius: 8px;
        display: block;
        margin-bottom: 10px;
      `;

    // Create the close button
    let closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.style.cssText = `
        position: absolute;
        top: -16px;
        right: -16px;
        height: 32px;
        width: 32px;
        background: var(--main-color);
        color: white;
        border-radius: 50%;
        align-content: center;
        text-align: center;
        font-size: 24px;
        cursor: pointer;
        font-weight: bold;
      `;

    // Append the image and close button to the popup div
    div.appendChild(popupImg);
    div.appendChild(closeButton);

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Append the popup div to the body
    document.body.appendChild(div);

    // Close the popup and remove the overlay when the close button is clicked
    closeButton.onclick = function () {
      document.body.removeChild(div);
      document.body.removeChild(overlay); // Remove the overlay as well
    };

    // Also close the popup if the overlay is clicked
    overlay.onclick = function () {
      document.body.removeChild(div);
      document.body.removeChild(overlay); // Remove the overlay when it's clicked
    };
  };
});

// gallery
