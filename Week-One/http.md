**HTTP** -> application layer protocol bw client and a server Request → Response model.

- Stateless protocol
- HTTPS = HTTP + TLS Encryption
- HTTP → 80
- HTTPS → 443

---

## URL Structure

```
https://www.example.com:443/products?id=10#reviews
```

| Part | Example |
|------|---------|
| Protocol | https |
| Host | www.example.com |
| Port | 443 |
| Path | /products |
| Query | id=10 |
| Fragment | reviews |

---

## HTTP Methods

| Method | Purpose | Idempotent |
|---------|----------|------------|
| GET | Retrieve resource | ✅ |
| POST | Create resource | ❌ |
| PUT | Replace resource | ✅ |
| PATCH | Partial update | ❌ |
| DELETE | Delete resource | ✅ |

---

## Status Codes

### 2xx Success

- 200 OK
- 201 Created
- 204 No Content

### 3xx Redirect

- 301 Moved Permanently
- 302 Found
- 304 Not Modified

### 4xx Client Errors

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 409 Conflict
- 429 Too Many Requests

### 5xx Server Errors

- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout

---

## HTTP Headers

### Request Headers

```
Host
User-Agent
Accept
Authorization
Cookie
Content-Type
Content-Length
```

### Response Headers

```
Content-Type
Content-Length
Cache-Control
ETag
Set-Cookie
Location
Server
```

---

## Request Structure

```http
GET /users HTTP/1.1
Host: example.com
Authorization: Bearer <token>

```

---

## Response Structure

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "John"
}
```

---

## HTTP Versions

| Version | Features |
|----------|----------|
| HTTP/1.0 | One request per connection |
| HTTP/1.1 | Keep-Alive |
| HTTP/2 | Multiplexing, Header Compression |
| HTTP/3 | QUIC (UDP), Faster Connections |

---

## REST API Example

```
GET    /users
POST   /users
GET    /users/1
PUT    /users/1
PATCH  /users/1
DELETE /users/1
```

---

## Complete Flow

```
URL
 ↓
DNS
 ↓
TCP Handshake
 ↓
TLS Handshake
 ↓
HTTP Request
 ↓
Application Logic
 ↓
HTTP Response
 ↓
Browser Cache
 ↓
Render Page
```
