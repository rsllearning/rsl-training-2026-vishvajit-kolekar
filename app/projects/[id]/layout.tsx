import projects from "@/data/projects.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    notFound();
  }

  return (
    <div className="pageContainer">
      <div className="projectHeader">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
      </div>
      <div className="projectTabs">
        <Link href={`/projects/${id}`}>Overview</Link>
        <Link href={`/projects/${id}/team`}>Team</Link>
        <Link href={`/projects/${id}/tasks`}>Tasks</Link>
        <Link href={`/projects/${id}/activity`}>Activity</Link>
        <Link href={`/projects/${id}/docs`}>Docs</Link>
      </div>
      {children}
    </div>
  );
}
