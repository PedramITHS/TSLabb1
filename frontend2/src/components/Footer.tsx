import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="py-1 bg-dark fixed-bottom d-flex flex-row justify-content-between">
        <p className="ms-2 mb-0 text-white">© 2021 Interface Arcade, Inc</p>

        <Link className="text-decoration-none " to="/">
          <p className="px-2 text-white">Home</p>
        </Link>
      </footer>
    </>
  );
}
