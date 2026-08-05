# Web Dev Cheat Sheet - Azfar Nayyan

## URLs

| Part | Example | Notes |
|---|---|---|
| Scheme | `https://` | protocol |
| Host | `example.com` | domain |
| Port | `:8080` | default 80/443 |
| Path | `/blog/post-1` | resource location |
| Query | `?id=5&sort=asc` | key-value params |
| Fragment | `#section2` | client-side only, not sent to server |

| Type | Example | Behavior |
|---|---|---|
| Absolute URL | `https://site.com/img.png` | full path, works anywhere |
| Relative URL | `/img.png` or `img.png` | resolved against current page's base URL |
| Protocol-relative | `//cdn.com/lib.js` | inherits current page's scheme |

**Resolution rule:** relative URL + base URL → resolved via browser's URL algorithm (like `new URL(relative, base)`).

- **Semantic URL** — human-readable, describes content (`/products/shoes` not `/p?id=123`)
- **URL Encoding** — reserved/unsafe chars → `%XX` (space → `%20`, `&` → `%26`); `encodeURIComponent()` for values, `encodeURI()` for full URLs

---

## Storage APIs

| Feature | localStorage | sessionStorage | Cookies | IndexedDB | Cache API |
|---|---|---|---|---|---|
| Capacity | ~5-10MB | ~5-10MB | ~4KB | large (100s MB+) | large |
| Persistence | permanent | tab lifetime | set expiry | permanent | permanent |
| Sent to server | no | no | yes (every request) | no | no |
| Sync/Async | sync | sync | sync | async | async |
| Data type | string | string | string | structured (objects, blobs) | Request/Response pairs |
| Accessible from | same origin, all tabs | same tab only | same origin (+domain scope) | same origin | same origin, SW |
| Use case | user prefs, tokens | temp form data | auth/session, server-read data | large structured/offline data | offline assets, PWA |

- **localStorage** — `setItem/getItem/removeItem/clear`, survives browser restart
- **sessionStorage** — same API, cleared when tab closes
- **IndexedDB** — NoSQL, object stores, indexes, transactions, good for offline apps
- **Cache API** — stores HTTP request/response pairs, used with Service Workers
- **Storage quota** — browser-managed, `navigator.storage.estimate()` to check

---

## HTTP Caching

| Cache Type | Location | Scope |
|---|---|---|
| Browser cache (private) | client disk/memory | one user |
| Shared/proxy cache (public) | CDN/proxy | multiple users |
| Service Worker cache | client | programmable, offline-first |

### Cache-Control directives

| Directive | Meaning |
|---|---|
| `no-store` | never cache, always fetch fresh |
| `no-cache` | cache but revalidate every time before use |
| `private` | only browser can cache, not shared/CDN |
| `public` | any cache (browser, CDN) can store |
| `max-age=N` | fresh for N seconds |
| `immutable` | never revalidate while fresh (versioned assets) |
| `must-revalidate` | once stale, must revalidate before use |
| `stale-while-revalidate` | serve stale while fetching fresh in background |

### Validation

| Header | Type | How it works |
|---|---|---|
| `ETag` | hash/version tag | server compares tag, 304 if match |
| `Last-Modified` | timestamp | server compares date, 304 if unchanged |
| `If-None-Match` | request header | sends ETag back for validation |
| `If-Modified-Since` | request header | sends date back for validation |

---

## Same-Origin Policy & CORS

**Origin** = scheme + host + port. All three must match for "same-origin."

| Compare | `https://a.com` | `http://a.com` | `https://a.com:8080` | `https://sub.a.com` |
|---|---|---|---|---|
| vs `https://a.com` | same | different (scheme) | different (port) | different (host) |

- **CORS** — server opts in to cross-origin access via headers (`Access-Control-Allow-Origin`, `-Methods`, `-Headers`, `-Credentials`)
---

## Web Performance — Core Web Vitals

