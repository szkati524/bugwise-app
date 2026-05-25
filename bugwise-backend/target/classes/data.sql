-- =========================================================================
-- 1. CZYSZCZENIE CAŁEJ BAZY (Zachowujemy kolejność usuwania relacji kluczy obcych)
-- =========================================================================
DELETE FROM question_options;
DELETE FROM question;
DELETE FROM insect_tags;
DELETE FROM insect;

-- Czyszczenie słowników, aby uniknąć duplikatów przy restarcie aplikacji
DELETE FROM tag;
DELETE FROM habitat;
DELETE FROM insect_family;
DELETE FROM insect_order;


-- =========================================================================
-- 2. PRZYGOTOWANIE SŁOWNIKÓW (Teraz czyste i bezpieczne dla H2)
-- =========================================================================

-- Rzędy owadów
INSERT INTO insect_order (name, latin_name, description) VALUES
('Chrząszcze', 'Coleoptera', 'Rząd owadów charakteryzujący się pokrywami skrzydłowymi.'),
('Błonkówki', 'Hymenoptera', 'Rząd owadów obejmujący formy społeczne, posiadające często żądło.'),
('Modliszki', 'Mantodea', 'Drapieżne owady o charakterystycznej pierwszej parze odnóży chwytnych.');

-- Rodziny owadów
INSERT INTO insect_family (name, latin_name) VALUES
('Vespidae', 'Vespidae'),
('Modliszkowate', 'Mantidae'),
('Biedronkowate', 'Coccinellidae');

-- Habitaty
INSERT INTO habitat (name, type, climate_description) VALUES
('Strefy podmiejskie', 'Antropogeniczny', 'Blisko domostw ludzkich, sady i ogrody.'),
('Las liściasty', 'Naturalny', 'Umiarkowany, wilgotny z bogatym poszyciem leśnym.'),
('Łąka', 'Naturalny', 'Nasłonecznione tereny otwarte, bogate w roślinność zielną');

-- Tagi
INSERT INTO tag (name) VALUES
('Jadowity'),
('Inwazyjny'),
('Drapieżnik'),
('Chroniony');


-- =========================================================================
-- 3. INSERTY: BIEDRONKA AZJATYCKA
-- =========================================================================
INSERT INTO insect (common_name, latin_name, english_name, description, order_id, family_id, habitat_id, is_protected, danger_level)
VALUES (
    'Biedronka azjatycka',
    'Harmonia axyridis',
    'Harlequin ladybird',
    'Inwazyjny gatunek chrząszcza. Może ugryźć człowieka i wywołać alergię.',
    (SELECT id FROM insect_order WHERE name = 'Chrząszcze'),
    (SELECT id FROM insect_family WHERE name = 'Biedronkowate'),
    (SELECT id FROM habitat WHERE name = 'Strefy podmiejskie'),
    false,
    'ANNOYING'
);

INSERT INTO insect_tags (insect_id, tag_id)
SELECT i.id, t.id FROM insect i, tag t WHERE i.common_name = 'Biedronka azjatycka' AND t.name = 'Inwazyjny';

-- Pytanie 1
INSERT INTO question (content, correct_answer, insect_id)
VALUES (
    'Z jakiego kontynentu naturalnie pochodzi Biedronka azjatycka?',
    'Z Azji',
    (SELECT id FROM insect WHERE common_name = 'Biedronka azjatycka')
);

INSERT INTO question_options (question_id, options) VALUES
((SELECT id FROM question WHERE content = 'Z jakiego kontynentu naturalnie pochodzi Biedronka azjatycka?'), 'Z Azji'),
((SELECT id FROM question WHERE content = 'Z jakiego kontynentu naturalnie pochodzi Biedronka azjatycka?'), 'Z Ameryki Południowej'),
((SELECT id FROM question WHERE content = 'Z jakiego kontynentu naturalnie pochodzi Biedronka azjatycka?'), 'Z Afryki');


-- =========================================================================
-- 4. INSERTY: SZERSZEŃ EUROPEJSKI
-- =========================================================================
INSERT INTO insect (common_name, latin_name, english_name, description, order_id, family_id, habitat_id, is_protected, danger_level)
VALUES (
    'Szerszeń europejski',
    'Vespa crabro',
    'European hornet',
    'Największy z osowatych występujący w Europie. Posiada żądło z jadem.',
    (SELECT id FROM insect_order WHERE name = 'Błonkówki'),
    (SELECT id FROM insect_family WHERE name = 'Vespidae'),
    (SELECT id FROM habitat WHERE name = 'Las liściasty'),
    false,
    'DANGEROUS'
);

INSERT INTO insect_tags (insect_id, tag_id)
SELECT i.id, t.id FROM insect i, tag t WHERE i.common_name = 'Szerszeń europejski' AND t.name = 'Drapieżnik';

