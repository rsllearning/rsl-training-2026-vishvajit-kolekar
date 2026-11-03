const links = ['Dashboard', 'Products', 'Orders']

export default function Sidebar() {
  return (
    <aside className="flex items-center justify-between gap-4 border-b border-gray-300 bg-white px-5 py-4 md:min-h-screen md:w-56 md:flex-col md:items-stretch md:justify-start">
      <a href="#" className="text-lg font-bold text-primary">My Store</a>
      <nav aria-label="Main navigation" className="flex gap-2 overflow-x-auto md:mt-8 md:flex-col">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            aria-current={link === 'Products' ? 'page' : undefined}
            className={`rounded-card px-3 py-2 text-sm hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
              link === 'Products' ? 'bg-canvas font-semibold text-primary' : 'text-ink'
            }`}
          >
            {link}
          </a>
        ))}
      </nav>
    </aside>
  )
}