| Metric | Measures | Good threshold |
|---|---|---|
| LCP (Largest Contentful Paint) | loading speed of main content | ≤ 2.5s |
| INP (Interaction to Next Paint) | responsiveness | ≤ 200ms |
| CLS (Cumulative Layout Shift) | visual stability | ≤ 0.1 |
| FCP (First Contentful Paint) | time to first render | ≤ 1.8s |
| TTFB (Time to First Byte) | server response speed | ≤ 0.8s |
| TTI (Time to Interactive) | when page is fully interactive | ≤ 3.8s |
| FP (First Paint) | first pixel rendered | — |
| Speed Index | how fast content visually fills | lower is better |

- **RAIL model** — Response (100ms), Animation (16ms/frame), Idle (use idle time), Load (≤1000ms)
- **LoAF (Long Animation Frame)** — API to detect frames causing jank
- **Long Tasks** — main thread tasks > 50ms, block interactivity
- **Jank** — visible stutter from dropped frames
- **FPS** — frames per second, target 60fps (16.7ms/frame budget)
- **Main thread** — where JS, layout, paint execute; blocking it = janky UI
- **Render-blocking resources** — CSS/JS that delay first paint until loaded

### Critical Rendering Path / Rendering Pipeline

| Stage | What happens |
|---|---|
| DOM | HTML parsed → Document Object Model tree |
| CSSOM | CSS parsed → CSS Object Model tree |
| Render Tree | DOM + CSSOM merged, only visible nodes |
| Layout (Reflow) | compute size/position of each element |
| Paint | fill in pixels (color, text, images) |
| Composite | layers combined on GPU, final frame shown |

---

## Performance APIs

| API | Purpose |
|---|---|
| Performance API (`performance.now()`) | high-res timestamps |
| Navigation Timing | full page load timing breakdown |
| Resource Timing | timing for each resource (JS/CSS/img/fetch) |
| User Timing | custom marks/measures (`performance.mark/measure`) |
| Server Timing | server sends timing data via response header |
| Long Animation Frame API | detect janky long frames |
| Page Visibility API | detect tab active/hidden (`document.visibilityState`) |
| Beacon API (`navigator.sendBeacon`) | send analytics data on page unload, non-blocking |
| requestIdleCallback | run low-priority work during idle time |
| requestAnimationFrame | run code before next repaint, smooth animations |
| IntersectionObserver | detect element entering/leaving viewport (lazy load) |
| Network Information API | detect connection type/speed (`navigator.connection`) |
| Battery API | detect battery status (mostly deprecated) |
| deviceMemory | detect device RAM tier (`navigator.deviceMemory`) |

---

## 7. Networking

| Layer | Purpose |
|---|---|
| DNS | domain name → IP address resolution |
| TCP | reliable, ordered connection (3-way handshake) |
| TLS/SSL | encryption + handshake for HTTPS |
| HTTP/1.1 | text-based, one request per connection (or keep-alive), head-of-line blocking |
| HTTP/2 | binary, multiplexed streams over one connection, header compression |
| HTTP/3 | runs over QUIC (UDP), avoids TCP head-of-line blocking |
| QUIC | transport protocol over UDP, faster handshake, built-in encryption |


---

## Loading & Optimization Techniques

| Technique | What it does |
|---|---|
| Lazy loading | defer offscreen images/resources until needed (`loading="lazy"`) |
| Code splitting | break JS bundle into smaller chunks, load on demand |
| Tree shaking | remove unused code at build time |
| Minification | strip whitespace/comments, shorten names |
| DNS Prefetch | resolve domain early (`<link rel="dns-prefetch">`) |
| Preconnect | establish connection (DNS+TCP+TLS) early |
| Prefetch | fetch resource for likely next navigation |
| Preload | fetch critical resource needed for current page, high priority |
| Prerender | render entire page in background before navigation |
| Speculative loading | umbrella term for prefetch/preload/prerender strategies |
| Service Worker | script proxying network requests, enables offline/caching |
| bfcache (back/forward cache) | instant back/forward nav by preserving full page state |
| Hydration | attach JS behavior to server-rendered HTML |
| Streaming (SSR) | send HTML in chunks as it's generated, faster TTFB/FCP |
| Responsive images | `srcset`/`sizes` to serve right image size per device |
| Web Workers | run JS off main thread (no DOM access) |
| Garbage Collection | automatic memory cleanup of unused objects |
| Parse → Compile → Execute | JS engine pipeline: read code → bytecode → run |
| Performance budget | set limits (size/timing) to prevent regressions |
| will-change | CSS hint to browser to optimize upcoming changes (use sparingly) |

