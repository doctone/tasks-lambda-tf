export function Nav() {
  return (
    <nav className="flex items-center justify-between dark:bg-gray-800 p-4">
      <div className="flex items-center">
        <button
          id="hamburger"
          className="text-white focus:outline-none md:hidden"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <h1 className="text-white text-xl font-semibold">My Tasks</h1>
    </nav>
  );
}
