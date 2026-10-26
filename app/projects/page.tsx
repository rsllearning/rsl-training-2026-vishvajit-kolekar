import projects from "@/data/projects.json";
import ProjectSearch from "./ProjectSearch";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ search?: string; status?: string }> }) {
  const params = await searchParams;
  const searchQuery = params.search || "";
  const statusFilter = params.status || "";

  let filteredProjects = projects;

  if (searchQuery) {
    filteredProjects = filteredProjects.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (statusFilter) {
    filteredProjects = filteredProjects.filter((p) => p.status === statusFilter);
  }

  return (
    <div className="pageContainer">
      <h2 style={{ marginBottom: "16px" }}>Projects</h2>
      <ProjectSearch currentSearch={searchQuery} currentStatus={statusFilter} />
      <div className="projectList">
        {filteredProjects.length === 0 && <p>No projects found.</p>}
        {filteredProjects.map((project) => (
          <div key={project.id} className="projectCard">
            <div>
              <h3>
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
              <p>{project.description}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className={`statusBadge ${project.status === "active" ? "statusActive" : "statusCompleted"}`}>
                {project.status}
              </span>
              <FavoriteButton projectId={project.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
