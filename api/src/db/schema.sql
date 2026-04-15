DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;
-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email text UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EVENTS TABLE 
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_location TEXT,
    event_date TIMESTAMP NOT NULL,
    price decimal(10,2) NOT NULL ,
    available_tickets INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
