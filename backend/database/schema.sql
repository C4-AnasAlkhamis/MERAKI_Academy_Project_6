DROP DATABASE MERAKI_Academy_Project_6;
CREATE DATABASE MERAKI_Academy_Project_6;

USE MERAKI_Academy_Project_6;

-- ============================ // done
CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- ============================ // done
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
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
CREATE TABLE user(
    id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(250) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

-- ============================ // done 
CREATE TABLE channel (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

-- ============================ // done 
CREATE TABLE list (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    list VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

-- ============================ // done
CREATE TABLE video (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    channel_id INT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    video VARCHAR(250) NOT NULL,
    FOREIGN KEY (channel_id) REFERENCES channel(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0
);