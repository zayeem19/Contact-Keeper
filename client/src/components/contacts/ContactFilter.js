import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === "") {
      text.current.value = "";
    }
  });

  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        className="form-control mb-2"
        ref={text}
        type="text"
        placeholder="Filter Contacts"
        onChange={onChange}
      ></input>
    </form>
  );
};

export default ContactFilter;
