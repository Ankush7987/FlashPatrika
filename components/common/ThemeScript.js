// This component injects a script into the head to prevent theme flickering during SSR
const ThemeScript = () => {
  // This script runs before React hydration to set the correct theme class
  // It prevents the flash of incorrect theme during SSR
  const themeScript = `
    (function() {
      // Try to get the saved theme from localStorage
      function getStoredTheme() {
        try {
          return localStorage.getItem('theme') || 'light';
        } catch (err) {
          return 'light';
        }
      }

      // Try to get the preferred color scheme from the system
      function getPreferredTheme() {
        try {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch (err) {
          return 'light';
        }
      }

      // Get the theme from localStorage or system preference
      var theme = getStoredTheme() || getPreferredTheme();
      
      // Apply the theme class to the document
      document.documentElement.classList.remove('light-theme', 'dark-theme');
      document.documentElement.classList.add(theme + '-theme');
      
      // Set a data attribute for CSS targeting
      document.documentElement.setAttribute('data-theme', theme);
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      id="theme-script"
    />
  );
};

export default ThemeScript;