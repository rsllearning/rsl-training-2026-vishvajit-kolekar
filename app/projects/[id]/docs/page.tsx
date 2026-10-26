import Link from "next/link";

export default async function DocsIndexPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="card">
      <h3>Project Documentation</h3>
      <p>Browse the documentation sections:</p>
      <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
        <li><Link href={`/projects/${id}/docs/setup`}>Setup Guide</Link></li>
        <li><Link href={`/projects/${id}/docs/setup/database`}>Database Setup</Link></li>
        <li><Link href={`/projects/${id}/docs/api`}>API Reference</Link></li>
        <li><Link href={`/projects/${id}/docs/deployment/production`}>Production Deployment</Link></li>
      </ul>
    </div>
  );
}
