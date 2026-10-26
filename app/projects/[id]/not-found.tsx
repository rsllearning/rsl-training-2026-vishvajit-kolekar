import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="notFoundBox">
      <h2>404</h2>
      <p>Project not found</p>
      <Link href="/projects">Back to Projects</Link>
    </div>
  );
}
