
DROP DATABASE IF EXISTS db_passGenerator;

CREATE DATABASE IF NOT EXISTS db_passgenerator;

USE db_passgenerator;

CREATE TABLE t_password (
    id INT AUTO_INCREMENT PRIMARY KEY,
    savedPassword VARCHAR(255) NOT NULL
);