INSERT INTO insect_tags (insect_id, tag_id)
SELECT i.id, t.id FROM insect i, tag t WHERE i.common_name = 'Szerszeń europejski' AND t.name = 'Jadowity';

-- Pytanie 1
INSERT INTO question (content, correct_answer, insect_id)
VALUES (
    'Czy jad szerszenia europejskiego jest groźniejszy dla zdrowego człowieka niż jad pszczoły?',
    'Nie, dawka śmiertelna jest porównywalna',
    (SELECT id FROM insect WHERE common_name = 'Szerszeń europejski')
);

INSERT INTO question_options (question_id, options) VALUES
((SELECT id FROM question WHERE content = 'Czy jad szerszenia europejskiego jest groźniejszy dla zdrowego człowieka niż jad pszczoły?'), 'Nie, dawka śmiertelna jest porównywalna'),
((SELECT id FROM question WHERE content = 'Czy jad szerszenia europejskiego jest groźniejszy dla zdrowego człowieka niż jad pszczoły?'), 'Tak, jedno użądlenie zawsze zabija'),
((SELECT id FROM question WHERE content = 'Czy jad szerszenia europejskiego jest groźniejszy dla zdrowego człowieka niż jad pszczoły?'), 'Szerszenie nie posiadają jadu');

-- Pytanie 2
INSERT INTO question (content, correct_answer, insect_id)
VALUES (
    'Do jakiej rodziny zaliczany jest szerszeń europejski?',
    'Osowate (Vespidae)',
    (SELECT id FROM insect WHERE common_name = 'Szerszeń europejski')
);

INSERT INTO question_options (question_id, options) VALUES
((SELECT id FROM question WHERE content = 'Do jakiej rodziny zaliczany jest szerszeń europejski?'), 'Osowate (Vespidae)'),
((SELECT id FROM question WHERE content = 'Do jakiej rodziny zaliczany jest szerszeń europejski?'), 'Biegaczowate'),
((SELECT id FROM question WHERE content = 'Do jakiej rodziny zaliczany jest szerszeń europejski?'), 'Pszczołowate');


-- =========================================================================
-- 5. INSERTY: MODLISZKA ZWYCZAJNA
-- =========================================================================
INSERT INTO insect (common_name, latin_name, english_name, description, order_id, family_id, habitat_id, is_protected, danger_level)
VALUES (
    'Modliszka zwyczajna',
    'Mantis religiosa',
    'European mantis',
    'Jedyny przedstawiciel modliszek w Polsce. Wybitny, zamaskowany drapieżnik polujący na inne owady.',
    (SELECT id FROM insect_order WHERE name = 'Modliszki'),
    (SELECT id FROM insect_family WHERE name = 'Modliszkowate'),
    (SELECT id FROM habitat WHERE name = 'Łąka'),
    true,
    'HARMLESS'
);

INSERT INTO insect_tags (insect_id, tag_id)
SELECT i.id, t.id FROM insect i, tag t WHERE i.common_name = 'Modliszka zwyczajna' AND t.name = 'Drapieżnik';

INSERT INTO insect_tags (insect_id, tag_id)
SELECT i.id, t.id FROM insect i, tag t WHERE i.common_name = 'Modliszka zwyczajna' AND t.name = 'Chroniony';

-- Pytanie 1
INSERT INTO question (content, correct_answer, insect_id)
VALUES (
    'Jaki kolor ciała najczęściej przybiera Modliszka zwyczajna w celach kamuflażu?',
    'Zielony lub brunatny',
    (SELECT id FROM insect WHERE common_name = 'Modliszka zwyczajna')
);

INSERT INTO question_options (question_id, options) VALUES
((SELECT id FROM question WHERE content = 'Jaki kolor ciała najczęściej przybiera Modliszka zwyczajna w celach kamuflażu?'), 'Zielony lub brunatny'),
((SELECT id FROM question WHERE content = 'Jaki kolor ciała najczęściej przybiera Modliszka zwyczajna w celach kamuflażu?'), 'Jaskrawo czerwony'),
((SELECT id FROM question WHERE content = 'Jaki kolor ciała najczęściej przybiera Modliszka zwyczajna w celach kamuflażu?'), 'Niebieski metaliczny');

-- Pytanie 2
INSERT INTO question (content, correct_answer, insect_id)
VALUES (
    'Do czego modliszce służą przednie odnóża?',
    'Do chwytania ofiar',
    (SELECT id FROM insect WHERE common_name = 'Modliszka zwyczajna')
);

INSERT INTO question_options (question_id, options) VALUES
((SELECT id FROM question WHERE content = 'Do czego modliszce służą przednie odnóża?'), 'Do chwytania ofiar'),
((SELECT id FROM question WHERE content = 'Do czego modliszce służą przednie odnóża?'), 'Do szybkiego biegania'),
((SELECT id FROM question WHERE content = 'Do czego modliszce służą przednie odnóża?'), 'Do produkcji dźwięków');