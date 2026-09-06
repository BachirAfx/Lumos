-- 1. Setup Status Enums
CREATE TYPE request_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
CREATE TYPE rental_status AS ENUM ('ACTIVE', 'RETURNED', 'OVERDUE', 'DAMAGED', 'DISPUTED');

-- 2. Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Listings Table
CREATE TABLE listings (
    listing_id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price_per_day DECIMAL(10, 2),
    price_per_hour DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Search Indexing
CREATE INDEX idx_listings_search ON listings USING GIN (to_tsvector('english', title || ' ' || description));

-- 5. Listing Images Table
CREATE TABLE listing_images (
    image_id SERIAL PRIMARY KEY,
    listing_id INTEGER REFERENCES listings(listing_id) ON DELETE CASCADE,
    cloudinary_public_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Rental Requests Table
CREATE TABLE rental_requests (
    request_id SERIAL PRIMARY KEY,
    listing_id INTEGER REFERENCES listings(listing_id) ON DELETE CASCADE,
    borrower_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status request_status DEFAULT 'PENDING',
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_dates CHECK (end_date > start_date)
);

-- 7. Rentals Table
CREATE TABLE rentals (
    rental_id SERIAL PRIMARY KEY,
    request_id INTEGER UNIQUE REFERENCES rental_requests(request_id),
    status rental_status DEFAULT 'ACTIVE',
    actual_return_date TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Reviews Table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    rental_id INTEGER REFERENCES rentals(rental_id),
    reviewer_id INTEGER REFERENCES users(user_id),
    reviewee_id INTEGER REFERENCES users(user_id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Audit Logs Table
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    actor_id INTEGER REFERENCES users(user_id),
    action VARCHAR(50) NOT NULL,
    target_id INTEGER,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
