import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { ProductSidebar } from "./components/ProductSidebar";
import { PaymentPanel } from "./components/PaymentPanel";
import { CartSynchronizer } from "./components/CartSynchronizer";
import { OrderCompletionBridge } from "./components/OrderCompletionBridge";
import { CheckoutActor } from "./checkout/CheckoutActor";

function App() {
  return (
    <CheckoutActor.Provider>
      <CartSynchronizer />
      <OrderCompletionBridge />
      <Header />
      <main>
        <ProductList />
        <ProductSidebar />
        <PaymentPanel />
      </main>
    </CheckoutActor.Provider>
  );
}

export default App;
