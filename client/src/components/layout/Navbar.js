import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLink = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a
          onClick={onLogout}
          href="#!"
          className="text-light m-2 text-decoration-none"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <li>
        <Link to="/register" className="text-decoration-none text-light m-2">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" className="text-decoration-none text-light m-2">
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-dark text-light p-2 mb-5 ">
      <h3 className="ms-2">
        <Link to="/" className="text-decoration-none text-light">
          <i className={icon} /> {title}
        </Link>
      </h3>
      <ul className="list-unstyled d-flex">
        {isAuthenticated ? authLink : guestLink}

        <li>
          <Link to="/about" className="text-decoration-none text-light m-2">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
