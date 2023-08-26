import React from "react";

const Input = ({ id, type, star, onChange, label, labelText }) => {
  return (
    <>
      {label && (
        <label className="position-relative" htmlFor={id}>
          {labelText}
          {star && (
            <i className="fa-solid fa-star text-warning star position-absolute"></i>
          )}
        </label>
      )}
      <input
        id={id}
        type={type}
        onChange={onChange}
        className="form-control"
        autoComplete="off"
      />
    </>
  );
};

export default Input;
