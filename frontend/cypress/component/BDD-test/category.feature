Feature: Kategori knappar

Det ska finnas en eller flera knappar för olika kategorier av spel.
När man klickar på knappen för en kategori, ska listan av spel ändras
till att enbart visa spel från det valda kategorin

Scenario: Klicka på knappen "Action"
  Given: Jag är på sök sidan med en knappen som visar 'Action'
  When: Jag klickar på knappen
  Then: Ska lista spel från kategori "Action"
