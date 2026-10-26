async function fetchRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return [
    "Ranvir pushed code to NextJs Dashboard",
    "Vikram updated analytics API",
    "Nisha created initial wireframes",
  ];
}

export default async function RecentActivity() {
  const activities = await fetchRecentActivity();

  return (
    <div className="streamingCard">
      <h3>Recent Activity</h3>
      {activities.map((item, index) => (
        <div key={index} className="activityItem" style={{ marginTop: "8px" }}>
          {item}
        </div>
      ))}
    </div>
  );
}
