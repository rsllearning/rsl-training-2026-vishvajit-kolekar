import { assign, fromPromise, setup } from 'xstate';
import type { CartItem, CheckoutResult } from '../types';

type CheckoutContext = {
  items: CartItem[];
  error: string | null;
  result: CheckoutResult | null;
};

type CheckoutEvent =
  | { type: 'CART_UPDATED'; items: CartItem[] }
  | { type: 'SUBMIT' }
  | { type: 'CANCEL' };

const submitOrder = fromPromise<CheckoutResult, { items: CartItem[] }>(
  async ({ input, signal }) => {
    const totalPrice = input.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: input.items, totalPrice }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Checkout failed: ${response.status}`);
    }

    const order: unknown = await response.json();
    if (
      typeof order !== 'object' ||
      order === null ||
      !('id' in order) ||
      (typeof order.id !== 'string' && typeof order.id !== 'number')
    ) {
      throw new Error('Checkout response did not include an order id');
    }

    return { orderId: String(order.id) };
  },
);

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Checkout failed unexpectedly';
}

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    events: {} as CheckoutEvent,
  },
  actors: { submitOrder },
  guards: {
    hasItems: ({ context }) => context.items.length > 0,
  },
  actions: {
    updateCart: assign(({ context, event }) =>
      event.type === 'CART_UPDATED'
        ? {
            items: event.items,
            error: null,
            result: event.items.length > 0 ? null : context.result,
          }
        : {},
    ),
    clearError: assign({ error: null, result: null }),
  },
}).createMachine({
  id: 'checkout',
  initial: 'reviewing',
  context: {
    items: [],
    error: null,
    result: null,
  },
  states: {
    reviewing: {
      on: {
        CART_UPDATED: { actions: 'updateCart' },
        SUBMIT: {
          guard: 'hasItems',
          target: 'submitting',
          actions: 'clearError',
        },
      },
    },
    submitting: {
      invoke: {
        src: 'submitOrder',
        input: ({ context }) => ({ items: context.items }),
        onDone: {
          target: 'success',
          actions: assign(({ event }) => ({
            result: event.output,
            error: null,
          })),
        },
        onError: {
          target: 'reviewing',
          actions: assign(({ event }) => ({
            error: getErrorMessage(event.error),
          })),
        },
      },
      on: {
        CANCEL: { target: 'reviewing', actions: 'clearError' },
        CART_UPDATED: {
          target: 'reviewing',
          actions: 'updateCart',
        },
      },
    },
    success: {
      on: {
        CART_UPDATED: {
          target: 'reviewing',
          actions: 'updateCart',
        },
      },
    },
  },
});
