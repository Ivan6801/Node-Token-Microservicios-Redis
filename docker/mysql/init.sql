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

CREATE TABLE IF NOT EXISTS user_follow (
    user_from VARCHAR(64) NOT NULL,
    user_to VARCHAR(64) NOT NULL,
    PRIMARY KEY (user_from, user_to),
    CONSTRAINT fk_user_follow_from
        FOREIGN KEY (user_from) REFERENCES user(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_user_follow_to
        FOREIGN KEY (user_to) REFERENCES user(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
