"use client";

export default function ProjectError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="errorBox">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
