import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

function AppointmentForm() {
  const location = useLocation();
  const value = location.state.value;

  useEffect(() => {
    setTimeout(() => window.print(), 200);
  }, []);

  return (
    <div>
      {value.map((item, index) => {
        return (
          <div key={index}>
            <div className="pl-6 pr-6 pt-0 h-a4 absolute">
              <div className="flex justify-between">
                <img
                  className="w-48 opacity-50"
                  src="../img/DOE.png"
                  alt="DOE.png"
                />
                <div className="mt-10 mr-10 text-darkgray">
                  <p className="font-bold font-font_Bd">
                    กรมจัดหางาน กระทรวงแรงงาน
                  </p>
                  <p className="font-font_Rg">ถนนมิตรไมตรี แขวงดินแดง</p>
                  <p className="font-font_Rg">เขตดินแดง กรุงเทพฯ 10400</p>
                </div>
              </div>
              <div>
                <h1 className="text-center font-bold font-font_Bd text-2xl">
                  ใบนัดหมาย / Appointment Form
                </h1>
              </div>
              <div className="grid grid-cols-12">
                <div className="mt-10 grid grid-cols-12 col-span-12">
                  <div className="col-span-6 grid grid-cols-6 grid-rows-4">
                    <div className="grid row-span-4 col-span-2">
                      <p className="font-bold font-font_Bd">ชื่อ-สกุล</p>
                      <p className="font-font_Rg">Name</p>
                      <p className="font-bold font-font_Bd">
                        เลขที่หนังสือเดินทาง
                      </p>
                      <p className="font-font_Rg">Passport No.</p>
                    </div>
                    <div className="col-span-4 row-span-2 font-font_Rg">
                      <p>{item.name}</p>
                    </div>
                    <div className="col-span-4 row-span-2 font-font_Rg">
                      <p>{item.passport_id}</p>
                    </div>
                  </div>
                  <div className="col-span-6 grid grid-cols-6">
                    <div className="col-end-4 col-span-2">
                      <p className="font-bold font-font_Bd">สัญชาติ</p>
                      <p className="font-font_Rg">Nationality</p>
                    </div>
                    <div className="col-span-1 font-font_Rg">
                      <p>{item.nationality}</p>
                      <p>{item.nationality}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 col-span-12">
                  <h2 className="font-bold font-font_Bd text-x">
                    รายละเอียดการนัดหมาย (Appointment Detail)
                  </h2>
                </div>
                <div className="grid grid-cols-12 col-span-12">
                  <div className="col-span-6 grid grid-cols-6">
                    <div className="col-span-2">
                      <p className="font-bold font-font_Bd">วันที่นัดหมาย</p>
                      <p className="font-font_Rg">Date</p>
                      <p className="font-bold font-font_Bd">เวลานัดหมาย</p>
                      <p className="font-font_Rg">Time</p>
                      <p className="font-bold font-font_Bd">สถานที่</p>
                      <p className="font-font_Rg">Location</p>
                      <p className="font-bold font-font_Bd">ประเภทบริการ</p>
                      <p className="font-font_Rg">Service type</p>
                    </div>
                    <div className="col-span-4 font-font_Rg">
                      <p>{item.THdate}</p>
                      <p>{item.USdate}</p>
                      <p>-</p>
                      <p>-</p>
                      <p>{item.branch_name}</p>
                      <p>Sample Work Permit Service Center</p>
                      <p>ออกใบอนุญาตเข้าทำงานภายในประเทศ</p>
                      <p>Work Permit Request</p>
                    </div>
                  </div>
                  <div className="col-span-6 grid grid-cols-6">
                    <div className="col-end-4 col-span-2">
                      <p className="font-bold font-font_Bd">เลขที่นัดหมาย</p>
                      <p className="font-font_Rg">Appointment No.</p>
                    </div>
                    <div className="col-span-2 grid grid-rows-4">
                      <div className="row-span-1 font-font_Rg">
                        <p>{item.appointment_code}</p>
                      </div>
                      <div className="row-span-3 mt-16 absolute font-font_Rg">
                        <p className="font-font_Bd mb-1">
                          QR Code: Appointment
                        </p>
                        <QRCode
                          title="Appointment No."
                          value={item.appointment_code}
                          className="w-40 h-40"
                        />
                        <p className="mt-3">
                          <span className="font-font_Bd">Ref No:</span>{" "}
                          {item.appointment_code}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-second mt-20">
                <p className="font-bold font-font_Bd">หมายเหตุ (Remark)</p>
                <div className="ml-10 text-sm font-font_Rg">
                  <ul className="list-disc">
                    <li>กรุณามาก่อนเวลานัด 45 นาที</li>
                    <p>Please arrive 45 minutes before your appointment time</p>
                    <li>
                      ผู้ใช้บริการจะต้องใช้บริการในช่วงเวลาที่จองไว้หรือตามช่วงเวลาที่กำหนดเท่านั้นเพื่อเป็นการรักษาผลประโยชน์ให้แก่ผู้ใช้บริการรายอื่น
                    </li>
                    <p>
                      Your must use the service within the reserved time slot or
                      as scheduled only, in order to maintain the benefits for
                      other people
                    </p>
                    <li>กรุณาเตรียมใบนัดหมายเพื่อเข้ารับบริการในวันนัดหมาย</li>
                    <p>
                      Please prepare the appointment slip to recive service on
                      the scheduled day
                    </p>
                    <li>
                      กรุณาเตรียมหนังสือเดินทาง
                      หรือเอกสารยืนยันตัวตนที่ตรงกับเอกสารยื่นคำร้อง
                      และยังไใ่หมดอายุ
                    </li>
                    <p>
                      Please prepare your passport or identify documents that
                      match the submitted application documents and are not
                      expired
                    </p>
                    <li>
                      กรุณางดใส่คอนแทกด์แลนส์ หมวก หรือสิ่งใด
                      ที่ส่งผลต่อการเก็บข้อมูลชีวมาตร
                    </li>
                    <p>
                      Please refrain from wearing contact lenses, hats, or
                      anything that affects biometric data collection
                    </p>
                    <li>
                      ผู้ใช้บริการจะต้องนัดหมาย หรือ
                      เลื่อนนัดหมายล่วงหน้าอย่างน้อย 1 วันทำการ
                    </li>
                    <p>
                      You must make or reschedule appointments at least 1
                      business day in advance
                    </p>
                    <li>
                      ถ้าหากไม่มาตามเวลานัดหมายโดยไม่มีการแจ้งล่วงหน้า
                      ให้ถือว่าสละสิทธิ์การจองครั้งนั้น
                    </li>
                    <p>
                      If you do not arrive on time for the appointment without
                      prior notice, it will be considered forfeiting the booking
                      rights for that session
                    </p>
                    <li>
                      ผู้ใช้บริการจะต้องปฏิบัติตามเงื่อนไขการใช้อุปกรณ์อย่างเคร่งครัดและระมัดระวัง
                      หากพบว่ามีการใช้อุปกรณ์ผิดวิธี
                      ซึ่งก่อให้เกิดความเสียหายจากการใช้งานโดยผู้ใช้บริการ
                      ผู้ใช้บริการจะต้องรับผิดชอบค่าใช้จ่ายในความเสียหายที่เกิดขึ้นทั้งหมด
                      ตามความเป็นจริง
                    </li>
                    <p>
                      You must strictly adhere to the terms of equipment usage
                      and exercise caution. If it is found that the equipment is
                      used inproperly, resulting in damage caused by the service
                      user's action, the service user shall be responsible all
                      expenses incurred
                    </p>
                    <li>
                      กรณีไม่ปฏิบัติตามระเบียบการใช้บริการ
                      จะดำเนินการพิจารณาตกเตือน
                      หรือพิจารณาตัดสิทธิ์การเข้ารับบริการ
                    </li>
                    <p>
                      Incase of non-complaince with the service regulations, a
                      warning will be issued, or right to receive service may be
                      revoked
                    </p>
                  </ul>
                </div>
              </div>
            </div>
            <div className="margin-auto">
              <img className="" src="../img/_DOE.png" alt="_DOE.png" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AppointmentForm;
