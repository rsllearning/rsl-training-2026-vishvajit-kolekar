import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pageContainer">
      <div className="notFoundBox">
        <h2>404</h2>
        <p>Page not found</p>
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
}
