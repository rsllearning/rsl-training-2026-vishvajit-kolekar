import { useEffect } from 'react';
import { CheckoutActor } from '../checkout/CheckoutActor';
import { useCartStore } from '../store/cartStore';

export function CartSynchronizer() {
  const actor = CheckoutActor.useActorRef();

  useEffect(() => {
    actor.send({ type: 'CART_UPDATED', items: useCartStore.getState().items });
    return useCartStore.subscribe((state) => {
      actor.send({ type: 'CART_UPDATED', items: state.items });
    });
  }, [actor]);

  return null;
}
