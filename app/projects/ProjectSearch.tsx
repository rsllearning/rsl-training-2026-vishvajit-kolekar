"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectSearch({ currentSearch, currentStatus }: { currentSearch: string; currentStatus: string }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(currentSearch);
  const [statusValue, setStatusValue] = useState(currentStatus);

  function handleSearch() {
    const params = new URLSearchParams();
    if (searchText) params.set("search", searchText);
    if (statusValue) params.set("status", statusValue);
    router.push(`/projects?${params.toString()}`);
  }

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search projects..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <select value={statusValue} onChange={(e) => setStatusValue(e.target.value)}>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={handleSearch} style={{ padding: "8px 16px", background: "#1a1a2e", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Search</button>
    </div>
  );
}
