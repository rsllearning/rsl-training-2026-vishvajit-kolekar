import { useEffect } from "react";
import { CheckoutActor } from "../checkout/CheckoutActor";
import { useCartStore } from "../store/cartStore";

export function OrderCompletionBridge() {
  const actor = CheckoutActor.useActorRef();

  useEffect(() => {
    const clearCartOnSuccess = (
      snapshot: ReturnType<typeof actor.getSnapshot>,
    ) => {
      if (snapshot.matches("success")) {
        useCartStore.getState().clear();
      }
    };

    clearCartOnSuccess(actor.getSnapshot());
    const subscription = actor.subscribe(clearCartOnSuccess);
    return () => subscription.unsubscribe();
  }, [actor]);

  return null;
}
