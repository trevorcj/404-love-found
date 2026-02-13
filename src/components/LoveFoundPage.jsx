import { Link } from "react-router-dom";
import "../styles/love-error.css";

function LoveFoundPage() {
  return (
    <main className="error-screen">
      <section className="error-card">
        <p className="error-corner">×</p>
        <div className="error-face">☹️</div>
        <h1>
          Oops! Something
          <br />
          went sour...
        </h1>
        <p className="error-body">
          Looks like the connection got a bit squeezed. Don&apos;t worry, even
          the best lemonade takes a little shaking up.
        </p>

        <Link to="/" className="error-button">
          Try Again
        </Link>

        <p className="error-code">Error Code: 404_BITTER_AFTERTASTE</p>
      </section>
    </main>
  );
}

export default LoveFoundPage;
