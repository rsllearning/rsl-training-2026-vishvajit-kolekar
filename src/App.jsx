import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserManagement from "./UserManagement.jsx";

function App() {
  const [exercise, setExercise] = useState(1);

  return (
    <main>
      <nav aria-label="Exercises">
        <button
          type="button"
          aria-pressed={exercise === 1}
          onClick={() => setExercise(1)}
        >
          Exercise 1: Products
        </button>
        <button
          type="button"
          aria-pressed={exercise === 2}
          onClick={() => setExercise(2)}
        >
          Exercise 2: Users
        </button>
      </nav>
      {exercise === 1 ? <ProductListing /> : <UserManagement />}
    </main>
  );
}

function ProductListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProducts, setShowProducts] = useState(true);
  const search = searchQuery.trim();

  return (
    <>
      <input
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button onClick={() => setShowProducts((visible) => !visible)}>
        {showProducts ? "Hide Products" : "Show Products"}
      </button>
      {showProducts && <ProductResults search={search} />}
    </>
  );
}

function ProductResults({ search }) {
  const { data, isPending, isFetching, isError, isSuccess, refetch } = useQuery(
    {
      queryKey: ["products", { search }],
      queryFn: async () => {
        const endpoint = search
          ? `https://dummyjson.com/products/search?q=${search}`
          : "https://dummyjson.com/products";
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      },
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  );

  return (
    <>
      <button onClick={() => refetch()} disabled={isFetching}>
        Refresh Products
      </button>
      {isFetching && !isPending && <p>Refreshing products..</p>}
      {isPending && <p>Loading products...</p>}
      {isError && <p role="alert">Error occurred while fetching products.</p>}
      <div>
        {isSuccess && (
          <>
            <h1>{search ? "Search Results" : "Products"}</h1>
            {data.products.map((product) => (
              <div key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
