import { CheckoutActor } from '../checkout/CheckoutActor';

export function CheckoutButton({ label = 'Checkout' }: { label?: string }) {
  const actor = CheckoutActor.useActorRef();
  const canSubmit = CheckoutActor.useSelector((snapshot) =>
    snapshot.can({ type: 'SUBMIT' }),
  );
  const isSubmitting = CheckoutActor.useSelector((snapshot) =>
    snapshot.matches('submitting'),
  );

  return (
    <button
      type="button"
      disabled={!canSubmit}
      onClick={() => actor.send({ type: 'SUBMIT' })}
    >
      {isSubmitting ? 'Processing...' : label}
    </button>
  );
}
