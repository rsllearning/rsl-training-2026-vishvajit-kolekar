"use client";

import { useState } from "react";

export default function FavoriteButton({ projectId }: { projectId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      className="favoriteBtn"
      onClick={() => setIsFavorite(!isFavorite)}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
