import React from "react";

const Select = ({
  id,
  defaultValue = "",
  onChange,
  value = "",
  value1,
  value2,
  text1,
  text2,
  label,
  labelText
}) => {
  return (
    <>
      <select
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        className="input peer block min-h-[auto] w-full rounded border-0 bg-slate-200 px-3 py-[10px] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      >
        <option disabled value={value}>
          kies een optie
        </option>
        <option value={value1}>{text1}</option>
        <option value={value2}>{text2}</option>
      </select>
      {label ? (
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-5 -top-7 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          {labelText}
        </label>
      ) : null}
    </>
  );
};

export default Select;
