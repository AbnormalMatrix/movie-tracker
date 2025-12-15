import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 z-50">
      <div className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-center">
        <div className="flex space-x-6">
          <Link
            href="/home-screen"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Home
          </Link>

          <Link
            href="/popular"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Popular
          </Link>

          <Link
            href="/watchlist"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Watchlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
