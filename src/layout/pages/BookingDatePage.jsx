import React, { useEffect, useState } from "react";
import ButtonStyle from "../../shared/components/ButtonStyle";
import CalendarModal from "../../shared/components/bookingDate/CalendarModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../shared/components/useCustom/useModal";
import {
  getDecrypt,
  getBranch,
  post_selectedDate,
  getCalendar,
  setgetDates_branch,
  setoption_branch,
  setgetusers,
  deleteItems,
  setbranch,
  setgetId,
  setgettoken,
  setselectRound,
} from "../../redux/slice/postsSlice";
import { THformatDate, sortedDates } from "../../shared/components/Functions";

const BookingDatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const { id } = useParams();

  const orgdates = useSelector((state) => state.posts.orgSelectedDate);
  const option_branch = useSelector((state) => state.posts.option_branch);
  const datesusers = useSelector((state) => state.posts.dates_users);
  const branch = useSelector((state) => state.posts.branch);
  const getrounds = useSelector((state) => state.posts.getrounds);
  const selectRound = useSelector((state) => state.posts.selectRound);
  const getusers = useSelector((state) => state.posts.getusers);

  const loadDecrypt = () => {
    dispatch(getDecrypt(id))
      .then((result) => {
        if (result.payload.already_booked === true) {
          return navigate("/bookingconfirm");
        }

        // get users
        // dispatch(setgetusers(result.payload.decrypted_data.list_users));
        if (Array.isArray(result.payload.decrypted_data.list_users)) {
          const updatedUsersList = result.payload.decrypted_data.list_users.map(
            (item) => ({
              user_id: item.user_id,
              prefix: item.prefix,
              first_name: item.first_name,
              last_name: item.last_name,
              nationality: item.nationality,
              birth_date: item.birth_date,
              passport_id: item.passport_id,
              form_id: item.form_id,
              middle_name: item.middle_name,
              type_id: result.payload.decrypted_data.type_id,
            })
          );
          dispatch(setgetusers(updatedUsersList));
        } else {
          console.error("Payload is not an array");
        }

        // get group_id type_id
        let obj = {
          group_id: result.payload.decrypted_data.group_id,
          type_id: result.payload.decrypted_data.type_id,
          last_date: result.payload.decrypted_data.last_date,
          workflowtype_id: result.payload.decrypted_data.workflowtype_id,
        };
        dispatch(setgetId(obj));

        // get branch id
        let branch = [];
        result.payload.decrypted_data?.branch_codelists.forEach((value) => {
          branch.push(value.branch_code);
        });

        // set branch id/name
        let body = { branch_codelist: branch };
        dispatch(getBranch({ token: id, body }))
          .then((result) => {
            if (Array.isArray(result.payload)) {
              dispatch(setoption_branch(result.payload));
            } else {
              console.error("Payload is not an array");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setgettoken(id));
  };

  const loadCalendar = () => {
    if (branch !== "") {
      dispatch(getCalendar({ token: id, id: branch.branch_code_id }))
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
    }
  };

  const handleChange = (event) => {
    if (event.target.value !== "") {
      const selectedIndex = event.target.value;
      const selectedBranch = option_branch[selectedIndex];
      dispatch(setbranch(selectedBranch));
    }
  };

  const isUsers = datesusers.every((d) => {
    return d.users.length === 0;
  });

  useEffect(() => {
    loadDecrypt();
    loadCalendar();
  }, [branch]);

  const onClick = () => {
    if (datesusers.length !== 0) {
      navigate("/bookingdetail", {
        state: {
          check_typenormal: check_typenormal(),
          isPostpone: false,
        },
      });
    }
  };

  const onPage = (date) => {
    dispatch(post_selectedDate(date));
    navigate("/bookingtime", {
      state: {
        check: undefined,
        check_typenormal: check_typenormal(),
      },
    });
  };

  const onDelete = (date) => {
    dispatch(deleteItems(date));
  };

  const onSelectedRound = (event) => {
    dispatch(setselectRound(event));
  };

  const showoption = () => {
    return (
      <>
        <select
          id="select"
          className="border border-lightgray text-sm text-darkgray font-font_Rg font-bold rounded-lg focus:ring-blue-500 w-[458px] p-2.5 dark:placeholder-gray-400"
          onChange={handleChange}
        >
          <option
            className={`${branch !== "" ? "hidden" : ""} `}
            disabled={branch !== ""}
            value=""
          >
            กรุณาเลือกสถานที่
          </option>
          {option_branch.map((value, index) => (
            <option className="font-font_Rg" key={index} value={index}>
              {value.branch_name_th}
            </option>
          ))}
        </select>
      </>
    );
  };

  const showSelectedDate = () => {
    return sortedDates(orgdates)?.map((value, index) => {
      const num = datesusers?.find((d) => d.dates === value);
      return (
        <div
          key={index}
          className="border h-20 border-lightgray rounded-lg p-4 mb-3.5 flex"
        >
          <div className="font-font_Rg">
            <p className="font-bold font-font_Bd">{THformatDate(value)}</p>
            <div className="flex">
              <p className="mr-1 mt-1 text-darkgray">จำนวนคน :</p>
              <p className="mt-1">
                {datesusers.length !== 0 ? num.users?.length : 0} คน
              </p>
            </div>
          </div>
          <div className="flex ml-auto items-center font-font_Bd">
            <button
              onClick={() => onPage(value)}
              className="mr-3 text-barbie font-bold"
            >
              เพิ่มแรงงาน
            </button>
            <button
              onClick={() => onDelete(value)}
              className="text-second font-bold"
            >
              ลบรายการ
            </button>
          </div>
        </div>
      );
    });
  };

  const check_typenormal = () => {
    const check =
      Array.isArray(getusers) &&
      getusers.length !== 0 &&
      getusers[0].type_id === "NORMAL";
    return check;
  };

  const rows = [];
  for (let i = 0; i < getrounds.length; i += 2) {
    rows.push(getrounds.slice(i, i + 2));
  }

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
          <div className="flex flex-col">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-start">
                {row.map((round, index) => {
                  let isSelected = false;
                  if (selectRound !== undefined) {
                    isSelected = selectRound.round === round.round;
                  }
                  return (
                    <div key={index} className="m-2">
                      <button
                        onClick={() => onSelectedRound(round)}
                        className={`border cursor-pointer h-20 w-96 ${
                          isSelected ? "border-barbie" : "border-lightgray"
                        } rounded-lg font-font_Bd flex justify-center items-center`}
                      >
                        {round.round}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* No appointment */
  const showMessage = () => {
    return (
      orgdates.length === 0 && (
        <div className="mt-20">
          <p className="text-center font-bold font-font_Bd text-base">
            ยังไม่มีการนัดหมาย
          </p>
          <p className="text-center text-base font-font_Rg">
            กด ‘เพิ่มวันนัดหมาย’ เพื่อทำการนัดหมายการออกใบอนุญาต
          </p>
        </div>
      )
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
          check_typenormal={check_typenormal()}
        />
        {/* Date selected */}
        {showSelectedDate()}
        {showMessage()}
        {/* rounds */}
        {check_typenormal() && showrounds()}
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

export default BookingDatePage;
