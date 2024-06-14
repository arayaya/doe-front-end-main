import React, { useState } from "react";

const Dropdown = ({ label, value, onChange, valuedate }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="ml-0 mr-0">
      <form className="max-w-sm">
        <div className="border-2 border-lightgray rounded-lg w-40 h-16 dark:placeholder-gray-400">
          <label className="block text-xs mt-2.5 ml-2.5 mb-0 text-darkgray font-font_Rg">
            {label}
          </label>
          <select
            id="select"
            className="w-36 ml-1 text-base font-font_Bd"
            onChange={handleChange}
            defaultValue={valuedate}
            // value={valuedate}
          >
            {value.map((val, index) => (
              <option key={index} value={index}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Dropdown;
