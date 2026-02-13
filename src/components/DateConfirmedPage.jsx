import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/date-confirmed.css";
import { formatDateValue, getStoredRequestData } from "../utils/dateUtils";

function DateConfirmedPage() {
  const location = useLocation();
  const requestData = location.state || getStoredRequestData();

  const where = requestData?.where || "Somewhere Bright";
  const dateValue = requestData?.when || "";
  const dayNumber = dateValue
    ? new Date(`${dateValue}T12:00:00`).getDate()
    : 14;

  const [showToast, setShowToast] = useState(Boolean(location.state?.requestJustSent));
  const [toastExiting, setToastExiting] = useState(false);

  useEffect(() => {
    if (!location.state?.requestJustSent) {
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setToastExiting(true);
    }, 3000);

    const removeTimer = window.setTimeout(() => {
      setShowToast(false);
    }, 3400);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [location.state]);

  return (
    <main className="confirmed-screen">
      {showToast && (
        <p className={`confirmed-toast ${toastExiting ? "confirmed-toast-exit" : ""}`}>
          Date Request Sent
        </p>
      )}

      <section className="confirmed-card">
        <h1 className="confirmed-title">Date Confirmed! ☀️</h1>
        <p className="confirmed-text">
          It&apos;s a date! Looking forward to chasing the sunshine with you.
        </p>

        <div className="confirmed-calendar">
          <p className="calendar-heading">Our Next Sunny Day</p>
          <div className="calendar-grid">
            {Array.from({ length: 28 }, (_, index) => index + 1).map((day) => (
              <span
                key={day}
                className={`calendar-day ${day === dayNumber ? "calendar-day-selected" : ""}`}>
                {day}
              </span>
            ))}
          </div>
          <p className="calendar-location">📍 {where}</p>
          <p className="calendar-date">{formatDateValue(dateValue)}</p>
        </div>

        <p className="confirmed-note">
          I&apos;ll bring the snacks, you bring that laugh.
        </p>
        <Link to="/" className="confirmed-link">
          ← Go back home
        </Link>
      </section>
    </main>
  );
}

export default DateConfirmedPage;
