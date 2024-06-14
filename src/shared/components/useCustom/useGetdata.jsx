import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

function useGetdata(mockup) {
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);

  const getData = useMemo(() => {
    return file;
  }, [file]);

  // useEffect(() => {
  //   setFile(mockup);
  // }, [file]);

  return { getData };
}

export default useGetdata;
