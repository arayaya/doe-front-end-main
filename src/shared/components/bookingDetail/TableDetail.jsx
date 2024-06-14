import React, { useEffect, useState } from "react";
import ButtonStyle from "../ButtonStyle";
import { THformatDate, sortedDates } from "../Functions";

const TableDetail = ({
  datesusers,
  showbranch,
  status,
  onClick,
  onPrint,
  onPostpone,
  round,
  showround,
}) => {
  const tHeader = ["หมายเลขนัดหมาย", "ชื่อคนต่างด้าว", "เลขที่หนังสือเดินทาง"];

  const _isStatus = sortedDates(datesusers).map((s) => {
    let status;
    s.users.map((u) => {
      status = u.status;
    });
    return status;
  });

  const check_postpone = sortedDates(datesusers).map((s) => {
    let check;
    s.users.map((u) => {
      if (status) {
        if (u.PostponedAppointment.length < 2) {
          check = true;
        }
      }
    });
    return check;
  });

  return (
    <div>
      {sortedDates(datesusers).map((item, i) => {
        if (item.users.length > 0) {
          let hasNextItem = item.users.length;
          let showline = true;
          // ***** EXPIRED *****
          const check = _isStatus[i] !== "WAITING";
          // const check = _isStatus[i] === "CANCEL";
          return (
            <div key={i}>
              <div className="border-2 items-center justify-between flex border-lightgray rounded-t-xl h-20 bg-lightbarbie">
                <div className="flex ml-6">
                  <div className="flex">
                    <p className="font-bold mr-2 font-font_Bd">สถานที่</p>
                    <p className="font-font_Rg">{showbranch.branch_name_th}</p>
                  </div>
                  <div className="flex ml-9">
                    <p className="font-bold font-font_Bd mr-2">วันที่</p>
                    <p className="font-font_Rg">{THformatDate(item.dates)}</p>
                  </div>
                  {round && (
                    <div className="flex ml-9">
                      <p className="font-bold font-font_Bd mr-2">เวลา</p>
                      <p className="font-font_Rg">
                        {showround !== undefined ? showround : item.round}
                      </p>
                    </div>
                  )}
                </div>
                {status && (
                  <div className="flex mr-6">
                    <div className="mr-2">
                      <ButtonStyle
                        label={"พิมพ์แบบฟอร์มการนัดหมาย"}
                        type={check ? "disable-auto" : "secondery-auto"}
                        onClick={() => onPrint(item.dates, item)}
                        disabled={check}
                      />
                    </div>
                    <div className="mr-2">
                      <ButtonStyle
                        label={"เลื่อนนัดหมาย"}
                        onClick={() => onPostpone(item.dates, item)}
                        type={
                          check || !check_postpone[i] === true
                            ? "disable-auto"
                            : "secondery-auto"
                        }
                        disabled={check || !check_postpone[i] === true}
                      />
                    </div>
                    <div>
                      <ButtonStyle
                        label={"ยกเลิกนัดหมาย"}
                        type={check ? "disable-auto" : "seconderyR-l"}
                        onClick={() => onClick(item)}
                        disabled={check}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="border-lightgray border-x-2 border-b-2 rounded-b-xl h-auto pr-8 pt-8 pl-8 pb-8 mb-8">
                {item.users.map((user) => {
                  hasNextItem--;
                  if (hasNextItem === 0) {
                    showline = false;
                  }
                  const check_status = user.status === "CANCEL";
                  return (
                    <div>
                      <div className="flex justify-between items-start">
                        <div key={i} className="flex">
                          <div className="mr-12 font-font_Rg">
                            {tHeader.map((header, i) => {
                              return <p key={i}>{header}</p>;
                            })}
                          </div>
                          <div>
                            <p className="font-font_Rg">
                              {user.appointment_code !== undefined
                                ? user.appointment_code
                                : "-"}
                            </p>
                            <p className="font-font_Rg">{user.first_name}</p>
                            <p className="font-font_Rg">{user.passport_id}</p>
                          </div>
                        </div>
                        {user.PostponedAppointment !== undefined && (
                          <div>
                            {user.PostponedAppointment.length !== 0 && (
                              <div>
                                {user.PostponedAppointment.map((p) => {
                                  return (
                                    <p className="font-font_Rg text-second">
                                      เลื่อนครั้งที่ {p.count_postpone}:
                                      จากวันที่{" "}
                                      {THformatDate(p.latest_appointment_date)}{" "}
                                      เป็นวันที่{" "}
                                      {THformatDate(p.appointment_date)}
                                    </p>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                        {status && (
                          <button
                            className={`border p-1 rounded ${
                              check_status
                                ? "border-lightgray"
                                : "border-barbie rounded cursor-pointer"
                            }`}
                            onClick={() => onPrint(item.dates, user)}
                            disabled={check_status}
                          >
                            <img
                              className="w-5 h-5 disable"
                              src={`${
                                check_status
                                  ? "../img/_print.png"
                                  : "../img/print.png"
                              }`}
                              alt="print.png"
                            />
                          </button>
                        )}
                      </div>
                      {showline && (
                        <div className="border-t-2 border-lightgray mt-8 mb-8"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TableDetail;
