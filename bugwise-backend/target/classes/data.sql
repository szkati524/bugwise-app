
-- 1. DODAWANIE RZĘDÓW (insect_order)
INSERT INTO insect_order (name, latin_name, description)
VALUES ('Chrząszcze', 'Coleoptera', 'Rząd owadów charakteryzujący się twardymi pokrywami.');
INSERT INTO insect_order (name, latin_name, description)
VALUES ('Motyle', 'Lepidoptera', 'Owady o skrzydłach pokrytych barwnymi łuskami.');

-- 2. DODAWANIE RODZIN (insect_family)
INSERT INTO insect_family (name, latin_name)
VALUES ('Biegaczowate', 'Carabidae');
INSERT INTO insect_family (name, latin_name)
VALUES ('Paziowate', 'Papilionidae');

-- 3. DODAWANIE SIEDLISK (habitat)
INSERT INTO habitat (name, type, climate_description)
VALUES ('Las liściasty', 'Leśny', 'Umiarkowany, duża wilgotność.');
INSERT INTO habitat (name, type, climate_description)
VALUES ('Łąka', 'Otwarty', 'Słoneczne, umiarkowane opady.');

-- 4. DODAWANIE TAGÓW (tag)
INSERT INTO tag (name) VALUES ('Drapieżnik');
INSERT INTO tag (name) VALUES ('Chroniony');

-- 5. DODAWANIE OWADÓW (insect)
-- Zakładamy, że powyższe rekordy dostały ID 1 i 2 (standard w H2 przy czystym starcie)
INSERT INTO insect (common_name, latin_name, english_name, description, order_id, family_id, habitat_id, is_protected, danger_level)
VALUES ('Biegacz fioletowy', 'Carabus violaceus', 'Violet ground beetle', 'Nocny drapieżnik o fioletowym połysku.', 1, 1, 1, true, 'HARMLESS');

INSERT INTO insect (common_name, latin_name, english_name, description, order_id, family_id, habitat_id, is_protected, danger_level)
VALUES ('Paź królowej', 'Papilio machaon', 'Old World swallowtail', 'Jeden z najpiękniejszych polskich motyli.', 2, 2, 2, false, 'HARMLESS');