CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE form_status AS ENUM ('draft', 'submitted');
CREATE TYPE gender_type AS ENUM ('male', 'female');

CREATE TABLE admin (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    status form_status NOT NULL DEFAULT 'draft',
    current_step SMALLINT NOT NULL DEFAULT 0,

    -- Step 0: Child 
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender gender_type,
    blood_group VARCHAR(5),

    -- Step 1: Parent 
    parent_name VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    occupation VARCHAR(255),

    -- Step 2: School
    grade VARCHAR(50),
    previous_school VARCHAR(255),
    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP
);