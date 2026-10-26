import projects from "@/data/projects.json";

async function getProjectData(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const project = projects.find((p) => p.id === Number(id));
  if (!project) throw new Error("Project not found");
  return project;
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectData(id);

  return (
    <div className="card">
      <h3>Project Overview</h3>
      <p><strong>Status:</strong> {project.status}</p>
      <p><strong>Team Size:</strong> {project.team.length} members</p>
      <p><strong>Total Tasks:</strong> {project.tasks.length}</p>
    </div>
  );
}
