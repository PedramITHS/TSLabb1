import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Lights from "../components/Mode";

export default function Navbar() {
  const [show, setShow] = useState<boolean>(false);

  const closeCanvas = () => setShow(false);
  const showCanvas = () => setShow(true);

  return (
    <>
      <nav className="navbar fixed-top navbar-dark bg-dark d-flex">
        <div className="d-flex container-fluid align-items-center">
          <div>
            <button
              onClick={() => showCanvas()}
              className="navbar-toggler"
              type="button"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* <Offcanvas start/> */}
            <Offcanvas
              data-bs-theme="dark"
              show={show}
              onHide={() => closeCanvas()}
              style={{ width: "260px" }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Navigation menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul>
                  <Link to={"/"}>
                    <li onClick={() => closeCanvas()}>Games</li>
                  </Link>
                  <Link to={"/post"}>
                    <li onClick={() => closeCanvas()}>POST a game</li>
                  </Link>
                  <Link to={"/patch"}>
                    <li onClick={() => closeCanvas()}>PATCH a game</li>
                  </Link>
                  <Link to={"/delete"}>
                    <li onClick={() => closeCanvas()}>DELETE a game</li>
                  </Link>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
            {/* Offcanvas end */}
          </div>
          <div className="mx-auto text-center">
            <h3 className="text-white">Interface Arcade</h3>
          </div>
          <Lights switchOn={false} />
        </div>
      </nav>
    </>
  );
}
