INSERT INTO Users(id, username, password)
VALUES ('26d6b7e7-0935-4292-ba9a-b590bd82f85b', 'admin', '$2a$10$sKt2l10n9DQRMvwoZZ1XY.v5JcJ8zzpGA7a4htPukzkplU/X6vwnq'),
       ('372a262b-f482-4b96-9848-7fa8977c1456', 'user', '$2a$10$vEEY6z.vieVtniwvuZp/d.DV/tatEMJ2W5TUubVWJ/r9WL35S/Z.S');

INSERT INTO Roles(id, name, user_id)
VALUES ('6c9993bc-a831-42da-9f04-8c78584acb7a', 'ROLE_ADMIN', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('d357164c-bb5e-40f3-b594-c74cefa5ced1', 'ROLE_USER', '372a262b-f482-4b96-9848-7fa8977c1456');

INSERT INTO Blogs(id, datetime, title, description, user_id)
VALUES ('0342d18f-9ea2-4dd9-ba00-a47e997a144d', '2021-11-18 16:37:12', 'Straipsnis – analitinis žurnalistikos žanras', 'Paprastai žurnalistikoje straipsniai skirstomi.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('111182e1-cc62-435e-832d-8e122761dce0', '2021-11-18 16:41:35', 'Žiniasklaida – priemonės, pateikti informaciją visuomenei', 'Žiniasklaida (terminas pasiūlytas JAV lietuvių).', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('8b1a118c-143c-4143-91da-516eb8da9ae4', '2021-11-18 16:38:15', 'Poema (gr. poiēma) – poezijos žanras', 'Pirmiausia susiformavo epinė, vėliau – lyrinė poema. Pirmosios poemos.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('7d427ab9-bd09-4557-88e9-4873b4c35ca2', '2021-11-18 16:42:05', 'Kompiuterinis žaidimas', 'Kompiuterinis žaidimas,vaizdo žaidimas arba videožaidimas – žaidimas.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('deae3c63-d616-4e69-911b-4b127d6d3814', '2021-11-18 16:38:45', 'Muzika – garsų menas', 'Muzika – tai laike išsidėsčiusi garsinės raiškos forma.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('3b3df024-d406-45db-badb-7507139a8563', '2021-11-18 16:42:34', 'Telefonas – telekomunikacijos įrenginys', 'Telefonas nebuvo išrastas vieno žmogaus, tai buvo daugybės žmonių', '26d6b7e7-0935-4292-ba9a-b590bd82f85b');


INSERT INTO Comments(id, datetime, text, blog_id, user_id)
VALUES ('d85273b0-5fed-4934-8c25-09f6ba45ff27', '2021-11-18 17:42:45', 'labai idomu', '3b3df024-d406-45db-badb-7507139a8563', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('e394b01e-f6b2-469c-9af5-28c1b7118b15', '2021-11-18 17:42:58', 'megstu muzika', 'deae3c63-d616-4e69-911b-4b127d6d3814', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('7c6cf25d-be43-4504-95d4-55e1ca890c69', '2021-11-18 17:43:02', 'tikrai', 'deae3c63-d616-4e69-911b-4b127d6d3814', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('0b6655dd-dfa6-4b1c-8438-6d0b41d47cd1', '2021-11-18 17:43:20', 'daznai zaidziu', '7d427ab9-bd09-4557-88e9-4873b4c35ca2', '372a262b-f482-4b96-9848-7fa8977c1456'),
       ('13733cbd-f5c9-4af7-89be-24cf45f3d57d', '2021-11-18 17:43:26', 'as irgi! :)', 'deae3c63-d616-4e69-911b-4b127d6d3814', '372a262b-f482-4b96-9848-7fa8977c1456');