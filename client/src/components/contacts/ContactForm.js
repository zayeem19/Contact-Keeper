import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary text-center">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      ></input>
      <input
        className="form-control mb-2"
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      ></input>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      ></input>
      <h6>Contact Type</h6>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary col-12 mt-4 mb-2"
        ></input>
      </div>
      {current && (
        <div>
          <button className="btn btn-light col-12 mb-2" onClick={clearAll}>
            {" "}
            Clear{" "}
          </button>
        </div>
      )}
    </form>
  );
};
export default ContactForm;
