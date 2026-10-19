import React, {
  Component,
  Suspense,
  createContext,
  use,
  useActionState,
  useCallback,
  useContext,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { preconnect, preload, useFormStatus } from "react-dom";

const imageHost = "https://encrypted-tbn3.gstatic.com";
const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;
const productData = [
  {
    id: 1,
    name: "Headphones",
    category: "Audio",
    price: 10499,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQHshPCiCUORoPIiU9tMu-YWKGKJmraGqJAEcf9Q1CBufA2-R2LQbF3065k9NAIWl7YUyYTu3YYLxqXzXEN3VwC5FvJrjmUGzY1gfeFOCFnCG2csNQpoBGa",
    description:
      "On-ear design, 40mm drivers, Bluetooth, 3.5mm AUX, MicroSD card slot, built-in FM tuner, and up to 60 hours of playback.",
  },
  {
    id: 2,
    name: "Table Lamp",
    category: "Lighting",
    price: 2499,
    image:
      "https://www.ikea.com/in/en/images/products/naevlinge-led-work-lamp-black__0709827_pe727109_s5.jpg?f=xl",
    description:
      "AJ HUB Study LED Touch On/Off Switch Student Study Table Lamps117 Table Lamp (9.5 cm, White)",
  },
  {
    id: 3,
    name: "Office Backpack",
    category: "Bags",
    price: 1799,
    image:
      "https://rukminim2.flixcart.com/image/1920/1920/xif0q/backpack/i/o/o/-watermarked-original-imahfskcymxtzved.jpeg?q=90",
    description:
      "Arctic Fox Medium 23 L Laptop Backpack Slope Anti-Theft Marble (Black)",
  },
  {
    id: 4,
    name: "Baseball Shoes",
    category: "Footwear",
    price: 5999,
    image:
      "https://rukminim2.flixcart.com/image/1920/1920/xif0q/shoe/a/f/5/8-ih1104-300-8-nike-fir-original-imahrz4kwzzpvwxq.jpeg?q=90",
    description: "NIKE Precision 8 Low Basketball Shoes For Men (Green , 8)",
  },
];

const productPromise = new Promise((resolve) => {
  window.setTimeout(() => resolve(productData), 950);
});

const UserContext = createContext(null);

function RegistrationForm() {
  const { setRegisteredUser } = useContext(UserContext);
  const [formState, formAction] = useActionState(
    async (_previousState, formData) => {
      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      await new Promise((resolve) => window.setTimeout(resolve, 1000));
      setRegisteredUser({ name, email });
      return { success: `You are all set, ${name.split(" ")[0]}.` };
    },
    { error: "", success: "" },
  );

  return (
    <section>
      <div className="welcomeCopy">
        <p>Mini E-Commerce Store</p>
        <h1>
          Shop everyday
          <br />
          <span>essentials.</span>
        </h1>
        <p className="welcomeText">
          Register to browse products and add items to your basket.
        </p>
      </div>
      <div className="registrationPanel">
        <h2>Create your account</h2>
        <form action={formAction} className="registrationForm">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Virat Kohli"
            required
            minLength={2}
          />
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="virat@example.com"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            required
            minLength={8}
          />
          {formState.error && (
            <p className="formMessage errorMessage" role="alert">
              {formState.error}
            </p>
          )}
          {formState.success && (
            <p className="formMessage successMessage" role="status">
              {formState.success}
            </p>
          )}
          <SubmitButton />
        </form>
      </div>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="primaryButton submitButton"
      type="submit"
      disabled={pending}
    >
      {pending ? "Creating account…" : "Create account"}
      <span>↗</span>
    </button>
  );
}

function RegisteredUser() {
  const { registeredUser } = useContext(UserContext);
  if (!registeredUser) return null;

  return (
    <aside className="userWelcome">
      <span className="userInitial">
        {registeredUser.name.charAt(0).toUpperCase()}
      </span>
      <div>
        <p className="eyebrow">ACCOUNT READY</p>
        <strong>{registeredUser.name}</strong>
        <span>{registeredUser.email}</span>
      </div>
      <span className="verifiedMark">✓</span>
    </aside>
  );
}

function SearchInput({ ref, value, onChange, onFocusSearch }) {
  return (
    <div className="searchGroup">
      <label className="srOnly" htmlFor="productSearch">
        Search products
      </label>
      <input
        id="productSearch"
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder="Search the collection"
        type="search"
      />
      <button
        className="searchFocusButton"
        type="button"
        onClick={onFocusSearch}
        title="Focus search"
      >
        ⌕
      </button>
    </div>
  );
}

function ProductCatalog({ registeredUser, selectedProduct, onSelectProduct }) {
  const products = use(productPromise);
  const searchInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  return (
    <section className="catalogSection">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2 id="catalogTitle">Objects for living</h2>
        </div>
        <div className="catalogTools">
          <span className="resultCount">{visibleProducts.length} pieces</span>
          <SearchInput
            ref={searchInputRef}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onFocusSearch={() => searchInputRef.current?.focus()}
          />
        </div>
      </div>
      {!registeredUser && (
        <p className="gateNotice">
          Create an account above to open product details and add items to your
          basket.
        </p>
      )}
      <div className="productGrid">
        {visibleProducts.map((product, index) => (
          <button
            className={`productCard${selectedProduct?.id === product.id ? " selectedProduct" : ""}`}
            type="button"
            key={product.id}
            onClick={() => onSelectProduct(product)}
            disabled={!registeredUser}
          >
            <span className="productImageWrap">
              <img
                src={product.image}
                alt={product.name}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <span className="cardArrow">↗</span>
            </span>
            <span className="productMeta">
              <span className="productCategory">{product.category}</span>
              <span className="productPrice">{formatPrice(product.price)}</span>
            </span>
            <span className="productName">{product.name}</span>
            <span className="productDescription">{product.description}</span>
          </button>
        ))}
        {visibleProducts.length === 0 && (
          <p className="emptySearch">No pieces match that search.</p>
        )}
      </div>
    </section>
  );
}

function ProductDetails({ product, cartCount, setCartCount }) {
  const [optimisticCartCount, setOptimisticCartCount] =
    useOptimistic(cartCount);
  const [isPending, startRequest] = useTransition();
  const [requestMessage, setRequestMessage] = useState("");
  const requestCountRef = useRef(0);

  const detailsRef = useCallback((node) => {
    if (!node || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver((entries) => {
      node.classList.toggle(
        "compactDetails",
        entries[0].contentRect.width < 600,
      );
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function addToCart() {
    setRequestMessage("");
    startRequest(async () => {
      setOptimisticCartCount((count) => count + 1);
      requestCountRef.current += 1;
      const shouldFail = requestCountRef.current % 3 === 0;
      await new Promise((resolve) => window.setTimeout(resolve, 1200));
      if (shouldFail) {
        setRequestMessage(
          "That add did not go through. Your basket is unchanged. Try again.",
        );
        return;
      }
      setCartCount((count) => count + 1);
      setRequestMessage(`${product.name} added to your basket.`);
    });
  }

  return (
    <section className="detailSection" ref={detailsRef}>
      <div className="detailImage">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="detailCopy">
        <p className="eyebrow">{product.category} / DETAIL</p>
        <h2 id="detailTitle">{product.name}</h2>
        <p className="detailPrice">{formatPrice(product.price)}</p>
        <p className="detailDescription">{product.description}</p>
        <div className="detailRule" />
        <div className="stockLine">
          <span className="stockDot" /> In stock and ready to ship
        </div>
        <button
          className="primaryButton addButton"
          type="button"
          onClick={addToCart}
          disabled={isPending}
        >
          <span>{isPending ? "Adding to basket…" : "Add to basket"}</span>
          <span>{isPending ? "···" : "↗"}</span>
        </button>
        <div className="optimisticLine" aria-live="polite">
          <span>Basket quantity</span>
          <strong>{optimisticCartCount}</strong>
          {isPending && <span className="pendingPill">Syncing</span>}
        </div>
        {requestMessage && (
          <p
            className={`cartMessage${requestMessage.startsWith("That") ? " errorMessage" : " successMessage"}`}
            role="status"
          >
            {requestMessage}
          </p>
        )}
      </div>
    </section>
  );
}

function ProductArea({
  registeredUser,
  selectedProduct,
  onSelectProduct,
  cartCount,
  setCartCount,
}) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<ProductLoading />}>
        <ProductCatalog
          registeredUser={registeredUser}
          selectedProduct={selectedProduct}
          onSelectProduct={onSelectProduct}
        />
        {selectedProduct && registeredUser && (
          <ProductDetails
            key={selectedProduct.id}
            product={selectedProduct}
            cartCount={cartCount}
            setCartCount={setCartCount}
          />
        )}
      </Suspense>
    </ErrorBoundary>
  );
}

function ProductLoading() {
  return (
    <section className="catalogSection loadingSection">
      <div className="sectionHeading">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2>Objects for living</h2>
        </div>
        <span className="loadingLabel">
          <span className="loadingDot" /> LOADING PIECES
        </span>
      </div>
      <div className="productGrid">
        {[1, 2, 3, 4].map((item) => (
          <div className="skeletonCard" key={item}>
            <div className="skeletonImage" />
            <div className="skeletonLine" />
            <div className="skeletonLine shortLine" />
          </div>
        ))}
      </div>
    </section>
  );
}

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="errorPanel" role="alert">
          <p className="eyebrow">A SMALL INTERRUPTION</p>
          <h2>The collection could not load.</h2>
          <p>Please refresh and try again.</p>
        </section>
      );
    }
    return this.props.children;
  }
}

function App() {
  preconnect(imageHost, { crossOrigin: "anonymous" });
  preload(productData[0].image, { as: "image", fetchPriority: "high" });
  const [registeredUser, setRegisteredUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const contextValue = { registeredUser, setRegisteredUser };

  return (
    <UserContext value={contextValue}>
      <title>Mini E-Commerce Store | Products</title>
      <meta
        name="description"
        content="Explore a considered collection of useful objects for everyday rituals."
      />
      <div className="appShell">
        <header className="siteHeader">
          <a className="wordmark" href="#top">
            MINI STORE
          </a>
          <div className="cartCounter">
            <span>Basket</span>
            <strong>{cartCount}</strong>
          </div>
        </header>
        <main id="top">
          <section>
            <RegisteredUser />
            <RegistrationForm />
          </section>
          <ProductArea
            registeredUser={registeredUser}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            cartCount={cartCount}
            setCartCount={setCartCount}
          />
        </main>
      </div>
    </UserContext>
  );
}

export default App;
