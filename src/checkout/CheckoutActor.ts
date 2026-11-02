import { createActorContext } from '@xstate/react';
import { checkoutMachine } from './checkoutMachine';

export const CheckoutActor = createActorContext(checkoutMachine);
