import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/opening.css";
import { formatDateValue, persistRequestData } from "../utils/dateUtils";

const baseCardRotations = ["rotate(2deg)", "rotate(-3deg)"];

let envelopeShownInRuntime = false;

function Opening() {
  const navigate = useNavigate();
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(envelopeShownInRuntime);
  const [cardTransforms, setCardTransforms] = useState(baseCardRotations);
  const [formValues, setFormValues] = useState({
    where: "",
    when: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = isLetterOpen ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLetterOpen]);

  const isComplete = useMemo(() => {
    return formValues.where.trim().length > 1 && Boolean(formValues.when);
  }, [formValues]);

  const handleOpenEnvelope = () => {
    if (isEnvelopeOpening || isLetterOpen) {
      return;
    }

    setIsEnvelopeOpening(true);

    setTimeout(() => {
      envelopeShownInRuntime = true;
      setIsLetterOpen(true);
    }, 800);
  };

  const handleCardEnter = (index) => {
    const randomRotation = (Math.random() * 4 - 2).toFixed(2);
    setCardTransforms((current) =>
      current.map((value, position) =>
        position === index ? `scale(1.05) rotate(${randomRotation}deg)` : value,
      ),
    );
  };

  const handleCardLeave = (index) => {
    setCardTransforms((current) =>
      current.map((value, position) =>
        position === index ? baseCardRotations[index] : value,
      ),
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (formValues.where.trim().length < 2) {
      nextErrors.where = "Please add where you both should bask next.";
    }

    if (!formValues.when) {
      nextErrors.when = "Please select a date.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const openWhatsappMessage = (payload) => {
    const message = [
      "☀️ Date Request",
      `Destination: ${payload.where}`,
      `When: ${formatDateValue(payload.when)}`,
      "I can't wait for this sunny date.",
    ].join("\n");

    const url = `https://wa.me/2349165536637?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      where: formValues.where.trim(),
      when: formValues.when,
      requestJustSent: true,
    };

    persistRequestData(payload);
    openWhatsappMessage(payload);

    navigate("/date-confirmed", {
      state: payload,
    });
  };

  return (
    <main className="opening-desk">
      {!isLetterOpen && (
        <section
          className={`envelope-wrapper ${isEnvelopeOpening ? "opening" : ""}`}>
          <div
            className="envelope"
            role="button"
            tabIndex={0}
            onClick={handleOpenEnvelope}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpenEnvelope();
              }
            }}>
            <div className="envelope-flap" />
            <div className="envelope-body" />
            <button
              type="button"
              className="wax-seal"
              onClick={(event) => {
                event.stopPropagation();
                handleOpenEnvelope();
              }}
              aria-label="Open letter">
              <span className="wax-seal-drip" />
            </button>
            <p className="envelope-address">
              For Esther
              <br />
              My Human Sunshine
            </p>
          </div>
          <p className="click-prompt">Click the seal to open...</p>
        </section>
      )}

      {isLetterOpen && (
        <section className="opening-letter-container">
          <article className="opening-paper">
            <div className="sticker sticker-sunflower-top-left floating">
              <svg viewBox="0 0 100 100">
                <g fill="#FFD93D" stroke="#181818" strokeWidth="2">
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="18"
                    transform="rotate(0 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="18"
                    transform="rotate(45 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="18"
                    transform="rotate(90 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="18"
                    transform="rotate(135 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="18"
                    transform="rotate(180 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="18"
                    transform="rotate(225 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="18"
                    transform="rotate(270 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy="20"
                    rx="8"
                    ry="18"
                    transform="rotate(315 50 50)"
                  />
                </g>
                <circle
                  cx="50"
                  cy="50"
                  r="12"
                  fill="#5D4037"
                  stroke="#181818"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <h1 className="opening-title">
              To My <span className="opening-highlight">Human Sunshine</span>
            </h1>

            <p className="opening-text">Hey babe,</p>
            <p className="opening-text">
              You have this quiet way of lighting up spaces without even trying.
              On days when everything feels cloudy, you show up like{" "}
              <span className="handwritten-highlight">
                warmth slipping through the window
              </span>
              .
            </p>
            <p className="opening-text">
              Thank you for being laughter, comfort, and brightness wrapped in
              one beautiful human.
            </p>

            <div className="memory-grid">
              <article
                className="polaroid"
                style={{ transform: cardTransforms[0] }}
                onMouseEnter={() => handleCardEnter(0)}
                onMouseLeave={() => handleCardLeave(0)}>
                <div className="polaroid-img">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 100 100"
                    fill="#FF4B2B"
                    stroke="#181818"
                    strokeWidth="3">
                    <path d="M50 85 C50 85 15 60 15 35 C15 20 30 15 40 25 C45 30 50 35 50 35 C50 35 55 30 60 25 C70 15 85 20 85 35 C85 60 50 85 50 85 Z" />
                  </svg>
                </div>
                <div className="polaroid-caption">The Best Laughs</div>
              </article>

              <article
                className="polaroid"
                style={{ transform: cardTransforms[1] }}
                onMouseEnter={() => handleCardEnter(1)}
                onMouseLeave={() => handleCardLeave(1)}>
                <div className="polaroid-img">
                  <svg width="60" height="60" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="15"
                      fill="#FFD93D"
                      stroke="#181818"
                      strokeWidth="2"
                    />
                    <path
                      d="M50 20 L50 35 M80 50 L65 50 M50 80 L50 65 M20 50 L35 50"
                      stroke="#181818"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div className="polaroid-caption">Sunny Afternoons</div>
              </article>
            </div>

            <form className="opening-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="where" className="opening-label">
                Where should we bask next?
              </label>
              <input
                id="where"
                name="where"
                className="opening-input"
                type="text"
                placeholder="Type destination"
                value={formValues.where}
                onChange={handleChange}
                required
              />
              {errors.where && <p className="opening-error">{errors.where}</p>}

              <label htmlFor="when" className="opening-label">
                When should we go?
              </label>
              <input
                id="when"
                name="when"
                className="opening-input"
                type="date"
                value={formValues.when}
                onChange={handleChange}
                required
              />
              {errors.when && <p className="opening-error">{errors.when}</p>}

              <button
                type="submit"
                className="opening-button"
                disabled={!isComplete}>
                Send Date Request
              </button>
            </form>

            <nav className="opening-links">
              <Link to="/sunbeam-snapshots">☀️ Sunbeam Snapshots</Link>
              <Link to="/404-love-found">404-love-found</Link>
            </nav>
          </article>
        </section>
      )}
    </main>
  );
}

export default Opening;
