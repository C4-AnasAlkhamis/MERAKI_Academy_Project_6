DROP DATABASE MERAKI_Academy_Project_6;

CREATE DATABASE MERAKI_Academy_Project_6;

USE MERAKI_Academy_Project_6;

-- ============================ // done
CREATE TABLE permissions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    permission VARCHAR(100) NOT NULL
);

-- ============================ // done
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(100) NOT NULL
);

-- ============================ // done 
CREATE TABLE role_permission (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role INT NOT NULL,
    permission INT NOT NULL,
    FOREIGN KEY (role) REFERENCES roles (id),
    FOREIGN KEY (permission) REFERENCES permissions (id)
);

-- ============================ // done
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(250) DEFAULT NULL,
    role_id INT NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- ============================ // done 
CREATE TABLE channels (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================ // done 
CREATE TABLE lists (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    list VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================ // done
CREATE TABLE videos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_name VARCHAR(255),
    channel_id INT NOT NULL,
    list_id INT,
    title VARCHAR(255),
    description MEDIUMTEXT NOT NULL,
    video VARCHAR(250) NOT NULL,
    image VARCHAR(250),
    dt DATETIME default now(),
    FOREIGN KEY (channel_id) REFERENCES channels(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (list_id) REFERENCES lists(id),
    is_deleted TINYINT DEFAULT 0
);



INSERT INTO
    roles (role)
VALUES
    ('Admin_channel');

INSERT INTO
    roles (role)
VALUES
    ('User');

INSERT INTO
    permissions (permission)
VALUES
    ('create');

INSERT INTO
    permissions (permission)
VALUES
    ('create_channel');

INSERT INTO
    permissions (permission)
VALUES
    ('read');

INSERT INTO
    permissions (permission)
VALUES
    ('update');

INSERT INTO
    permissions (permission)
VALUES
    ('delete');

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 1);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 5);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 3);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 4);

INSERT INTO
    role_permission (role, permission)
VALUES
    (2, 2);

INSERT INTO
    role_permission (role, permission)
VALUES
    (2, 3);
