export default function ThemeToggleBtn({ themeState, themeStateSetter }) {
  return (
    <button
      onClick={() => {
        themeStateSetter(!themeState);
        document.querySelector("body").classList.toggle("dark-theme");
        localStorage.setItem("themeState", !themeState);
      }}
    >
      {themeState === true ? "light" : "dark"}
    </button>
  );
}
