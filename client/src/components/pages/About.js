import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <h2>About this App</h2>
      <p>Full MERN stack app for keeping contacts </p>
      <h6 className="text-success fst-italic">Some features</h6>
      <ul className="text-success fst-italic">
        <li>Light weight and responsive</li>
        <li>Safe and secure way to store contacts</li>
        <li>Access from any where</li>
        <li>Always stay up-to-date</li>
      </ul>

      <p>
        <strong> Version </strong> 1.0.0
      </p>
    </Fragment>
  );
};

export default About;
