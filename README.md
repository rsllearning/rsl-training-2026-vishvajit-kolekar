# Modern Front-End Security – Vulnerable Starter Project

## Overview

This project is a deliberately vulnerable User Security Dashboard
created for the Modern Front-End Security Concepts training assignment.

## Technologies

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express

## Setup

Install dependencies:

```bash
npm install
```

Start the application::

```bash
npm start
```

Run checks with `npm test`.

## Security fixes

- **DOM XSS:** URL input was inserted with `innerHTML`. It is now displayed as text using `textContent`.
- **Prototype pollution:** The server now accepts only known settings keys.
- **Token leakage:** The full user object, including tokens, was sent to the browser. The profile now includes only needed fields.
- **CSP:** The server uses a restrictive policy. Scripts and styles are external.
- **Clickjacking:** CSP and `X-Frame-Options` prevent pages from being framed.

## Test checks

- URL input uses text rendering, not `innerHTML`.
- Valid settings work; an unlisted key is rejected.
- The profile response does not include tokens.
- CSP and framing headers are set on both pages.

Browser check: URL input displayed as text, and settings and account controls worked.
