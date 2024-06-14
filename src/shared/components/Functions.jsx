import React from "react";
import { USmonth, abbrMonth } from "./bookingDate/SetData";

export const sortedDates = (event) => {
  return [...event]?.sort(
    (a, b) =>
      new Date(!a.dates ? a : a.dates) - new Date(!b.dates ? b : b.dates)
  );
};

export const THformatDate = (USdate) => {
  const thDate = new Date(USdate);
  const show = `${thDate.getDate()} ${abbrMonth[thDate.getMonth()]} ${
    thDate.getFullYear() + 543
  }`;
  return show;
};

export const USformatDate = (USdate) => {
  const usDate = new Date(USdate);
  const show = `${usDate.getDate()} ${
    USmonth[usDate.getMonth()]
  } ${usDate.getFullYear()}`;
  return show;
};
