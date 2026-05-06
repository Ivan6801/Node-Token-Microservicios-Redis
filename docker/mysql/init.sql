CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS auth (
    id VARCHAR(64) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_username (username),
    CONSTRAINT fk_auth_user
        FOREIGN KEY (id) REFERENCES user(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
