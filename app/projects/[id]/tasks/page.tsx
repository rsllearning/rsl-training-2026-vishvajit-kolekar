import projects from "@/data/projects.json";

export default async function TasksPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  return (
    <div>
      <h3>Tasks</h3>
      {project?.tasks.map((task, index) => (
        <div key={index} className="taskItem">
          <span>{task.title}</span>
          <span className={`statusBadge ${task.status === "completed" ? "statusCompleted" : "statusActive"}`}>
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
}
