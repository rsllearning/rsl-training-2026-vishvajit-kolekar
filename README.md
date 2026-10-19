# Mini E-Commerce Application

A React 19 and Vite app built for the two assignment tasks. It has registration, a searchable product collection, a product details view, optimistic basket updates, and responsive layouts.

## Run the application

1. Install the dependencies:

```sh
npm install
```

2. Start the dev server:

```sh
npm run dev
```

Run `npm run build` to create the production build.

## React 19 features

### Product data, `use()`, and Suspense

The product data is a Promise that resolves after a short delay. `ProductCatalog` reads it using `use(productPromise)` and is rendered inside `<Suspense>`. While the Promise is pending, a skeleton collection is shown. If the Promise is rejected, an Error Boundary catches it and shows a recovery message.

### Form actions and validation

The registration `<form>` uses `action={formAction}` from `useActionState()` instead of an `onSubmit` handler. The action validates the submitted `FormData`, waits to simulate a server request, and then updates the registered user in Context. The form shows validation feedback, success feedback, and the pending state.

`SubmitButton` uses `useFormStatus()` and is rendered inside the form. It reads the pending state of the form to disable the button and change its label while the registration is in progress.

### Context

`UserContext` holds the registered user's name and email, along with the state update function. The root renders `<UserContext value={contextValue}>`, which is the React 19 provider shorthand. The registration form writes the user, and a separate `RegisteredUser` component reads and displays it.

### Asset loading APIs

The app calls `preconnect()` for the image host of the first product, so the browser can open the connection early. It also calls `preload()` for the first product image, since it appears at the start of the collection. The product cards use browser lazy loading for the remaining images. Prices are shown in Indian rupees.

### Document metadata

`<title>` and `<meta name="description">` are rendered inside the React tree. React 19 hoists these elements into the document head.

### Product details and optimistic basket

Selecting a product opens its detail view. The Add to Basket action uses `useOptimistic()` to increase the visible quantity immediately, and then simulates an async request. Every third request fails on purpose to test the rollback path. A failed request doesn't update the actual basket count and shows an error message.

### Ref as a prop and callback ref cleanup

`SearchInput` accepts `ref` directly as a prop and attaches it to the search field. The search control next to it focuses that input. The product detail section uses a callback ref to attach a `ResizeObserver`. The callback returns a cleanup function that disconnects the observer when the element or ref is removed.

### Server and Client Components

This Vite app is fully client rendered. In a framework that supports React Server Components, the product catalog and the product detail data view can be Server Components. They can fetch and render the product data without sending the data-fetching code to the browser. The Add to Basket control has to stay a Client Component, because it handles clicks and uses `useOptimistic()` and client state. A Server Component can pass serializable product data to this Client Component, and the control can then send the mutation to a server action or API and update the basket optimistically.

### React Compiler

React Compiler analyzes the component code and automatically memoizes values, calculations, and callbacks where it can avoid unnecessary work. If enabled in a supported build, it can optimize the product filtering and rendering when the search text changes, and keep the callbacks passed from the catalog to the product cards stable. For example, the `visibleProducts` filtering in `ProductCatalog` can be memoized by the compiler without adding `useMemo` manually.

## Assignment screenshots

Capture these states from the running app for submission:

- Initial loading skeleton
- Registration validation error
- Pending registration
- Successful registration with the user information
- Selected product details
- Optimistic basket update while it shows "Adding to basket…"
- Successful basket update
- Every-third-request failure with the basket count unchanged
