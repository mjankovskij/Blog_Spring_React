INSERT INTO Users(id, username, password)
VALUES ('26d6b7e7-0935-4292-ba9a-b590bd82f85b', 'admin', '{bcrypt}$2a$10$jYIbAef1H7S.womsk7MRtOCSEx/DgM7CZ1nNeLLzoZ/OPs0a25DV2'),
       ('372a262b-f482-4b96-9848-7fa8977c1456', 'user', '{bcrypt}$2a$10$jYIbAef1H7S.womsk7MRtOCSEx/DgM7CZ1nNeLLzoZ/OPs0a25DV2');

INSERT INTO Roles(id, name, user_id)
VALUES ('6c9993bc-a831-42da-9f04-8c78584acb7a', 'ROLE_ADMIN', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('d357164c-bb5e-40f3-b594-c74cefa5ced1', 'ROLE_USER', '372a262b-f482-4b96-9848-7fa8977c1456');

INSERT INTO Blogs(id, datetime, title, description, user_id)
VALUES ('0342d18f-9ea2-4dd9-ba00-a47e997a144d', '2021-11-18 16:37:12', 'Straipsnis – analitinis žurnalistikos žanras', 'Paprastai žurnalistikoje straipsniai skirstomi į:
redakcinius – vedamasis, redakcijos nuostatas atspindintis, jos vardu parašytas, neretai nenurodant konkretaus autoriaus,
rašinys, dažnai atsiliepiantis į kokius nors įvykius, paaiškėjusius faktus, tendencijas. Dažniausiai publikuojamas nuolatinėje laikraščio ar žurnalo vietoje, gali būti be pavadinimo, tik su nuolatine rubrika. Būdinga nedidelė, neretai vienoda visiems leidinio redakciniams straipsniams apimtis, glaustas minčių dėstymas, tezių pobūdžio argumentacija, naudojami publicistinės retorikos elementai. Įprasta pateikti išvadas, apibendrinimus, atspindinčius redakcijos nuostatas. Susiformavo XIX a. vid.;

teorinius – visuomenės gyvenimo reiškiniai, problemos, pokyčiai, reformos gvildenama teoriniu aspektu, remiantis mokslo
žiniomis. Mintys dėstomos suprantamai, populiariai, paprastai, iliustruojant abstrakčius teiginius konkrečiais pavyzdžiais. Tikslas – supažindinti su aktualiais klausimais, kurie yra svarbūs visuomenei;

probleminius – gyvenimiškas problemas, reiškinius apibendrinančiai analizuojantis žurnalistinis rašinys. Nagrinėjamas ne
konkretus objektas, o gvildenamos problemos, konkrečiais pavyzdžiais iliustruojant bendresnio pobūdžio analizę;

apžvalginius – tam tikro pobūdžio ir pasirinktos tematikos reiškinių ir įvykių analizė. Analizuoja tam tikro laiko ar vietos apibrėžto situacijos dėsningumus;
mokslinius;
kritinius;
poleminius – diskusinio pobūdžio, ginama autoriaus nuomonė.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('111182e1-cc62-435e-832d-8e122761dce0', '2021-11-18 16:41:35', 'Žiniasklaida – priemonės, pateikti informaciją visuomenei', 'Žiniasklaida (terminas pasiūlytas JAV lietuvių[1]; dar vadinama „visuomenės informavimo priemonėmis“) – priemonės, skirtos pateikti informaciją plačiajai visuomenei. Tradiciškai žiniasklaidai priskiriama spauda, radijas, televizija ir internetas. Žiniasklaidos aušroje komunikacija per žiniasklaidą buvo vienpusė, t. y. be grįžtamojo ryšio iš informacijos gavėjo. Naujoji žiniasklaida tapo interaktyvia (sąveikaujamąja, abipuse).

Sąvoka atsirado apie 1920-uosius metus anglosaksų šalyse atsiradus radijui ir masiniams laikraščiams. Lietuviškas pavadinimas „žiniasklaida“ yra palyginti naujas (įvestas apie 1990-uosius), prieš tai šiai sąvokai apibūdinti vartotas „masinių informacijos priemonių” arba iš anglų kalbos perimtas „medijos“ terminas.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('8b1a118c-143c-4143-91da-516eb8da9ae4', '2021-11-18 16:38:15', 'Poema (gr. poiēma) – poezijos žanras', 'Pirmiausia susiformavo epinė, vėliau – lyrinė poema. Pirmosios poemos (indų – „Mahabharata“, „Ramajana“, graikų – Homero „Iliada“ ir „Odisėja“, romėnų – Vergilijaus „Eneida“) sukurtos VIII–I a. pr. m. e. Šių ir daugelio vidurinių amžių epinių poemų (persų – Firdousi „Šachnamė“, vokiečių – „Nybelungų giesmė“, rusų – „Sakmė apie Igorio žygį“) siužeto centre – svarbūs istoriniai įvykiai, lemiantys valstybės likimą, arba pasakojimai apie genties, tautos atsiradimą.

Ankstyvosios poemos dar vadinamos epais, epopėjomis. Jos sukurtos iš liaudies mitų, padavimų, religinių giesmių, istorinių kronikų. Joms būdinga heroika, svarbiausią vaidmenį vaidina siužetas. Vėliau epinių poemų pobūdis kito: pradėjo ryškėti autoriaus moralinė savimonė, psichologinės būsenos (Dantės „Dieviškoji komedija“), filosofinės koncepcijos, meilės išgyvenimų motyvai (Š. Rustavelio „Karžygys tigro kailiu“), individualus formos virtuoziškumas (L. Ariosto „Pašėlęs Rolandas“).', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('7d427ab9-bd09-4557-88e9-4873b4c35ca2', '2021-11-18 16:42:05', 'Kompiuterinis žaidimas', 'Kompiuterinis žaidimas,vaizdo žaidimas arba videožaidimas – žaidimas, kuris yra žaidžiamas kompiuteriu ar kitu specialiai tam pritaikytu įrenginiu (namų žaidimų konsole, delnine žaidimų konsole). Vaizdas gaunamas grįžtamuoju ryšiu, prie žaidimų kompiuterio prijungus monitorių arba televizorių.[3] Nuo XXI a. 2-ojo deš. paplito vaizdo žaidimai, pritaikyti žaisti mobiliuosiuose įrenginiuose (išmaniuosiuose telefonuose, planšetėse).

Terminai kompiuterinis žaidimas ir vaizdo žaidimas yra sinonimai. Atskirtis tarp kompiuterinio ir vaizdo žaidimo sąvokų buvo ryški kompiuterinių žaidimų pramonės vystymosi pradžioje, kai vaizdo žaidimais buvo vadinami žaidimai, žaidžiami žaidimų automatais ir pirmaisiais žaidimų kompiuteriais.

Yra didžiulė kompiuterinių žaidimų žanrų įvairovė: nuo paprasto pobūdžio žaidimų iki sudėtingų realių ir išgalvotų situacijų imitacijų. Taip pat yra žaidimų, kurie lavina loginį mąstymą ar skatina pažinimą, jie vadinami edukaciniais, arba mokomaisiais žaidimais. Kompiuteriniai žaidimai gali būti žaidžiami vieno arba daugelio žaidėjų.[1] Veiksmas žaidimuose valdomas vadinamaisiais žaidimų valdymo įrenginiais.[2]

Kompiuterinių žaidimų turnyrai dažnas reiškinys, egzistuoja profesionalios kompiuterinių žaidimų varžybos.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('deae3c63-d616-4e69-911b-4b127d6d3814', '2021-11-18 16:38:45', 'Muzika – garsų menas', 'Muzika – tai laike išsidėsčiusi garsinės raiškos forma, paremta įvairiomis garsų ir pauzių struktūromis. Įvairių formų garsiniai kūriniai, išreiškiami per natūraliai išgaunamo dirgiklio, dažniausiai garso, kombinacijų ir modelių konstrukciją. Muzikos funkcijos: emocinės išraiškos, estetinio pasigėrėjimo, pramoginė, komunikacinė, reprezentacinė, apeiginė, socialinių normų įtvirtinimo, tradicijų perdavimo ir išlaikymo, kt. Nuo kultūros ir socialinio konteksto priklauso, kaip mes skirstome muziką.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('3b3df024-d406-45db-badb-7507139a8563', '2021-11-18 16:42:34', 'Telefonas – telekomunikacijos įrenginys, elektriniais signalais perduodantis balsą', 'Telefonas nebuvo išrastas vieno žmogaus, tai buvo daugybės žmonių atliktų nepriklausomų bei susijusių išradimų bendras rezultatas.

1849 m. italų išradėjas Antonijus Meučis (Antonio Meucci) Havanoje pademonstravo įrenginį, vėliau pavadintą telefonu, tačiau diskutuojama, ar tai buvo elektrinis telefonas. 1854 m. prancūzas Šarlis Bursolas (Charles Bourseul) išspausdino telefono siųstuvo ir imtuvo aprašymą, bet nesukonstravo veikiančio prietaiso. 1854 m. Antonijus Meučis Niujorke pademonstravo elektrinį telefoną. 1860 m. į telefoną panašų įrenginį sukūrė vokietis Johanas Filipas Raisas (Johann Philipp Reis), bet šis prietaisas galėjo perduoti tik muzikines melodijas, 1861 m. jis jau demonstravo įrenginį, elektra perdavusį balsą 340 pėdų atstumu. 1875 m. birželio 2 d. Aleksandras Belas pirmą kartą telefonu perduoda balsą, o liepos 1 d. pirmąkart panaudoja telefoną, sugebantį perduoti balsą į abi puses.

1877 m. pirmoji telefono linija nutiesta Berlyne. 1882 m. Belo kompanija įrengė telefono tinklą Varšuvoje su 105 abonento linijomis bei Rygoje 54 telefono abonentams. Tų pačių metų pabaigoje nutiesta pirmoji privati telefono linija Rietave. 1888 m. spalio 22 d. Klaipėdoje (tuo metu Prūsija), pradėjo veikti telefono stotis, sujungusi 23 abonento linijas. 1896 m. kovo mėn. telefono stotis pradėjo veikti Vilniuje, 1904 m. – Kaune.

1927 m. sėkmingai pademonstruotas pirmasis transatlantinis skambutis. 1946 m. atliktas pirmasis komercinis skambutis mobiliuoju telefonu. 1958 m. pradėti naudoti pirmieji modemai tiesioginiam susijungimui naudojant telefonines linijas.', '26d6b7e7-0935-4292-ba9a-b590bd82f85b');


INSERT INTO Comments(id, datetime, text, blog_id, user_id)
VALUES ('d85273b0-5fed-4934-8c25-09f6ba45ff27', '2021-11-18 17:42:45', 'labai idomu', '3b3df024-d406-45db-badb-7507139a8563', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('e394b01e-f6b2-469c-9af5-28c1b7118b15', '2021-11-18 17:42:58', 'megstu muzika', 'deae3c63-d616-4e69-911b-4b127d6d3814', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('7c6cf25d-be43-4504-95d4-55e1ca890c69', '2021-11-18 17:43:02', 'tikrai', 'deae3c63-d616-4e69-911b-4b127d6d3814', '26d6b7e7-0935-4292-ba9a-b590bd82f85b'),
       ('0b6655dd-dfa6-4b1c-8438-6d0b41d47cd1', '2021-11-18 17:43:20', 'daznai zaidziu', '7d427ab9-bd09-4557-88e9-4873b4c35ca2', '372a262b-f482-4b96-9848-7fa8977c1456'),
       ('13733cbd-f5c9-4af7-89be-24cf45f3d57d', '2021-11-18 17:43:26', 'as irgi! :)', 'deae3c63-d616-4e69-911b-4b127d6d3814', '372a262b-f482-4b96-9848-7fa8977c1456');