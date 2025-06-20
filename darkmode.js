
// // Function to apply the theme based on saved preference or default
// function applyTheme() {
//   const isDark = localStorage.getItem('theme') === 'dark';
//   if (isDark) {
//     document.body.classList.add('dark');
//     document.getElementById('firstchild').style.display = 'none'; // moon icon hidden
//     document.getElementById('secondchild').style.display = 'block'; // sun icon shown
//   } else {
//     document.body.classList.remove('dark');
//     document.getElementById('firstchild').style.display = 'block'; // moon icon shown
//     document.getElementById('secondchild').style.display = 'none'; // sun icon hidden
//   }
// }

// // On page load, apply the saved theme
// applyTheme();

// // Add click event listener to the toggle button
// document.getElementById("theme-toggle").addEventListener("click", function(e) {
//   e.preventDefault();

//   document.body.classList.toggle("dark");

//   // Update icons and save preference
//   if (document.body.classList.contains("dark")) {
//     document.getElementById('firstchild').style.display = 'none';
//     document.getElementById('secondchild').style.display = 'block';
//     localStorage.setItem('theme', 'dark');
//   } else {
//     document.getElementById('firstchild').style.display = 'block';
//     document.getElementById('secondchild').style.display = 'none';
//     localStorage.setItem('theme', 'light');
//   }
// });

   function applyTheme() {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark', isDark);

  // Icon switching logic (safely)
  const moonIcon = document.getElementById('firstchild');
  const sunIcon = document.getElementById('secondchild');

  if (moonIcon && sunIcon) {
    if (isDark) {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  }
}

// Run on page load
applyTheme();

// Add toggle button listener
const toggleButton = document.getElementById("theme-toggle");

if (toggleButton) {
  toggleButton.addEventListener("click", function (e) {
    e.preventDefault();

    const isDark = document.body.classList.toggle("dark");

    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Icon switching logic
    const moonIcon = document.getElementById('firstchild');
    const sunIcon = document.getElementById('secondchild');

    if (moonIcon && sunIcon) {
      moonIcon.style.display = isDark ? 'none' : 'block';
      sunIcon.style.display = isDark ? 'block' : 'none';
    }
  });
}

    
    
