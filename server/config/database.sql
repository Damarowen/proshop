CREATE DATABASE proshop;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE users( 
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isadmin BOOLEAN DEFAULT FALSE,
    datetime timestamp NOT NULL DEFAULT NOW().
    PRIMARY KEY (id)
)

CREATE TABLE orders ( 
    order_id SERIAL,
    user_id UUID,
    orderitems JSON [] DEFAULT '{}',
    shippingaddress JSON,
    paymentmethod VARCHAR(255) NOT NULL,
    paymentresult JSON,
    taxprice INT NOT NULL DEFAULT 0.0,
    shippingprice INT NOT NULL DEFAULT 0.0,
    totalprice INT NOT NULL DEFAULT 0.0,
    ispaid BOOLEAN NOT NULL DEFAULT FALSE,
    paidat timestamp,
    isdelivered BOOLEAN NOT NULL DEFAULT FALSE,
    deliveredate timestamp,
    datetime timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)



CREATE TABLE products ( 
    product_id SERIAL,
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    reviews INT,
    rating INT NOT NULL DEFAULT 0,
    numReviews INT NOT NULL DEFAULT 0,
    price INT NOT NULL DEFAULT 0,
    countInStock INT NOT NULL DEFAULT 0,
    datetime timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (product_id),
    FOREIGN KEY (reviews) REFERENCES reviews(review_id)
)


CREATE TABLE reviews ( 
   review_id SERIAL,
   name VARCHAR(255) NOT NULL,
   rating VARCHAR(255) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    user_id UUID,
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES users(id)

)


--INSERT DATA USERS
INSERT INTO users (name, email, password) VALUES 
('Budi', '131fa@gmail.com' , 'a' ),
('Carlie', '1asdasf13@gmail.com' , 'a'),
('Delta', '1asfasf13@gmail.com' , 'a' )


--INSERT DATA USERS WITH ADMIN
INSERT INTO users (name, email, password, isAdmin) VALUES 
('Eko','a2G@gmail.com' , 'a', TRUE ), 
