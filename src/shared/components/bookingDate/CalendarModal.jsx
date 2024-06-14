import React, { useCallback, useEffect, useState } from "react";
import { day, month, abbrMonth } from "./SetData";
import Dropdown from "../Dropdown";
import ButtonStyle from "../ButtonStyle";
import useModal from "../useCustom/useModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataRounds,
  postOrgSelectedDate,
  setdates_users,
  setgetrounds,
} from "../../../redux/slice/postsSlice";

const CalendarModal = ({ isOpen, hideModal, check, check_typenormal }) => {
  if (!isOpen) {
    return null;
  }
  const dispatch = useDispatch();
  const currentyear = new Date();
  const [currentdate, setcurrentdate] = useState(new Date());
  const [today, settoday] = useState(currentdate.getDate());
  const date = currentdate;
  date.setHours(0, 0, 0, 0);
  date.setDate(1);
  const [firstDay, setfirstDay] = useState(date.getDay());
  const [monthh, setmonthh] = useState(currentdate.getMonth());
  const [selectedDate, setselectedDate] = useState([]);
  const [_selectedDate, _setselectedDate] = useState([]);
  const timeZone = currentyear.toLocaleDateString("th-TH", {
    year: "numeric",
  });
  const numyear = timeZone.split(" ")[1];
  const [setyear, setsetyear] = useState(numyear);
  const startdate = [],
    countyear = [];
  let numdate = 1;

  const dates_brance = useSelector((state) => state.posts.getDates_branch);
  const datesusers = useSelector((state) => state.posts.dates_users);
  const branch = useSelector((state) => state.posts.branch);
  const token = useSelector((state) => state.posts.gettoken);

  const _orgSelectedDate = datesusers.map((date) => {
    const USDate = new Date(date.dates);
    return `${USDate.getFullYear()}-${
      USDate.getMonth() + 1
    }-${USDate.getDate()}`;
  });

  // max date
  const daysInMonth = () => {
    return new Date(setyear, parseInt(monthh) + 1, 0).getDate();
  };

  useEffect(() => {
    if (isOpen) {
      setselectedDate(_orgSelectedDate.map((date) => new Date(date)));
      _setselectedDate(_orgSelectedDate.map((date) => new Date(date)));
    }
  }, []);

  const showdate = () => {
    let countday = 0;
    for (let i = 0; i < day.length - 1; i++) {
      startdate[i] = [];
      for (let ii = 0; ii < day.length; ii++) {
        if (countday < firstDay || countday >= daysInMonth() + firstDay) {
          startdate[i][ii] = -1;
        } else {
          startdate[i][ii] = 1;
        }
        countday++;
      }
    }
    return (
      <div>
        {startdate.map((date, index) => {
          const mm = parseInt(monthh) + 1;
          const arr = dates_brance.map((d) => {
            return d.date;
          });
          const lastDate = arr.pop(); // last day only
          return (
            <div key={index} className="flex justify-items-center font-font_Bd">
              {date.map((data, index) => {
                const value = new Date(`${setyear - 543} ${mm} ${numdate}`);
                const isSelected = selectedDate.some((d) => {
                  return d.getTime() === value.getTime();
                });
                const _isSelected = _selectedDate.some((d) => {
                  return d.getTime() === value.getTime();
                });
                return data === 1 && dates_brance === undefined ? (
                  <p
                    className="ml-2.5 border-2 bg-lightgray border-lightgray w-20 h-14 rounded-lg mt-2.5 text-center justify-items-center pt-3 font-bold text-xl cursor-default"
                    key={index}
                  >
                    {numdate++}
                  </p>
                ) : data === 1 && dates_brance.length === 0 ? (
                  <p
                    className="ml-2.5 border-2 bg-lightgray border-lightgray w-20 h-14 rounded-lg mt-2.5 text-center justify-items-center pt-3 font-bold text-xl cursor-default"
                    key={index}
                  >
                    {numdate++}
                  </p>
                ) : data === 1 &&
                  new Date(`${mm} ${numdate} ${setyear - 543}`).getTime() <
                    new Date(dates_brance[0].date).getTime() ? (
                  <p
                    className={`ml-2.5 border-2 w-20 h-14 rounded-lg mt-2.5 text-center justify-items-center pt-3 font-bold text-xl cursor-default ${
                      check === true && _isSelected
                        ? "border-barbie bg-lightgray"
                        : "border-lightgray bg-lightgray"
                    }`}
                    key={index}
                  >
                    {numdate++}
                  </p>
                ) : data === 1 &&
                  new Date(`${mm} ${numdate} ${setyear - 543}`).getTime() >
                    new Date(lastDate).getTime() ? (
                  <p
                    className={`ml-2.5 border-2 w-20 h-14 rounded-lg mt-2.5 text-center justify-items-center pt-3 font-bold text-xl cursor-default ${
                      check === true && _isSelected
                        ? "border-barbie"
                        : "border-lightgray bg-lightgray"
                    }`}
                    key={index}
                  >
                    {numdate++}
                  </p>
                ) : _isSelected &&
                  check === true &&
                  new Date(`${mm} ${numdate} ${setyear - 543}`).getTime() >=
                    new Date(dates_brance[0].date).getTime() &&
                  new Date(`${mm} ${numdate} ${setyear - 543}`).getTime() <=
                    new Date(lastDate).getTime() ? (
                  <p
                    className={`ml-2.5 border-2 w-20 h-14 rounded-lg mt-2.5 text-center justify-items-center pt-3 font-bold text-xl cursor-default border-barbie`}
                    key={index}
                  >
                    {numdate++}
                  </p>
                ) : data === 1 &&
                  new Date(`${mm} ${numdate} ${setyear - 543}`).getTime() >=
                    new Date(dates_brance[0].date).getTime() &&
                  new Date(`${mm} ${numdate} ${setyear - 543}`).getTime() <=
                    new Date(lastDate).getTime() ? (
                  <p
                    onClick={() => onSelectedDate(value)}
                    value={selectedDate}
                    className={`ml-2.5 border-2 w-20 h-14 rounded-lg mt-2.5 text-center justify-items-center pt-3 font-bold text-xl cursor-pointer ${
                      !isSelected ? "border-lightgray" : "border-barbie"
                    }`}
                    key={index}
                  >
                    {numdate++}
                  </p>
                ) : (
                  <p
                    className="ml-2.5  w-20 h-14 rounded-lg mt-2.5"
                    key={index}
                  ></p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const showday = () => {
    return (
      <div className="flex flex-col justify-items-center font-font_Bd">
        <div className="flex">
          {day.map((day, index) => {
            return (
              <p
                key={index}
                className="font-bold text-xl ml-2.5 mt-7 w-20 h-14 rounded-lg text-center justify-items-center pt-3"
              >
                {day}
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const year = () => {
    let year = parseInt(numyear);
    for (let i = 0; i < 10; i++) {
      countyear[i] = year++;
    }
  };
  year();

  const onChangeMonth = (event) => {
    setmonthh(event);
    setcurrentdate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(setyear - 543);
      newDate.setMonth(monthh);
      newDate.setDate(today);
      return newDate;
    });

    setfirstDay((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(event);
      newDate.setFullYear(setyear - 543);
      return newDate.getDay();
    });
  };

  const onChangeYear = (event) => {
    const vyear = countyear[event];
    setsetyear(vyear);
    setcurrentdate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(vyear - 543);
      newDate.setMonth(monthh);
      newDate.setDate(today);
      return newDate;
    });

    setfirstDay((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(vyear - 543);
      newDate.setMonth(monthh);
      return newDate.getDay();
    });
  };

  const onSelectedDate = useCallback((event) => {
    if (check_typenormal) {
      setselectedDate([event]);
      _setselectedDate([event]);
    } else {
      setselectedDate((prevDates) => {
        if (!Array.isArray(prevDates)) prevDates = [];
        const dateExists = prevDates.some(
          (d) => d.getTime() === event.getTime()
        );
        const newDates = dateExists
          ? prevDates.filter((d) => d.getTime() !== event.getTime())
          : [...prevDates, event];
        return newDates;
      });
    }
  }, []);

  const onSubmit = () => {
    const dates = selectedDate.map((date) => {
      const USDate = new Date(date);
      const _date =
        USDate.getDate() < 10 ? `0${USDate.getDate()}` : USDate.getDate();
      const _month =
        USDate.getMonth() + 1 < 10
          ? `0${USDate.getMonth() + 1}`
          : USDate.getMonth() + 1;
      return `${USDate.getFullYear()}-${_month}-${_date}`;
    });

    let selectednew = []; // all new
    dates.map((d) => {
      selectednew.push({ dates: d, users: [] });
    });

    // datesusers // old

    let _date = []; // cancel dates
    const date = datesusers.filter((item) => !dates.includes(item.dates));
    date.map((d) => {
      _date.push(d.dates);
    });

    // date left
    const date_cancel = datesusers.filter(
      (item) => !_date.includes(item.dates)
    );

    // old dates
    let _dates = [];
    datesusers.map((d) => {
      _dates.push(d.dates);
    });

    // new dates
    const new_dates = selectednew.filter(
      (item) => !_dates.includes(item.dates)
    );

    if (new_dates.length !== 0 && date.length === 0) {
      const finaldates = [...datesusers, ...new_dates];
      dispatch(setdates_users(finaldates));
    }
    if (date.length !== 0 && new_dates.length === 0) {
      dispatch(setdates_users(date_cancel));
    }
    if (new_dates.length !== 0 && date.length !== 0) {
      const finaldates = [...date_cancel, ...new_dates]; // [...date_cancel, ...new_dates]
      dispatch(setdates_users(finaldates));
    }

    dispatch(
      getDataRounds({
        token,
        b_id: branch.branch_code_id,
        date_string: dates[0],
      })
    )
      .then((result) => {
        dispatch(setgetrounds(result.payload));
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(postOrgSelectedDate(dates));
    hideModal();
  };

  const onCancel = () => {
    setselectedDate((prev) => !prev);
    hideModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed border-2 bg-white border-lightgray rounded-3xl pl-8 pr-10">
        <div className="flex items-center mt-8 justify-between">
          <p className="font-bold text-xl font-font_Bd">เลือกวันนัดหมาย</p>
          <div className="flex">
            <Dropdown
              label={"เดือน"}
              value={month}
              onChange={onChangeMonth}
              valuedate={monthh}
            />
            <div className="ml-3"></div>
            <Dropdown
              label={"ปี"}
              value={countyear}
              onChange={onChangeYear}
              valuedate={numyear}
            />
          </div>
        </div>
        <div>
          {/* Show day */}
          {showday()}
          {/* Show date */}
          {showdate()}
        </div>
        <div className="mt-14 flex mb-10 justify-end">
          <ButtonStyle onClick={onCancel} label={"ยกเลิก"} type={"secondery"} />
          <ButtonStyle onClick={onSubmit} label={"ยืนยัน"} type={"binary"} />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
