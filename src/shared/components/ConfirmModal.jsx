import React from "react";
import ButtonStyle from "./ButtonStyle";

function ConfirmModal({
  dates,
  branch_name,
  isOpen,
  hideModal,
  onSubmit,
  header,
  text,
  after_date,
}) {
  if (!isOpen) {
    return null;
  }

  let arr = [],
    dd;
  dates?.map((d) => {
    if (d !== undefined) {
      arr.push(d);
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white border-2 border-lightgray rounded-3xl pt-12 w-auto h-auto pb-6 pr-7 pl-7">
        <p className="text-center font-bold text-xl font-font_Bd">{header}</p>
        <div className="flex flex-col items-center text-center mt-9 font-font_Rg">
          <p>
            {text} {branch_name}
          </p>
          <div className="inline-flex">
            <p>{after_date !== undefined ? "จากวันที่" : ""}&nbsp;</p>
            {arr.map((a, index) => {
              dd = `${a}`;
              if (index < arr.length - 1) {
                dd += ", ";
              }
              return <p key={index}>{dd}&nbsp;</p>;
            })}
            {after_date !== undefined ? (
              <div className="flex">
                <p>เป็นวันที่&nbsp;</p>
                {after_date.map((d, index) => {
                  dd = `${d}`;
                  if (index < after_date.length - 1) {
                    dd += ", ";
                  }
                  return <p key={index}>{dd}&nbsp;</p>;
                })}
              </div>
            ) : (
              ""
            )}
            <p>หรือไม่?</p>
          </div>
        </div>
        <div className="flex mt-12 justify-center">
          <div className="mr-5">
            <ButtonStyle
              onClick={hideModal}
              label={"ยกเลิก"}
              type={"secondery-xl"}
            />
          </div>
          <div>
            <ButtonStyle
              onClick={onSubmit}
              label={"ยืนยัน"}
              type={"binary-xl"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
