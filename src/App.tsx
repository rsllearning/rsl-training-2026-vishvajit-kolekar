import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { ProductSidebar } from './components/ProductSidebar';

function App() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <ProductSidebar />
    </CartProvider>
  );
}

export default App;
