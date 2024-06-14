import React, { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
// page
import BookingDatePage from "./layout/pages/BookingDatePage";
import BookingTimePage from "./layout/pages/BookingTimePage";
import BookingConfirmPage from "./layout/pages/BookingConfirmPage";
import BookingDetailPage from "./layout/pages/BookingDetailPage";
import LoadingPage from "./layout/pages/LoadingPage";
import AppointmentForm from "./layout/pages/AppointmentForm";
import PostponeAppointment from "./layout/pages/PostponeAppointment";

function App() {
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  if (Loading) {
    return <LoadingPage />;
  }
  const router = createBrowserRouter(
    [
      {
        path: "bookingdate/:id",
        element: <BookingDatePage />,
      },
      {
        path: "bookingtime",
        element: <BookingTimePage />,
      },
      {
        path: "bookingconfirm",
        element: <BookingConfirmPage />,
      },
      {
        path: "bookingdetail",
        element: <BookingDetailPage />,
      },
      {
        path: "appointmentform",
        element: <AppointmentForm />,
      },
      {
        path: "postponeappointment",
        element: <PostponeAppointment />,
      },
    ],
    { basename: "/doe" }
  );
  return <RouterProvider router={router} />;
}

export default App;
