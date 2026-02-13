import { Link, useLocation } from "react-router-dom";
import "../styles/date-request-sent.css";
import { formatDateValue, getStoredRequestData } from "../utils/dateUtils";

function DateRequestSentPage() {
  const location = useLocation();
  const requestData = location.state || getStoredRequestData();

  const where = requestData?.where || "The Italian Bistro";
  const when = formatDateValue(requestData?.when || "");

  return (
    <main className="request-screen">
      <section className="request-card">
        <div className="request-face">🙂</div>
        <h1 className="request-title">
          Date Request <span>Sent!</span>
        </h1>
        <p className="request-subtitle">It&apos;s a date! Can&apos;t wait.</p>

        <div className="request-summary">
          <p className="request-label">Destination:</p>
          <p className="request-value">{where}</p>
          <p className="request-label">When:</p>
          <p className="request-value">{when}</p>
        </div>

        <div className="request-actions">
          <Link
            className="request-btn request-btn-primary"
            to="/date-confirmed">
            Plan Another Date
          </Link>
          <Link className="request-btn request-btn-secondary" to="/">
            Go Back Home
          </Link>
        </div>

        <p className="request-footer">
          Check your inbox (or my face) for confirmation!
        </p>
      </section>
    </main>
  );
}

export default DateRequestSentPage;
