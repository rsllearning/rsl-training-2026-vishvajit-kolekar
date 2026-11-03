export default function ProductCard({ product }) {
  const unavailable = product.status === 'Out of stock'
  const statusColor = unavailable
    ? 'text-red-700'
    : product.status === 'Low stock'
      ? 'text-orange-700'
      : 'text-green-700'

  return (
    <article className="overflow-hidden rounded-card border border-gray-300 bg-white">
      <img
        src={product.image}
        alt={product.imageAlt}
        className="h-64 w-full bg-gray-100 object-contain p-2"
      />
      <div className="p-card">
        <p className="text-sm text-muted">{product.category}</p>
        <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>
        <p className="mt-3 font-semibold">{product.price}</p>
        <p className={`mt-1 text-sm ${statusColor}`}>{product.status}</p>
        <button
          type="button"
          disabled={unavailable}
          className="mt-4 rounded-card bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Edit
        </button>
      </div>
    </article>
  )
}
