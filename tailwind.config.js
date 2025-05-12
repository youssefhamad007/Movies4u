/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",          // Your root HTML file
        "./src/**/*.{js,jsx}",   // All React components in src/
        "./src/**/**/*.css",     // Any CSS files in src/
    ],
    theme: {
      extend: {
        // Add custom colors/fonts here (optional)
        colors: {
          primary: "#6D64F7", // Example purple color
        },
      },
    },
    plugins: [
      require("@tailwindcss/forms"), // Optional: For form styling
    ],
    // Enable if you need dark mode
    darkMode: "class",
  }