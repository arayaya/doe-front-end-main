import React from "react";

const ButtonStyle = ({ onClick, label, type, disabled }) => {
  let setType;
  switch (type) {
    case "secondery":
      setType =
        "border-barbie text-barbie hover:text-second_barbie hover:border-second_barbie";
      break;
    case "seconderyR-l":
      setType =
        "border-barbie pl-3 pr-3 w-auto h-12 text-second hover:text-btncancel hover:border-btncancel";
      break;
    case "secondery-xl":
      setType =
        "border-barbie h-12 w-60 text-barbie hover:text-second_barbie hover:border-second_barbie";
      break;
    case "secondery-auto":
      setType =
        "border-barbie h-12 w-auto pl-3 pr-3 text-barbie hover:text-second_barbie hover:border-second_barbie";
      break;
    case "binary":
      setType =
        "border-barbie bg-barbie text-white ml-3 hover:bg-second_barbie";
      break;
    case "binary-xl":
      setType =
        "border-barbie h-12 w-60 bg-barbie text-white hover:bg-second_barbie";
      break;
    case "disable":
      setType =
        "border-lightgray bg-lightgray text-darkgray cursor-not-allowed";
      break;
    case "disable-auto":
      setType =
        "border-lightgray h-12 w-auto pl-3 pr-3 bg-lightgray text-darkgray cursor-not-allowed";
      break;
    default:
      break;
  }

  return (
    <div>
      <button
        type="button"
        className={`border font-font_Rg rounded-lg w-28 h-10 ${setType} font-bold`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default ButtonStyle;
