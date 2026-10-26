import projects from "@/data/projects.json";

export default async function ActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  return (
    <div>
      <h3>Activity</h3>
      {project?.activity.map((item, index) => (
        <div key={index} className="activityItem">{item}</div>
      ))}
    </div>
  );
}
