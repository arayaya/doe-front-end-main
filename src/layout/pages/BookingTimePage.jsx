import React, { useEffect, useMemo, useState } from "react";

import ButtonStyle from "../../shared/components/ButtonStyle";
import { TablePagination } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useGetdata from "../../shared/components/useCustom/useGetdata";
import mockup from "../../data/mockup.json";
import { setdates_users } from "../../redux/slice/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { THformatDate } from "../../shared/components/Functions";

const BookingTimePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { getData } = useGetdata(mockup);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkUser, setCheckUser] = useState([]);
  const check_postpone = location.state.check;
  const check_typenormal = location.state.check_typenormal;

  const dates_brance = useSelector((state) => state.posts.getDates_branch);
  const showbranch = useSelector((state) => state.posts.branch);
  const dates = useSelector((state) => state.posts.selectedDate);
  const users = useSelector((state) => state.posts.getusers); // วันที่เลื่อน
  const datesusers = useSelector((state) => state.posts.dates_users);
  const appmpostpone = useSelector((state) => state.posts.appm_postpone);
  const userr = datesusers.find((d) => d.dates === dates); // user ของวันนั้น
  function mergeUsers(users, newUsers) {
    const existingUserIds = new Set(users.map((user) => user.user_id));
    const filteredNewUsers = newUsers.filter(
      (user) => !existingUserIds.has(user.user_id)
    );
    return [...users, ...filteredNewUsers]; // [...users, ...filteredNewUsers] concat
  }
  const test_user = mergeUsers(users, userr.users); // user ของวันนั้น + วันที่เลื่อน

  const headerTable = [
    "ชื่อคนต่างด้าว",
    "สัญชาติ",
    "วันเดือนปีเกิด",
    "เลขที่หนังสือเดินทาง",
  ];
  const count_left = dates_brance.find((d) => d.date === dates);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    let arr = [],
      test = [];

    datesusers.forEach((date) => {
      if (date.dates === dates) {
        setSelectedRows(date.users);
        console.log();
        setCount(date.users.length);
      }
      if (date.dates !== dates && date.users.length !== 0) {
        arr.push(date.users);
      }
    });

    arr.map((v) => {
      v.map((b) => {
        test.push(b);
      });
    });

    setCheckUser(test);
    setLoading(false);
  }, [datesusers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (value) => {
    let newSelected = [...selectedRows];
    let checked = newSelected.some((e) => e.user_id === value.user_id);
    if (!checked) {
      newSelected.push(value);
    } else {
      newSelected = newSelected.filter((e) => e.user_id !== value.user_id);
    }
    setCount(newSelected?.length);
    setSelectedRows(newSelected);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onSubmit = () => {
    let arr = [];
    datesusers.forEach((d) => {
      let obj = {};
      if (d.dates === dates) {
        obj.dates = dates;
        obj.users = selectedRows;
      } else {
        obj = d;
      }
      arr.push(obj);
    });
    dispatch(setdates_users(arr));
    navigate(-1);
  };

  if (loading) return <div>.....</div>;

  return (
    <div>
      <div className="mt-12 ml-36 mb-8">
        <p className="text-3xl font-font_Bd">
          วันที่นัดหมาย: {THformatDate(dates)}
        </p>
        <div className="flex mt-2.5 text-base text-darkgray">
          <p className="font-font_Rg mr-8">
            สถานที่:{" "}
            <span className="font-font_Bd">{showbranch.branch_name_th}</span>
          </p>
          <p className="font-font_Rg text-base text-darkgray">
            จำนวนคิวว่าง:{" "}
            <span className="font-font_Bd">
              {check_typenormal
                ? count_left.count_left_Normal
                : count_left.count_left_MULTIPLE}{" "}
              คน
            </span>
          </p>
        </div>
      </div>
      <div className="border border-lightgray w-full"></div>
      <div className="mt-16 ml-36 mr-36">
        <p className="text-xl font-font_Bd">เลือกแรงงานต่างด้าว {count} คน</p>
        {/* Table */}
        <div>
          <div className="overflow-x-auto flex pr-22">
            <div
              id="class-table"
              className="table-container min-w-full px-4 sm:px-6 md:px-0 overflow-hidden h-96 overflow-y-auto overflow-x-hidden"
            >
              <table className="w-full text-left border-collapse">
                <thead className="bg-white sticky top-0 z-10 border-middarkgray">
                  <tr className="border-b border-lightgray sticky">
                    <th className="w-40 h-16"></th>
                    {headerTable?.map((value, index) => (
                      <th
                        className="text-left text-middarkgray w-80 h-16 font-font_Bd"
                        key={index}
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {test_user
                    ?.slice(startIndex, endIndex)
                    .map((value, index) => {
                      const isItemSelected = selectedRows.some((row) => {
                        if (row.user_id === value.user_id) {
                          return true;
                        } else {
                          return false;
                        }
                      });

                      const isUsersSelected = checkUser.some((row) => {
                        if (row.user_id === value.user_id) {
                          return true;
                        } else {
                          return false;
                        }
                      });

                      const isThisUsers = () => {
                        // postpone
                        if (appmpostpone.length !== 0) {
                          const list = appmpostpone.users.some(
                            (u) => u.user_id === value.user_id
                          );
                          const postpone =
                            value.PostponedAppointment.length < 2;

                          const isCancel = value.status !== "CANCEL";
                          return list && postpone && isCancel;
                        }
                      };

                      let handleOnClick = null;
                      if (check_postpone !== undefined) {
                        if ( (!isUsersSelected && isThisUsers()) || (!isThisUsers && isItemSelected)) {
                          //   (!isUsersSelected && isThisUsers()) || (!isThisUsers && isItemSelected)
                          handleOnClick = () => handleClick(value);
                        } else {
                          handleOnClick = null;
                        }
                      } else {
                        if (!isUsersSelected) {
                          handleOnClick = () => handleClick(value);
                        } else {
                          handleOnClick = null;
                        }
                      }

                      return (
                        <tr
                          className={`border-b font-font_Rg hover:bg-lightbarbie border-lightgray text-middarkgray w-80 h-16 ${
                            check_postpone !== undefined
                              ? isUsersSelected || !isThisUsers()
                                ? "bg-white hover:bg-white cursor-not-allowed"
                                : "bg-white hover:bg-lightbarbie cursor-pointer"
                              : isUsersSelected
                              ? "bg-white hover:bg-white cursor-not-allowed"
                              : "bg-white hover:bg-lightbarbie cursor-pointer"
                          }`}
                          key={value.user_id}
                          onClick={handleOnClick}
                        >
                          <td
                            className={`py-2 pr-2 font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-middarkgray`}
                          >
                            <input
                              onChange={() => handleClick(value)}
                              className={`w-20 accent-barbie ${
                                check_postpone !== undefined
                                  ? isUsersSelected || !isThisUsers()
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                  : isUsersSelected
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }
                            } `}
                              type={`${
                                users[0].type_id === "NORMAL"
                                  ? "radio"
                                  : "checkbox"
                              }`}
                              checked={isItemSelected}
                              disabled={
                                check_postpone !== undefined
                                  ? isUsersSelected || !isThisUsers()
                                  : isUsersSelected
                              }
                            />
                          </td>
                          <td className="py-2 pr-2 font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-middarkgray">
                            {value.first_name}
                          </td>
                          <td className="py-2 pr-2 font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-middarkgray">
                            {value.nationality}
                          </td>
                          <td className="py-2 pr-2 font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-middarkgray">
                            {value.birth_date}
                          </td>
                          <td className="py-2 pr-2 font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-middarkgray">
                            {value.passport_id}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={users.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowPage}
            labelRowsPerPage="Show"
            sx={{
              "& .MuiTablePagination-selectLabel": {
                fontSize: "12px", // Custom font size
              },
            }}
          />
        </div>
        <div className="mt-20 mb-20 flex justify-end">
          <div className="mr-3.5">
            <ButtonStyle
              onClick={onCancel}
              type={"secondery"}
              label={"ยกเลิก"}
            />
          </div>
          <div>
            <ButtonStyle
              type={`${count === 0 ? "disable" : "binary"}`}
              label={"ยืนยัน"}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTimePage;
