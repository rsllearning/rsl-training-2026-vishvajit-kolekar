async function fetchProjectStats() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { totalProjects: 5, activeProjects: 3, completedProjects: 2, totalTasks: 16 };
}

export default async function ProjectStats() {
  const stats = await fetchProjectStats();

  return (
    <div className="streamingCard">
      <h3>Project Statistics</h3>
      <p style={{ marginTop: "8px" }}>Total Projects: {stats.totalProjects}</p>
      <p>Active: {stats.activeProjects}</p>
      <p>Completed: {stats.completedProjects}</p>
      <p>Total Tasks: {stats.totalTasks}</p>
    </div>
  );
}
