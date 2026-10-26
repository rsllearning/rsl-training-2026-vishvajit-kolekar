import Link from "next/link";

export default function HomePage() {
  return (
    <div className="pageContainer">
      <div className="card">
        <h2>Welcome to Project Explorer</h2>
        <p>Lightweight project management portal.</p>
      </div>
      <div className="card">
        <h3>Quick Links</h3>
        <p>
          <Link href="/projects">Browse Projects</Link> |{" "}
          <Link href="/dashboard">View Dashboard</Link>
        </p>
      </div>
    </div>
  );
}
