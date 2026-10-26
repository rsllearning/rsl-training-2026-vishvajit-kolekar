export default async function DocsPage({ params }: { params: Promise<{ id: string; slug: string[] }> }) {
  const { id, slug } = await params;
  const fullPath = `/projects/${id}/docs/${slug.join("/")}`;

  return (
    <div className="card">
      <h3>Documentation</h3>
      <div className="breadcrumb">
        {slug.map((segment, index) => (
          <span key={index}>
            {index > 0 && " / "}
            {segment}
          </span>
        ))}
      </div>
      <div className="docsPath">
        <strong>Path:</strong> {fullPath}
      </div>
      <p>Documentation content for: {slug.join(" > ")}</p>
    </div>
  );
}
