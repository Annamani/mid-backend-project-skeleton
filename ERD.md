## Database Schema Documentation

This project uses PostgreSQL with core entities currently using users and events.
The Entity Relationship Diagram for users and events is updated under ./images/ERD for users and events.png

## Core Entities

# User Table

Stores users' information:

- id (SERIAL PRIMARY KEY) - Unique identifier
- email (TEXT UNIQUE NOT NULL) - User email
- user_password (TEXT NOT NULL) - User password
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Account creation timestamp

# Events Table

Stores available events for booking/purchase:

id (SERIAL PRIMARY KEY) - Unique identifier
title (TEXT NOT NULL) - Event title
description (TEXT) - Event description
event_location (TEXT) - Event location
event_date (TIMESTAMP NOT NULL) - Date and time of the event
price (DECIMAL(10,2) NOT NULL) - Ticket price
available_tickets (INTEGER NOT NULL) - Remaining tickets
created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Creation timestamp

# Database Files

- Schema: ../../api/src/db/schema.sql – Table definitions with constraints
- Seed Data: ../../api/src/db/seed.sql – Initial test data and queries
