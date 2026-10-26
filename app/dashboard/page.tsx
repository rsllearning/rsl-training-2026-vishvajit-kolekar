import { Suspense } from "react";
import RecentActivity from "./RecentActivity";
import ProjectStats from "./ProjectStats";

export default function DashboardPage() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Welcome to project management dashboard.
      </p>
      <div className="dashboardGrid">
        <Suspense
          fallback={
            <div className="streamingCard">
              <div className="skeleton skeletonTitle"></div>
              <div className="skeleton skeletonText"></div>
              <div className="skeleton skeletonText"></div>
            </div>
          }
        >
          <ProjectStats />
        </Suspense>
        <Suspense
          fallback={
            <div className="streamingCard">
              <div className="skeleton skeletonTitle"></div>
              <div className="skeleton skeletonText"></div>
              <div className="skeleton skeletonText"></div>
            </div>
          }
        >
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  );
}
