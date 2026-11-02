import { CheckoutActor } from "../checkout/CheckoutActor";
import { CartErrorBanner } from "./CartErrorBanner";
import { CheckoutButton } from "./CheckoutButton";

export function PaymentPanel() {
  const actor = CheckoutActor.useActorRef();
  const stage = CheckoutActor.useSelector((snapshot) => {
    if (snapshot.matches("submitting")) return "submitting";
    if (snapshot.matches("success")) return "success";
    return "reviewing";
  });
  const orderId = CheckoutActor.useSelector(
    (snapshot) => snapshot.context.result?.orderId,
  );

  return (
    <section>
      <h2 id="payment-title">Payment</h2>
      <p>
        {stage === "submitting" && "Payment is being processed..."}
        {(stage === "success" || orderId) &&
          `Order ${orderId} placed successfully.`}
        {stage === "reviewing" &&
          !orderId &&
          "Review your cart before submitting payment."}
      </p>
      <CartErrorBanner />
      <div>
        <CheckoutButton label="Submit Payment" />
        {stage === "submitting" && (
          <button type="button" onClick={() => actor.send({ type: "CANCEL" })}>
            Cancel
          </button>
        )}
      </div>
    </section>
  );
}
