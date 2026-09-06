# BroLend Backend

Backend for **BroLend**, a peer-to-peer equipment rental marketplace for university students.

BroLend allows students to list equipment they own, discover equipment listed by others, request rentals, approve or reject rental requests, manage active rentals, and review rental experiences.

The backend is designed as a learning-focused but production-oriented Node.js application, with emphasis on relational database design, REST APIs, authentication, authorization, transactions, and concurrency-safe rental logic.

## Project Scope

### Borrowers can
- Browse equipment listings
- Search and filter listings
- View listing details
- Request equipment for a specific rental period
- View rental requests
- View active and completed rentals
- Submit reviews after completed rentals

### Lenders can
- Create equipment listings
- Add equipment details and pricing
- Add multiple listing images
- Set minimum and maximum rental periods
- Specify location
- View incoming rental requests
- Approve or reject requests
- Track equipment currently lent out
- Manage listings

A single user account can act as both a borrower and a lender.

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL
- `pg` — PostgreSQL driver

### Authentication & Security
- JWT
- bcrypt

### Validation
- Zod

### Logging
- Pino 

### Development
- Git
- GitHub
- Postman

### Containerization
- Docker
- Docker Compose

## Architecture

The backend follows a layered architecture:

```text
Client
  |
  v
REST API
  |
  v
Routes
  |
  v
Controllers
  |
  v
Services
  |
  v
Database Layer
  |
  v
PostgreSQL
```

## Project Structure

```text
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   ├── validators/
│   ├── utils/
│   ├── constants/
│   └── app.js
│
├── migrations/
├── seeds/
├── tests/
├── package.json
├── package-lock.json
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## Core Domain

### Users

Users authenticate using their university email and password.

Passwords are never stored in plain text.

A user can act as both a borrower and a lender.

### Listings

A listing represents equipment owned by a lender.

A listing can contain:
- Owner
- Title
- Description
- Category
- Price
- Rental unit
- Minimum rental period
- Maximum rental period
- Location
- Availability
- Status

Possible listing statuses:

```text
ACTIVE
INACTIVE
RENTED
DELETED
```

### Listing Images

A listing can contain multiple images.

PostgreSQL stores references/metadata such as:

```text
listing_id
storage_key
image_url
position
created_at
```

### Categories

Examples from the UI include:

```text
Academics
Accessories
Bicycle
Media
Clothes
Computer
Events
Electronics
Outdoor
Sports
Tools
Miscellaneous
```

### Rental Requests

A borrower can request a listing for a specific period.

A request can contain:
- Borrower
- Listing
- Start date/time
- End date/time
- Message
- Request status

Possible request statuses:

```text
PENDING
APPROVED
REJECTED
CANCELLED
EXPIRED
```

### Rentals

An approved rental becomes an active rental record.

Possible rental states:

```text
ACTIVE
RETURNED
OVERDUE
DAMAGED
DISPUTED
```

A rental should preserve the important information from the approved request so historical records remain reliable.

### Reviews

Reviews are created after a rental is completed.

A review may contain:
- Reviewer
- Reviewed user
- Rental
- Rating
- Comment
- Timestamp

Only users who participated in the relevant rental should be allowed to review one another.

The initial implementation can store notifications in PostgreSQL.

### Audit Logs

Important actions should be recorded.

Examples:

```text
USER_LOGIN
LISTING_CREATED
LISTING_UPDATED
LISTING_DELETED
REQUEST_CREATED
REQUEST_APPROVED
REQUEST_REJECTED
RENTAL_STARTED
RENTAL_RETURNED
```

Audit records should contain:
- User
- Action
- Timestamp
- Metadata

## Authentication

The authentication system uses:

```text
bcrypt
   |
   v
Password Hash
   |
   v
JWT Authentication
```

The system  supports:
- Registration
- Login
- Access tokens
- Refresh tokens
- Logout
- Protected routes

Authentication and authorization are separate concerns.

## Authorization

The backend must enforces permissions and ownership.

Examples:
- A borrower cannot approve a rental request.
- Only a listing owner can manage their listing.
- Only authorized users can access protected resources.
- Only participants in a completed rental can submit a review.
- Administrative operations should be restricted appropriately.

## Rental Conflict Detection

Prevent overlapping approved rentals for the same listing.

Example:

```text
Existing rental:
13 Sept -> 15 Sept

New request:
14 Sept -> 17 Sept
```

The new request must not be approved.

The overlap condition is:

```text
new_start < existing_end
AND
new_end > existing_start
```

The implementation must account for concurrent requests and race conditions.

Consider:
- PostgreSQL transactions
- Appropriate locking
- Isolation levels
- Database constraints

Do not rely only on application-level checks.

## Rental State Flow

A typical rental lifecycle is:

```text
Listing Available
      |
      v
