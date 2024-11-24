// import { useState } from "react";

// Generics för ett sök värde där den kan vara en siffra eller en bokstav men inte "any"
// Denna komponenten kommer inte att användas för tillfället pga av att jag inte fullt ut förstår skickandet av props med funktioner.
export default function Search({
  onSearch,
}: {
  onSearch: { (e: React.ChangeEvent<HTMLInputElement>): void };
}) {
  // const [val, setVal] = useState<string>('');

  function changeValue(e: React.ChangeEvent<HTMLInputElement>) {
    onSearch(e);
  }

  return (
    <>
      <form className="col-12 mb-3 mb-lg-0 me-lg-3">
        <div className="d-flex" style={{ gap: "10px" }}>
          <input
            type="text"
            className="form-control form-control-dark"
            placeholder="Search..."
            aria-label="Search"
            onChange={changeValue}
          />
          <button type="submit" className="btn btn-warning">
            search
          </button>
        </div>
      </form>
    </>
  );
}
