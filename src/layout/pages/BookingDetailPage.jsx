import React, { useEffect, useState } from "react";
import TableDetail from "../../shared/components/bookingDetail/TableDetail.jsx";
import ButtonStyle from "../../shared/components/ButtonStyle.jsx";
import useModal from "../../shared/components/useCustom/useModal.jsx";
import ConfirmModal from "../../shared/components/ConfirmModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { abbrMonth } from "../../shared/components/bookingDate/SetData.jsx";
import {
  getDecrypt,
  makeAppointment,
  postponeAppointment,
  postponeAppointmentNormal,
} from "../../redux/slice/postsSlice.js";
import { useLocation, useNavigate } from "react-router-dom";
import {
  THformatDate,
  sortedDates,
} from "../../shared/components/Functions.jsx";

const BookingDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenPostpone,
    openModal: openModalPostpone,
    closeModal: closeModalPostpone,
  } = useModal();
  const {
    isOpen: isOpenPostponeNormal,
    openModal: openModalPostponeNormal,
    closeModal: closeModalPostponeNormal,
  } = useModal();

  const check_typenormal = location.state.check_typenormal;
  const isPostpone = location.state.isPostpone;
  const datesusers = useSelector((state) => state.posts.dates_users);
  const showbranch = useSelector((state) => state.posts.branch);
  const _id = useSelector((state) => state.posts.getId);
  const token = useSelector((state) => state.posts.gettoken);
  const appmpostpone = useSelector((state) => state.posts.appm_postpone); // old
  const round = useSelector((state) => state.posts.selectRound); // new

  const manageData = () => {
    let arr = [];
    datesusers.forEach((data) => {
      if (data.users.length > 0) {
        data.users.forEach((user) => {
          let obj = {};
          if (round !== undefined) {
            obj = {
              form_id: user.form_id,
              user_id: user.user_id,
              prefix: user.prefix,
              first_name: user.first_name,
              middle_name: user.middle_name,
              last_name: user.last_name,
              nationality: user.nationality,
              passport_id: user.passport_id,
              birth_date: user.birth_date,
              appointment_date: data.dates,
              round: round.round,
            };
          } else {
            obj = {
              form_id: user.form_id,
              user_id: user.user_id,
              prefix: user.prefix,
              first_name: user.first_name,
              middle_name: user.middle_name,
              last_name: user.last_name,
              nationality: user.nationality,
              passport_id: user.passport_id,
              birth_date: user.birth_date,
              appointment_date: data.dates,
            };
          }
          arr.push(obj);
        });
      }
    });

    let obj = {
      branchId: showbranch.branch_code_id,
      type_id: _id.type_id,
      group_id: _id.group_id,
      last_date: _id.last_date,
      workflowtype_id: _id.workflowtype_id,
      list_users: arr,
    };
    return obj;
  };

  const manageData_postpone = () => {
    let arr = [];
    let obj = {};
    if (appmpostpone.length !== 0) {
      datesusers.forEach((data) => {
        if (data.users.length > 0) {
          data.users.forEach((user) => {
            const match = appmpostpone.users.find(
              (a) => a.appointment_code === user.appointment_code
            );
            if (match !== undefined) {
              obj = {
                appointment_code: user.appointment_code,
                after_date: data.dates,
              };
              arr.push(obj);
            }
          });
        }
      });
      return (obj = { appointments: arr, before_date: appmpostpone.dates });
    }
  };

  const manageData_postponeNormal = () => {
    let arr = [];
    let obj = {};
    if (appmpostpone.length !== 0) {
      datesusers.forEach((data) => {
        if (data.users.length > 0) {
          data.users.forEach((user) => {
            const match = appmpostpone.users.find(
              (a) => a.appointment_code === user.appointment_code
            );
            if (match !== undefined) {
              obj = {
                appointment_codes: user.appointment_code,
              };
              arr.push(user.appointment_code);
            }
          });
        }
        obj = {
          appointment_codes: arr,
          after_date: data.dates,
          before_date: appmpostpone.dates,
          before_roundId: appmpostpone.roundId,
          after_roundId: round.roundId,
        };
      });
      return obj;
    }
  };

  const after_date = () => {
    if (appmpostpone.length !== 0) {
      let arr = [];
      let date = "";
      manageData_postpone().appointments.map((a, i) => {
        if (a.after_date !== manageData_postpone().before_date) {
          if (date !== a.after_date) {
            arr.push(
              `${THformatDate(a.after_date)} ${
                check_typenormal ? `เวลา ${round.round}` : ""
              }`
            );
          }
          date = a.after_date;
        } else if (round !== undefined) {
          if (date !== a.after_date) {
            arr.push(
              `${THformatDate(a.after_date)} ${
                check_typenormal ? `เวลา ${round.round}` : ""
              }`
            );
          }
          date = a.after_date;
        }
      });
      return arr;
    }
  };

  const dates = sortedDates(datesusers).map((d) => {
    if (d.users.length > 0) {
      const thDate = new Date(d.dates);
      const show = `${thDate.getDate()} ${abbrMonth[thDate.getMonth()]} ${
        thDate.getFullYear() + 543
      }`;
      return `${show} ${check_typenormal ? `เวลา ${round.round}` : ""}`;
    }
  });

  const onSubmit = () => {
    dispatch(makeAppointment({ token, body: manageData() }))
      .then((result) => {
        // loadDecrypt();
        navigate("/bookingconfirm");
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
  };

  const onSubmit_postpone = () => {
    dispatch(postponeAppointment({ token, body: manageData_postpone() }))
      .then(() => {
        // loadDecrypt();
        navigate("/bookingconfirm");
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
  };

  const onSubmit_postponeNormal = () => {
    dispatch(
      postponeAppointmentNormal({ token, body: manageData_postponeNormal() })
    )
      .then(() => {
        // loadDecrypt();
        navigate("/bookingconfirm");
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
  };

  const loadDecrypt = () => {
    dispatch(getDecrypt(!token ? id : token))
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDecrypt();
  }, []);

  return (
    <div className="ml-40 mr-40 mt-40">
      <p className="font-bold mb-4 ml-8 font-font_Bd">การนัดหมาย</p>
      <div>
        <TableDetail
          status={""}
          round={check_typenormal} // round === undefined ? false : round.round !== null
          showround={
            round === undefined ? false : round.round !== null && round.round
          }
          datesusers={datesusers}
          showbranch={showbranch}
        />
      </div>
      <div className="mb-8 flex justify-end">
        <ButtonStyle
          onClick={
            !isPostpone
              ? openModal
              : round.round === null
              ? openModalPostpone
              : openModalPostponeNormal
          }
          label={"ยืนยันการนัดหมาย"}
          type={"binary-xl"}
        />
      </div>
      <ConfirmModal
        dates={dates}
        onSubmit={onSubmit}
        branch_name={showbranch.branch_name_th}
        isOpen={isOpen}
        hideModal={closeModal}
        header={"ยืนยันการนัดหมาย"}
        text={`คุณยืนยันการนัดหมายที่`}
      />
      <ConfirmModal
        dates={
          appmpostpone.length !== 0
            ? [THformatDate(manageData_postpone().before_date)]
            : dates
        }
        after_date={after_date()}
        onSubmit={onSubmit_postpone}
        branch_name={showbranch.branch_name_th}
        isOpen={isOpenPostpone}
        hideModal={closeModalPostpone}
        header={"เลื่อนนัดหมาย"}
        text={"คุณต้องการเลื่อนนัดหมายที่"}
      />
      <ConfirmModal
        dates={
          appmpostpone.length !== 0
            ? [
                `${THformatDate(manageData_postpone().before_date)} เวลา ${
                  appmpostpone.round
                }`,
              ]
            : dates
        } 
        after_date={after_date()}
        onSubmit={onSubmit_postponeNormal}
        branch_name={showbranch.branch_name_th}
        isOpen={isOpenPostponeNormal}
        hideModal={closeModalPostponeNormal}
        header={"เลื่อนนัดหมาย"}
        text={"คุณต้องการเลื่อนนัดหมายที่"}
      />
    </div>
  );
};

export default BookingDetailPage;
