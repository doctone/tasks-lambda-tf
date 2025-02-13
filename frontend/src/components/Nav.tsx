import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Home } from "react-feather";
import { Link } from "react-router";

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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <Link to="/">
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Home />
        </div>
      </Link>
    </nav>
  );
}
