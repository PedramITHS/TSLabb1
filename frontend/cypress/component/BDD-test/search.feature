Feature: Sök fält

Det ska finnas en tom text fält för sökning och en knapp.
När text fälten har fyllts namn på spel och klickar man på knappen, då ska ett spel alternativt flera spel dyka upp.

Scenario: Fylla i sök fält
    Given: Jag är på sidan med formulären/tom sökfält
    When: Jag fyller i sök fälten för namn och klickar på knappen
    Then: En eller flera spel ska visas
