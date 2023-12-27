// LandingPage.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "../Css/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="App">
    {/* <!--NAVIGATION BLOG START--> */}
    <div class="nav-bar">
      <div class="container">
        <a class="logo-nav" href="">
          Zee<span>VX</span>
        </a>
        <img
          id="mobile-cta"
          class="mobile-menu"
          src=''
          alt="navigation"
        />
        <nav>
          <img
            id="mobile-exit"
            class="mobile-menu-exit"
            src=''
            alt="close navigation"
          />
          <ul class="primary-nav">
            <li class="current">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
          </ul>

          <ul class="second-nav">
            <li>
              <a href="#">Contact</a>
            </li>
            <li class="go-premium-cta">
              <a href="/login">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    {/* <!--NAVIGATION BLOG END--> */}

    {/* <!--SECTION HERO BLOG START--> */}
    <section class="hero">
      <div class="container">
        <div class="left-col">
          <p class="sub-head">it's nitty &amp; gritty</p>
          <h1>a task app that doesn't stink</h1>

          <div class="hero-cta">
            <a href="#" class="primery-cta">
              Try for free
            </a>
         
          </div>
        </div>

        <img src='https://i0.wp.com/www.primebusiness.africa/wp-content/uploads/2023/02/iPhone-15.png?fit=1200%2C741&ssl=1' alt="Illustration" class="hero-img" />
      </div>
    </section>
    {/* <!--SECTION HERO BLOG END--> */}

    {/* <!--SECTION TEST  BLOG START--> */}
    <section class="test-monials-section">
      <div class="container">
        <ul>
          {/* <!--PERSON 1--> */}
          <li>
            <img src='' alt="Person 1" />
            <blockquote>
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore"
            </blockquote>
            <cite> &mdash; Sergio de Paula</cite>
          </li>

          {/* <!--PERSON 2--> */}
          <li>
            <img src='' alt="Person 2" />
            <blockquote>
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore"
            </blockquote>
            <cite> &mdash; Craig McKay</cite>
          </li>

          {/* <!--PERSON 3--> */}
          <li>
            <img src='' alt="Person 3" />
            <blockquote>
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore"
            </blockquote>
            <cite> &mdash; Jane Doe</cite>
          </li>
        </ul>
      </div>
    </section>
 
  </div>
  );
};

export default LandingPage;
