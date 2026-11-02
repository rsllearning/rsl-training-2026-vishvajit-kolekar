import { CheckoutActor } from '../checkout/CheckoutActor';

export function CartErrorBanner() {
  const error = CheckoutActor.useSelector((snapshot) => snapshot.context.error);

  if (!error) return null;

  return (
    <p role="alert">
      {error}
    </p>
  );
}