Rental Request
      |
      v
Pending
   +--+--+
   |     |
Approve Reject
   |
   v
Approved Rental
   |
   v
Active
   |
   +----------> Overdue
   |
   v
Returned
```

If equipment is damaged:

```text
Active
  |
  v
Returned
  |
  v
Damaged
```

Final state transition rules should be enforced by backend business logic.

## Planned API Areas

The exact API contract should be finalized during backend design.

### Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
```

### Users

```http
GET /users/me
PATCH /users/me
GET /users/:id
```

## Database Principles

The project uses **raw SQL through the `pg` driver** instead of an ORM.

This is intentional.

The goal is to learn:
- Relational database design
- Primary keys
- Foreign keys
- Constraints
- Joins
- Indexes
- Transactions
- Isolation
- Query performance
- Concurrency

Database changes should be managed through migrations.

Example:

```text
migrations/
├── 001_create_users.sql
├── 002_create_categories.sql
├── 003_create_listings.sql
├── 004_create_listing_images.sql
├── 005_create_rental_requests.sql
└── ...
```

Never modify schema manually without recording the corresponding migration.

## Environment Variables

Do not commit `.env`.

Use `.env.example` as the template.

Example:

```env
PORT=
NODE_ENV=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
JWT_ACCESS_EXPIRY=
JWT_REFRESH_EXPIRY=

OBJECT_STORAGE_ENDPOINT=
OBJECT_STORAGE_BUCKET=
OBJECT_STORAGE_ACCESS_KEY=
OBJECT_STORAGE_SECRET_KEY=
```

The exact variables depend on the selected object-storage provider.

## Local Development

Install dependencies:

```bash
npm install
```

Start PostgreSQL using Docker Compose:

```bash
docker compose up -d
```

Start the backend:

```bash
npm run dev
```

View logs:

```bash
docker compose logs -f
```

Stop containers:

```bash
docker compose down
```

## Testing

API testing will be performed using Postman during development.

The backend should eventually include automated tests for:
- Authentication
- Authorization
- Listing creation
- Listing ownership
- Rental request creation
- Request approval/rejection
- Rental state transitions
- Conflict detection
- Reviews
- Validation
- Error handling

The most important tests should target concurrent rental requests and authorization boundaries.

## Development Roadmap

```text
1. Requirements Analysis
2. Database Entity Identification
3. ER Diagram
4. PostgreSQL Schema
5. Backend Architecture
6. Express Setup
7. Database Layer
8. Authentication
9. Authorization
10. Listings
11. Listing Images / Object Storage
12. Rental Requests
13. Rental Workflow
14. Conflict Detection
15. Reviews
16. Notifications
17. Audit Logs
18. Validation with Zod
19. Structured Logging with Pino
20. Automated Testing
21. Dockerization
```

## Git Workflow

Recommended branch structure:

```text
main
└── dev
    ├── feature/auth
    ├── feature/listings
    ├── feature/rentals
    └── feature/reviews
```

Developers should work on feature branches and merge into `dev`.

`main` should represent stable code.

Before pushing a feature branch, synchronize with the current `dev` branch to reduce integration conflicts.

## Backend Development Principles

### Keep business logic out of routes

Prefer:

```text
Route
  |
  v
Controller
  |
  v
Service
  |
  v
Database
```

### Validate all untrusted input

Anything coming from the client should be considered untrusted.

### Never trust the frontend for authorization

The backend must enforce all permission checks independently.

### Prefer database guarantees where appropriate

Important invariants should not rely exclusively on application code.

### Use transactions for multi-step state changes

For example:

```text
Approve request
      +
Create rental
      +
Update rental/listing state
      +
Create audit log
```

These operations may need to succeed or fail together.

## Security Principles

The backend should:
- Hash passwords with bcrypt
- Never expose password hashes
- Protect authenticated routes
- Verify resource ownership
- Validate request payloads
- Use parameterized SQL queries
- Keep secrets in environment variables
- Avoid logging sensitive information
- Handle token expiration
- Protect against common API abuse
- Return safe and consistent error messages

Never build SQL by concatenating user input.

Use parameterized queries:

```js
await pool.query(
  'SELECT * FROM listings WHERE id = $1',
  [listingId]
);
```

## Project Status

🚧 **Backend under active development**

Current focus:

```text
Requirements
    |
    v
Database Design
    |
    v
Backend Architecture
    |
    v
Implementation
```

## Goal

The goal of BroLend is not just to build a working rental platform.

The project is also intended to provide practical experience with:

- REST API design
- Authentication
- Authorization
- PostgreSQL
- Raw SQL
- Database normalization
- Transactions
- Concurrency
- Race-condition prevention
- State machines
- Object storage
- Validation
- Logging
- Testing
- Docker
