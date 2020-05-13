import React from "react";
import { Link } from "react-router-dom";
// import "./LandingPage.css";

export default function LandingPage() {
  return (
    <section>
      <h2>It Takes A village</h2>
      ~logo~
      <p>
        It Takes a Village is a community based altruism application that lets
        people come together to help the people around them. If you are in need
        of assistance or you are fortunate enough to be in a position to give
        back, you can connect to the people in your community.
      </p>
      <div className="button-bar">
        <Link to="/registration" className="btn">
          Sign Up
        </Link>
        <Link to="/login" className="btn">
          Log In
        </Link>
      </div>
    </section>
  );
}
