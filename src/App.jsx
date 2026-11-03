import Sidebar from './components/Sidebar.jsx'
import ProductCard from './components/ProductCard.jsx'
import { products } from './data/products.js'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas font-sans text-ink md:flex">
      <Sidebar />
      <main className="min-w-0 flex-1 p-5 sm:p-8">
        <header className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <button
              type="button"
              className="rounded-card bg-primary px-4 py-2 text-white hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Add product
            </button>
          </div>
          <section aria-label="Products" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </header>
      </main>
    </div>
  )
}
