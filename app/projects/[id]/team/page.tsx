import projects from "@/data/projects.json";

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  return (
    <div>
      <h3>Team Members</h3>
      <ul className="teamList">
        {project?.team.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  );
}
