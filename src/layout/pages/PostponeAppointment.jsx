import React, { useEffect, useState } from "react";
import ButtonStyle from "../../shared/components/ButtonStyle";
import CalendarModal from "../../shared/components/bookingDate/CalendarModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../shared/components/useCustom/useModal";
import {
  post_selectedDate,
  setgetDates_branch,
  setgetusers,
  deleteItems,
  setbranch,
  getDataPostpone,
  setappmPostpone,
  setselectRound,
} from "../../redux/slice/postsSlice";
import { THformatDate, sortedDates } from "../../shared/components/Functions";

const PostponeAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, openModal, closeModal } = useModal();

  const date = location.state.date;
  const data = location.state.value;
  const _datesusers = location.state._datesusers;

  const datesusers = useSelector((state) => state.posts.dates_users);
  const branch = useSelector((state) => state.posts.branch);
  const token = useSelector((state) => state.posts.gettoken);
  const getrounds = useSelector((state) => state.posts.getrounds);
  const selectRound = useSelector((state) => state.posts.selectRound);
  const appmpostpone = useSelector((state) => state.posts.appm_postpone);

  const appointment_code = () => {
    let arr = [];
    data.users.map((d) => {
      if (d.status !== "CANCEL") {
        arr.push(d.appointment_code);
      }
    });
    return arr;
  };

  const loadCalendar = () => {
    let body = { appointment_codes: appointment_code() };
    dispatch(getDataPostpone({ token, body }))
      .then((result) => {
        let dates = [];
        result.payload?.data.forEach((value) => {
          dates.push(value.date);
        });
        dispatch(setgetDates_branch(result.payload?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    if (event.target.value !== "") {
      dispatch(setbranch(event.target.value));
    }
  };

  const _isStatus = sortedDates(datesusers).map((s) => {
    return s.dates !== date;
  });

  let arr = _datesusers.map((a) => a.dates);
  const newDates = datesusers.filter((item) => !arr.includes(item.dates));

  const _isDate = sortedDates(datesusers).map((s, i) => {
    return new Date(s.dates).getTime() < new Date(date).getTime();
  });

  const check_postpone = sortedDates(datesusers).map((d) => {
    let check = false;
    if (d.users.length !== 0) {
      d.users.map((u) => {
        if (u.PostponedAppointment.length >= 2 && d.dates === date) {
          check = true;
        }
      });
    } else check = false;
    return check;
  });

  useEffect(() => {
    loadCalendar();
    if (selectRound.round !== null && appmpostpone.length === 0) {
      dispatch(setappmPostpone(data));
    }
  }, [branch]);

  const onClick = () => {
    if (datesusers.length !== 0) {
      navigate("/bookingdetail", {
        state: {
          check_typenormal: check_typenormal(),
          isPostpone: true,
        },
      });
    }
  };

  const onPage = (date) => {
    dispatch(post_selectedDate(date.dates)); // send date
    const arr = data.users.map((d) => {
      return d;
    });
    dispatch(setappmPostpone(data));
    dispatch(setgetusers(arr));
    navigate("/bookingtime", {
      state: {
        check: true,
        check_typenormal: check_typenormal(),
      },
    });
  };

  const onDelete = (date) => {
    dispatch(deleteItems(date.dates));
  };

  const onSelectedRound = (event) => {
    dispatch(setselectRound(event));
    if (appmpostpone.length === 0) {
      // dispatch(setappmPostpone(data));
    }
  };

  const showoption = () => {
    return (
      <>
        <select
          id="select"
          className="border border-lightgray text-sm text-darkgray font-font_Rg font-bold rounded-lg focus:ring-blue-500 w-[458px] p-2.5 dark:placeholder-gray-400"
          onChange={handleChange}
          value={branch}
          disabled={true}
        >
          <option value="">{branch.branch_name_th}</option>
        </select>
      </>
    );
  };

  const showSelectedDate = () => {
    return sortedDates(datesusers)?.map((value, index) => {
      const checkNew = newDates.some((c) => c.dates === value.dates);
      const _if =
        (!_isStatus[index] && checkNew) || (!checkNew && _isStatus[index]);

      const check = () => {
        if (check_postpone[index] === true) {
          return check_postpone[index];
        } else return _if;
      };

      return (
        <div
          key={index}
          className="border h-20 border-lightgray rounded-lg p-4 mb-3.5 flex"
        >
          <div className="font-font_Rg">
            <p className="font-bold font-font_Bd">
              {THformatDate(value.dates)}
            </p>
            <div className="flex">
              <p className="mr-1 mt-1 text-darkgray">จำนวนคน :</p>
              <p className="mt-1">{value.users.length} คน</p>
            </div>
          </div>
          <div className="flex ml-auto items-center font-font_Bd">
            <button
              onClick={() => onPage(value)}
              className={`mr-3 font-bold ${
                _isDate[index] ? "text-darkgray" : "text-barbie"
              }`}
              disabled={_isDate[index]}
            >
              เพิ่มแรงงาน
            </button>
            <button
              onClick={() => onDelete(value)}
              className={`font-bold ${
                check() ? "text-darkgray" : "text-second"
              }`}
              disabled={check()}
            >
              ลบรายการ
            </button>
          </div>
        </div>
      );
    });
  };

  const isUsers = datesusers.every((d) => {
    return d.users.length === 0;
  });

  const check_typenormal = () => {
    const check = selectRound.round !== null;
    return check;
  };

  const showrounds = () => {
    return (
      <div className="mt-36">
        <div className="flex">
          <p className="text-xl font-bold font-font_Bd">เลือกช่วงเวลา</p>
          <p className="text-second text-xl font-bold ml-1">*</p>
        </div>
        {getrounds.length === 0 ? (
          <div className="bg-lightgray rounded-lg h-10 mt-9 flex justify-center items-center ">
            <p className="font-font_Rg">
              "กรุณาเลือก 'สถานที่' และ 'วันนัดหมาย' ก่อนเลือกช่วงเวลา"
            </p>
          </div>
        ) : (
          <div className={`mt-9 grid grid-cols-3 grid-rows-1`}>
            <div className={`grid grid-cols-2 row-span-1 col-span-2 gap-4`}>
              {getrounds.map((round, index) => {
                let isSelected = false;
                if (selectRound !== undefined) {
                  isSelected = selectRound.round === round.round;
                }
                return (
                  <div key={index}>
                    <button
                      onClick={() => onSelectedRound(round)}
                      className={`border cursor-pointer col-span-2 ${
                        isSelected ? "border-barbie" : "border-lightgray"
                      } rounded-lg h-20 w-96 font-font_Bd flex justify-center items-center`}
                    >
                      {round.round}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* No appointment */
  const showMessage = () => {
    return datesusers.length === 0 ? (
      <div className="mt-20">
        <p className="text-center font-bold font-font_Bd text-base">
          ยังไม่มีการนัดหมาย
        </p>
        <p className="text-center text-base font-font_Rg">
          กด ‘เพิ่มวันนัดหมาย’ เพื่อทำการนัดหมายการออกใบอนุญาต
        </p>
      </div>
    ) : (
      ""
    );
  };

  return (
    <div>
      <div className="ml-40 mr-40 mt-40 pb-8">
        <div className="flex">
          <p className="text-xl font-bold font-font_Bd">เลือกสถานที่</p>
          <p className="text-second text-xl font-bold ml-1">*</p>
        </div>
        <div>
          <form className="max-w-sm">
            <div className="flex">
              <label
                htmlFor="select"
                className="block mb-2 text-sx text-darkgray font-font_Bd font-bold text-gray-900 mt-1.5"
              >
                สถานที่
              </label>
              <p className="text-second text-sx font-bold ml-1">*</p>
            </div>
            {showoption()}
          </form>
        </div>
        <div className="mt-16 flex items-center mb-8">
          <div className="flex">
            <p className="font-bold text-xl font-font_Bd">เลือกวันนัดหมาย</p>
            <p className="text-second text-xl font-bold ml-1">*</p>
          </div>
          <div className="ml-auto">
            <ButtonStyle
              onClick={openModal}
              type={"secondery-auto"}
              label={"เพิ่มวันนัดหมาย"}
            />
          </div>
        </div>
        {/* Show modal */}
        <CalendarModal
          isOpen={isOpen}
          hideModal={closeModal}
          check={true}
          check_typenormal={check_typenormal()}
        />
        {/* Date selected */}
        {showSelectedDate()}
        {showMessage()}
        {selectRound.round !== null && showrounds()}
        <div className="flex justify-end mt-24">
          <ButtonStyle
            onClick={onClick}
            label={"ถัดไป"}
            type={`${
              getrounds.length === 0
                ? isUsers
                  ? "disable"
                  : "binary"
                : isUsers || selectRound === undefined
                ? "disable"
                : "binary"
            }`}
            disabled={
              getrounds.length === 0
                ? isUsers
                : isUsers || selectRound === undefined
            }
          />
        </div>
        {/* footer */}
        <div className="mt-14 font-font_Rg">
          <p className="font-font_Bd mb-3">
            หากมีข้อสงสัยประการใด กรุณาติดต่อสอบถามข้อมูลเพิ่มเติมผ่านช่องทาง
            ต่อไปนี้
          </p>
          <a href="#" className="text-barbie">
            1. Chatbot
          </a>
          <p>2. Call Center เบอร์ 083-2345678</p>
          <p>3. E-mail : admin@eworkpermit.com</p>
          <p className="flex">
            อ่านข้อมูลเพิ่มเติมได้ที่เมนู
            <a href="#" className="text-barbie ml-1">
              บริการช่วยเหลือ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostponeAppointment;
