-- Drop tables if they already exist
DROP TABLE IF EXISTS platGames;
DROP TABLE IF EXISTS platforms;
DROP TABLE IF EXISTS games;

-- Games table
-- CREATE TABLE games (
--     game_id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     description TEXT NOT NULL,
--     release_date DATE NOT NULL,
--     banner TEXT NOT NULL,
--     image TEXT NOT NULL
-- );

-- Alternative
CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    release_date VARCHAR(100) NOT NULL,
    banner TEXT NOT NULL,
    image TEXT
);

-- Release date format är "YYYY-MM-DD"
INSERT INTO games (name, description, release_date, banner, image)
VALUES ('Neo Contra', 'The ultimate run''n''gun shooter! Take on the role of tough-as-nails hero Bill Rizer and his partner, the mysterious samurai Jaguar to stop a maniacal organization from taking over the world! Intense firefights, incredibly wicked boss enemies and legendary gameplay brings the Contra series to a whole new dimension. Awesome weaponry to choose from including spread shot, lock-on missiles and flamethrowers. Unlockable levels and extras. Selectable difficulties for beginners and experts. Two player simultaneous action.', '2004-10-19', 'images/contraBanner.jpg', 'images/contra.jpg'),
('Bujingai: The Forsaken City', 'The year is 22XX, the world civilization collapsed due to the lack of power after the explosion of a nuclear reactor. You are cast in a role of Lau, main protagonist whose character is modeled after the J-POP singer Gackt. However, your friend Lei turned on the dark side and is set to destroy what is left of the world and your plan is to stop Lei by any means necessary. The entire gameplay is very similar to that of Devil May Cry games, you can jump off the walls, performs various sword attacks, and use special magic attacks while battling the minions of darkness.', '2004-07-20', 'images/bujingaiBanner.jpg', 'images/bujingai.jpg'),
('Star Fox Assault', 'Step into the guise of furry flyboy Fox McCloud as he returns to take on his deadliest enemy; wingmen Slippy Toad, Falco Lombardi, and newcomer Krystal are covering your back, as you take on hordes of intergalactic hostiles on land and in air. Hop into Arwings for aerial skirmishes, Landmaster tanks for ground-based confrontations, or simply run around on foot dispensing laser justice; the searing single player adventure is a total blast, while the glorious four-way split-screen mode is sure to keep you and your friends coming back for more. With sniper rifles and rocket launchers, this is one Fox you don''t want to mess with!', '2005-02-14', 'images/starfoxBanner.jpg', 'images/starfox.jpg'),
('Tales of Symphonia', 'Two worlds exist, unaware of each other. Mana, or life force, is shared by both worlds and while one world thrives, the other suffers. Lloyd Irving lives on Sylvarant, a dying world where nothing is as it seems - a fact he hasn''t yet realized. With a strong set of justice, incredible bravery, and a particular loyalty to his friends, he joins them in a very important quest: a journey to save their world.', '2004-07-13', 'images/symphoniaBanner.jpg', 'images/symphonia.jpg'),
('JSRF: Jet Set Radio Future', 'You say you want a revolution? The setting is Tokyo; the year is 2024. Freedom is a valuable commodity, and freedom of expression is even more so. The thumping beats and mean streets are back in Jet Set Radio Future on the Xbox video game system. Featuring unique comic-style graphics, new tricks, and hot tunes, Jet Set Radio Future brings the hippest game ever into a brave new world. Choose a character, strap on your rocket-powered skates, and immerse yourself in living, breathing cities filled with opportunity.', '2002-02-25', 'images/jsrfBanner.jpg', 'images/jsrf.jpg'),
('Metal Wolf Chaos', 'The country is in peril as President Michael Wilson defends the nation against a full-scale rebellion led by Vice-President Richard Hawk and the mechanized legions he commands. As the 47th President of the United States, it is your sworn duty to take your country back by any means necessary and end this unjust coup d''etat! Battle in your advanced mech - armed to the teeth - across iconic American landscapes including the Brooklyn Bridge, the Grand Canyon, and the front steps of the White House.', '2004-10-22', 'images/mwcBanner.jpg', 'images/mwc.jpg'),
('Half-Life', 'Half-Life, a First Person Shooter released by Valve & Sierra in 1998, tells the story of a recently graduated theoretical physicist, named Dr. Gordon Freeman, who is working on experiments in relation to teleportation technology with other scientists in the Black Mesa Research Facility. Unfortunately, an experiment goes disastrously wrong and aliens from another dimension, also known as Xen, subsequently enter the facility through a dimensional seam! As Freeman tries to make his way out of the ruined facility, he soon realizes that he is caught between two sides: the hostile aliens and a U.S. Marine Corps special operations unit dispatched to cover up the incident by eliminating all organisms in the facility, including every single survivor. Explore the facility as Gordon Freeman, escape the complex alive and discover both the mysterious Xens as well as their portals to other dimensions!', '1998-11-19', 'images/hlBanner.jpg', 'images/hl.png'),
('F.E.A.R.: First Encounter Assault Recon', 'F.E.A.R.: First Encounter Assault Recon is a horror first person shooter (FPS) that resembles a cross between Doom 3, Half-Life, and the Ring horror movies. Demons are replaced by cloned soldiers and the element of horror revolves around an image of a spectral girl always appearing when least expected for a few fleeting moments. The player sets out as a member of a specialized strike force dealing with unknown threats. Initially, the player starts with mundane weapons, which are well presented, and progress gradually towards more sci-fi ones as the danger increases. The player can also call upon a bullet-time ability which slows down time around the player and is realised with impressive visual and aural effects by the game engine.', '2005-10-17', 'images/fearBanner.jpg', 'images/fear.jpg');

-- Platforms table
CREATE TABLE platforms (
    platform_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

INSERT INTO platforms (name)
VALUES ('PlayStation'), ('Nintendo'), ('Xbox'), ('PC/Steam');

-- Junction table for Games and Platforms
CREATE TABLE platGames (
    platGame_id SERIAL PRIMARY KEY,
    platform_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    FOREIGN KEY (platform_id) REFERENCES platforms(platform_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

INSERT INTO platGames (platform_id, game_id)
VALUES (1, 1), (1,2 ), (2,3), (2,4), (3,5), (3,6), (4,7), (4,8);
