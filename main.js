
  /* --- THEME TOGGLE LOGIC --- */
  const toggleBtn = document.getElementById('toggleModeBtn');
  const htmlEl = document.documentElement;

  // Check if the toggle button exists on the page
  if (toggleBtn) {
    const iconEl = toggleBtn.querySelector('i');

    function getPreferredMode() {
      if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyMode(mode) {
      if (mode === 'dark') {
        htmlEl.classList.add('dark');
        iconEl.classList.remove('fa-sun');
        iconEl.classList.add('fa-moon');
      } else {
        htmlEl.classList.remove('dark');
        iconEl.classList.remove('fa-moon');
        iconEl.classList.add('fa-sun');
      }
      localStorage.setItem('theme', mode);
    }

    toggleBtn.addEventListener('click', () => {
      const newMode = htmlEl.classList.contains('dark') ? 'light' : 'dark';
      applyMode(newMode);
    });

    // Set initial theme on load
    applyMode(getPreferredMode());
  }


  /* --- PAGE TRANSITION LOGIC --- */
  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a.nav-link');

    navLinks.forEach(link => {
      // Check if the link is internal and not the currently active page
      if (link.hostname === window.location.hostname && !link.classList.contains('active')) {
        link.addEventListener('click', e => {
          e.preventDefault(); // Stop the browser from navigating instantly
          const destination = link.href;

          // Add the fade-out class to the body
          document.body.classList.add('fade-out');

          // Wait for the animation to finish, then navigate
          setTimeout(() => {
            window.location.href = destination;
          }, 500); // This duration must match the CSS animation time
        });
      }
    });
  });

   // Your Firebase config here 👇 — REPLACE with your real config from Firebase Console!
    const firebaseConfig = {
  apiKey: "AIzaSyDUgOMvUhKWtQm1RCEOiuvrciojltpz6Ns",
  authDomain: "myportfolio-ba654.firebaseapp.com",
  projectId: "myportfolio-ba654",
  storageBucket: "myportfolio-ba654.firebasestorage.app",
  messagingSenderId: "338685481799",
  appId: "1:338685481799:web:69ad116d2be95567a17262"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Track visit
function trackVisit() {
  const visitData = {
    timestamp: new Date(),
    page: window.location.pathname,
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent,
    screen: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language
  };

  db.collection("site_visits").add(visitData)
    .then(() => {
      console.log("Visit tracked!", visitData);
    })
    .catch((error) => {
      console.error("Error tracking visit: ", error);
    });
}

// Run tracking on page load
trackVisit();
