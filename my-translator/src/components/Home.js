import React from "react";
import { Link } from "react-router-dom";
import translateImage from "../translate.png"; // Adjust the path according to your image location
import languageImage from "../language.png"; // Import the language.jpg image

export default function Home() {
  return (
    <>
      <div className="container">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid" width="auto">
            <Link to="/" className="navbar-brand">
              <img
                src={translateImage}
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
              My Translator
            </Link>
          </div>
        </nav>
        <div className="">
          <p className="home-para">
            Translate easy and fast into 100+ languages
          </p>
        </div>
        <img
          src={languageImage}
          className="rounded mx-auto d-block"
          alt="Language-Image"
        />

        <div className="d-grid gap-2 col-4 mx-auto">
          <Link to="/translate" className="btn btn-primary" role="button">
            Continue
          </Link>
        </div>
      </div>
    </>
  );
}
