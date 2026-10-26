import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboardWrapper">
      <aside className="sidebar">
        <nav>
          <Link href="/dashboard">Overview</Link>
          <Link href="/projects">All Projects</Link>
        </nav>
      </aside>
      <main className="dashboardContent">{children}</main>
    </div>
  );
}
