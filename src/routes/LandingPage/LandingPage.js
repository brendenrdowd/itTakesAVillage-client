import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <section className="landing">
      <div className="missionContain">
        <img class="landing-logo" src="/logo512.png" alt="ITAV-logo" />
        <h2>It Takes A Village</h2>
        <p>
          It Takes a Village is a community based altruism application that lets
          people come together to help the people around them. If you are in
          need of assistance or you are fortunate enough to be in a position to
          give back, you can connect to the people in your community.
        </p>
      </div>
      <div className="button-bar">
        <Link to="/register" className="btn">
          Sign Up
        </Link>
        <Link to="/login" className="btn">
          Log In
        </Link>
      </div>
    </section>
  );
}