---

## Monitoring

| Type | Description |
|---|---|
| RUM (Real User Monitoring) | collects performance data from actual users |
| Synthetic Monitoring | automated tests simulate user visits (Lighthouse, WebPageTest) |

---

## DOM (Document Object Model)

| Concept | Description |
|---|---|
| DOM | tree structure representing HTML as objects/nodes |
| Node | base type — element, text, comment, document, etc. |
| Element node | tag-based node (`<div>`, `<p>`) |
| Text node | raw text inside elements |
| DOM traversal | `parentNode`, `children`, `childNodes`, `nextSibling`, `previousSibling` |
| Selecting elements | `querySelector`, `querySelectorAll`, `getElementById`, `getElementsByClassName` |
| Creating/modifying | `createElement`, `appendChild`, `removeChild`, `innerHTML`, `textContent` |
| Attributes | `getAttribute`, `setAttribute`, `dataset` (for `data-*`) |
| Event handling | `addEventListener`, event bubbling/capturing, `stopPropagation`, `preventDefault` |
| Event delegation | attach one listener to parent, handle child events via `event.target` |
| DOM vs Virtual DOM | real DOM is slow to update directly; frameworks diff a lightweight JS copy (VDOM) then batch real updates |
| Shadow DOM | encapsulated DOM subtree, scoped styles (used in Web Components) |
| MutationObserver | watches DOM tree for changes (added/removed nodes, attrs) |
| Reflow trigger | reading/writing layout props (`offsetWidth`, `getBoundingClientRect`) forces sync layout |
| innerHTML vs textContent | innerHTML parses HTML (XSS risk); textContent is plain text (safe) |

---

## HTTP Headers

### General / Request

| Header | Purpose |
|---|---|
| `Host` | target domain (required in HTTP/1.1) |
| `User-Agent` | client/browser info |
| `Accept` | content types client can handle (`text/html`, `application/json`) |
| `Accept-Encoding` | compression client supports (`gzip`, `br`) |
| `Accept-Language` | preferred response language |
| `Authorization` | credentials (`Bearer <token>`, `Basic <base64>`) |
| `Cookie` | sends stored cookies to server |
| `Origin` | origin of the request (used in CORS) |
| `Referer` | URL of the page that made the request |
| `Content-Type` | media type of request body (`application/json`, `multipart/form-data`) |
| `Content-Length` | size of request/response body in bytes |
| `If-None-Match` / `If-Modified-Since` | cache validation (see caching section) |

### Response

| Header | Purpose |
|---|---|
| `Set-Cookie` | server sets a cookie on client |
| `Content-Type` | media type of response body |
| `Content-Encoding` | compression used (`gzip`, `br`) |
| `Cache-Control` | caching rules (see caching section) |
| `ETag` / `Last-Modified` | cache validators |
| `Location` | redirect target (used with 3xx status) |
| `Access-Control-Allow-Origin` | CORS — which origins may access response |
| `Access-Control-Allow-Methods` | CORS — allowed HTTP methods |
| `Access-Control-Allow-Credentials` | CORS — allow cookies/auth in cross-origin request |
| `Vary` | tells cache to key on additional request headers |
| `Server-Timing` | server-side timing metrics for dev tools |
| `Content-Security-Policy` | restricts sources for scripts/styles/etc. (XSS mitigation) |
| `Strict-Transport-Security` (HSTS) | force HTTPS on future requests |
| `X-Content-Type-Options: nosniff` | prevents MIME-type sniffing |
| `X-Frame-Options` | controls if page can be framed (clickjacking protection) |
| `Referrer-Policy` | controls how much referrer info is sent |
| `Retry-After` | tells client when to retry (used with 429/503) |

### Common status codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 301 / 302 | Permanent / Temporary redirect |
| 304 | Not Modified (cache hit after validation) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---
