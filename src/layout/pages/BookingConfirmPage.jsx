import React, { useEffect, useState } from "react";
import {
  cancelAppointment,
  getBranch,
  getDataRounds,
  getDecrypt,
  setappmPostpone,
  setbranch,
  setdates_users,
  setform,
  setgetId,
  setgetrounds,
  setselectRound,
} from "../../redux/slice/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../shared/components/useCustom/useModal";
import TableDetail from "../../shared/components/bookingDetail/TableDetail";
import ButtonStyle from "../../shared/components/ButtonStyle";
import ConfirmModal from "../../shared/components/ConfirmModal";
import { abbrMonth } from "../../shared/components/bookingDate/SetData";
import { useNavigate } from "react-router-dom";
import {
  THformatDate,
  USformatDate,
  sortedDates,
} from "../../shared/components/Functions";

const BookingConfirmPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const datesusers = useSelector((state) => state.posts.dates_users);
  const token = useSelector((state) => state.posts.gettoken);
  const showbranch = useSelector((state) => state.posts.branch);
  const round = useSelector((state) => state.posts.selectRound);

  const [isBooked, setisBooked] = useState(false);
  const [dates, setdates] = useState([]);
  const [users, setusers] = useState([]);
  let mapping = [];

  const loadDecrypt = () => {
    dispatch(getDecrypt(token))
      .then((result) => {
        setisBooked(result.payload.already_booked);
        let branch_id;
        result.payload.appointments.forEach((a, index) => {
          let arr = [];
          let obj = {};
          a.list_appointments.forEach((item) => {
            obj = {
              PostponedAppointment: item.PostponedAppointment,
              appointment_code: item.appointment_code,
              status: item.status,
              form_id: item.form_id,
              user_id: item.user_id,
              prefix: item.user_prefix,
              first_name: item.user_fname,
              middle_name: item.user_mname,
              last_name: item.user_lname,
              nationality: item.user_nationality,
              passport_id: item.passport_id,
              birth_date: item.user_birthdate,
              type_id: result.payload.decrypted_data.type_id,
            };
            arr.push(obj);
            branch_id = item.branchId;
          });

          obj = {
            dates: a.appointment_date,
            round: a.list_appointments[0].roundName,
            roundId: a.list_appointments[0].roundId,
            users: arr,
          };
          mapping.push(obj);
        });
        dispatch(setdates_users(mapping));
        dispatch(setappmPostpone([]));
        // get group_id type_id
        let obj = {
          group_id: result.payload.decrypted_data.group_id,
          type_id: result.payload.decrypted_data.type_id,
        };
        dispatch(setgetId(obj));

        // get branch id
        let branch = [];
        branch.push(branch_id);
        let body = { branch_codelist: branch };
        dispatch(getBranch({ token, body }))
          .then((result) => {
            const _branch = result.payload.find(
              (id) => id.branch_code_id === branch_id
            );
            dispatch(setbranch(_branch));
          })
          .catch((err) => {
            console.log(err);
          });

        // get round
        if (
          result.payload.appointments[0].list_appointments[0].roundName !==
          undefined
        ) {
          dispatch(
            getDataRounds({
              token,
              b_id: branch_id,
              date_string: result.payload.appointments[0].appointment_date,
            })
          )
            .then((rounds) => {
              dispatch(setgetrounds(rounds.payload));
              dispatch(
                setselectRound({
                  round:
                    result.payload.appointments[0].list_appointments[0]
                      .roundName,
                  roundId:
                    result.payload.appointments[0].list_appointments[0].roundId,
                })
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // round === undefined ? false : round.round !== null
  const showConfirm = (event) => {
    let arr = [];
    const thDate = new Date(event.dates);
    const show = `${thDate.getDate()} ${abbrMonth[thDate.getMonth()]} ${
      thDate.getFullYear() + 543
    }`;
    arr.push(
      `${show} ${
        round !== undefined ? "" : round.round !== null && `เวลา ${round.round}`
      }`
    );
    setusers(event);
    setdates(arr);
    openModal();
  };

  const onCancel = () => {
    const arr = users.users.map((e) => {
      return e.appointment_code;
    });
    let body = { appointment_codes: arr };

    dispatch(cancelAppointment({ token, body }))
      .then(() => {
        closeModal();
        return loadDecrypt();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _cancel = datesusers.every((c) => {
    return c.users.every((u) => {
      return u.status === "CANCEL";
    });
  });

  const onPrint = (date, event) => {
    const check = Array.isArray(event.users);
    const THdate = THformatDate(date);
    const USdate = USformatDate(date);
    let arr = [];
    if (check) {
      event.users.map((e) => {
        let obj = {};
        obj = {
          name: `${e.first_name} ${e.middle_name} ${e.last_name}`,
          passport_id: e.passport_id,
          nationality: e.nationality,
          THdate: THdate,
          USdate: USdate,
          branch_name: showbranch.branch_name_th,
          appointment_code: e.appointment_code,
        };
        arr.push(obj);
      });
    } else {
      let obj = {};
      obj = {
        name: `${event.first_name} ${event.middle_name} ${event.last_name}`,
        passport_id: event.passport_id,
        nationality: event.nationality,
        THdate: THdate,
        USdate: USdate,
        branch_name: showbranch.branch_name_th,
        appointment_code: event.appointment_code,
      };
      arr.push(obj);
    }

    dispatch(setform(arr));
    navigate("/appointmentform", {
      state: {
        value: arr,
      },
    });
  };

  const _isStatus = sortedDates(datesusers).map((s) => {
    let status;
    s.users.map((u) => {
      status = u.status;
    });
    return status;
  });

  const _onPrint = () => {
    let arr = [];
    sortedDates(datesusers).map((d, i) => {
      let obj = {};
      const THdate = THformatDate(d.dates);
      const USdate = USformatDate(d.dates);
      d.users.map((u) => {
        if (u.status !== "CANCEL") {
          obj = {
            name: `${u.first_name} ${u.middle_name} ${u.last_name}`,
            passport_id: u.passport_id,
            nationality: u.nationality,
            THdate: THdate,
            USdate: USdate,
            branch_name: showbranch.branch_name_th,
            appointment_code: u.appointment_code,
          };
          arr.push(obj);
        }
      });
    });
    navigate("/appointmentform", {
      state: {
        value: arr,
      },
    });
  };

  const onPostpone = (date, event) => {
    navigate("/postponeappointment", {
      state: {
        date: date,
        value: event,
        _datesusers: datesusers,
      },
    });
  };

  useEffect(() => {
    loadDecrypt();
  }, []);

  return (
    <div className="ml-40 mr-40 mt-40">
      <div className="flex justify-end">
        <ButtonStyle
          label={"พิมพ์แบบฟอร์มการนัดหมายทั้งหมด"}
          type={_cancel === true ? "disable-auto" : "secondery-auto"}
          disabled={_cancel}
          onClick={_onPrint}
        />
      </div>
      <p className="font-bold mb-4 ml-8 font-font_Bd">การนัดหมาย</p>
      <div>
        <TableDetail
          status={isBooked}
          round={round === undefined ? false : round.round !== null}
          datesusers={datesusers}
          showbranch={showbranch}
          onClick={showConfirm}
          onPrint={onPrint}
          onPostpone={onPostpone}
        />
      </div>
      <ConfirmModal
        dates={dates}
        onSubmit={onCancel}
        branch_name={showbranch.branch_name_th}
        isOpen={isOpen}
        hideModal={closeModal}
        header={"ยกเลิกนัดหมาย"}
        text={"คุณต้องการยกเลิกนัดหมายที่"}
      />
    </div>
  );
};

export default BookingConfirmPage;
