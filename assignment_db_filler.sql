# Filling users table with info
INSERT INTO users (username, email, password, type, profile_pic_url) VALUES 
("Terry Tan", "terry@gmail.com", "abc123", "Customer", "https://www.abc.com/terry.jpg");

INSERT INTO users (username, email, password, type, profile_pic_url) values ("Jerry Lau", "jerry@gmail.com", "def456", "Customer", "https://www.abc.com/jerry.jpg");

INSERT INTO users (username, email, password, type, profile_pic_url) values ("Gordon Freeman", "gfreeman@gmail.com", "blackmesa", "Customer", "https://www.abc.com/gfreeman.jpg");

# Filling platform table with info
INSERT INTO platform (platform_name, description) VALUES ("PS5", "Playstation 5, a game console developed by Sony");

INSERT INTO platform (platform_name, description) VALUES ("PC", "The PC, also the best multitasker");

INSERT INTO platform (platform_name, description) VALUES ("XBox", "XBox, a game console developed by Microsoft");

INSERT INTO platform (platform_name, description) VALUES ("Switch", "The Switch, a game console developed by Nintendo");

INSERT INTO platform (platform_name, description) VALUES ("Mobile", "Almost as efficient as PCs as they are portable");

INSERT INTO platform (platform_name, description) VALUES ("PS4", "Playstation 4, a game console developed by Sony");

# Filling category table with info
INSERT INTO category (catname, description) VALUES ("Action", "An action game emphasizes physical challenges, including hand–eye coordination and reaction-time");

INSERT INTO category (catname, description) VALUES ("Rythmn", "Genre of music games");

INSERT INTO category (catname, description) VALUES ( 'RPG', "A role-playing game (RPG) is a game in which each participant assumes the role of a character, that can interact within the game's imaginary world.");

INSERT INTO category (catname, description) VALUES ( 'Magic', "You're a wizard harry.");

INSERT INTO category (catname, description) VALUES ( 'Cyberpunk', "Games of futuristic properties, typically set in a distopian environment.");

INSERT INTO category (catname, description) VALUES ( 'Roguelike', "A role-playing computer games traditionally characterized by a dungeon crawl through procedurally generated levels, turn-based gameplay, grid-based movement, and permanent death of the player character.");

INSERT INTO category (catname, description) VALUES ( 'Open World', "A level or game designed as nonlinear, open areas with many ways to reach an objective.");

INSERT INTO category (catname, description) VALUES ("Anime", "A genre of games that has animated characters inside of it");

INSERT INTO category (catname, description) VALUES ("Cute", "A genre of games that are wholesome/cute in nature");

# Filling game table with info
INSERT INTO game (title, description, price, platformid, categoryid, year) VALUES ( 'Hogwarts Legacy', "Hogwarts Legacy is a 2023 action role-playing game developed by Avalanche and published by Warner Bros.", "69.90", "1", "1,3,4", "2023");

INSERT INTO game (title, description, price, platformid, categoryid, year) VALUES ( 'Hogwarts Legacy', "Hogwarts Legacy is a 2023 action role-playing game developed by Avalanche and published by Warner Bros.", "75.50", "2", "1,3,4", "2023");

INSERT INTO game (title, description, price, platformid, categoryid, year) VALUES ( 'Hogwarts Legacy', "Hogwarts Legacy is a 2023 action role-playing game developed by Avalanche and published by Warner Bros.", "80", "3", "1,3,4", "2023");

#Game designed to be removed
INSERT INTO game (title, description, price, platformid, categoryid, year) VALUES ( 'Vector', "Parkour game released by Nekki.", "Free", "5", "1,3", "2012");

# Filling review table with info

INSERT INTO review (fk_user, fk_rgame, content, rating) VALUES ("1", "1", "Enjoyed the game! The story and gameplay was good!", 5);

INSERT INTO review (fk_user, fk_rgame, content, rating) VALUES ("1", "4", "Enjoyed the game! The story and gameplay was good!", 5);

INSERT INTO review (fk_user, fk_rgame, content, rating) VALUES ("2", "1", "Enjoyed the game! The story and gameplay was good! Slightly repetitive dou", 4);

INSERT INTO review (fk_user, fk_rgame, content, rating) VALUES ("3", "1", "This is not Half Life, I do not recommend", 1);

INSERT INTO review (fk_user, fk_rgame, content, rating) VALUES ("1", "7", "This game is sick, I am learning parkour thanks to this game", 5);

#INSERT INTO game (title, description, price, platformid, categoryid, year) VALUES ( 'Cyberpunk 2077', "Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.", "68.54,69,82", "1,2,3", "1,3,5,7", "2020");

# Important code for in case I mess up the id
#ALTER TABLE <Table Name> AUTO_INCREMENT = <The next value that will be used in the AUTO_INCREMENT column> ;