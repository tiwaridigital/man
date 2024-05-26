import './style.scss';
import Link from 'next/link';
const Error404 = ({ description }) => {
  return (
    <>
      <main className="error-page">
        <div className="container">
          <div className="eyes">
            <div className="eye">
              <div className="eye__pupil eye__pupil--left"></div>
            </div>
            <div className="eye">
              <div className="eye__pupil eye__pupil--right"></div>
            </div>
          </div>

          <div className="error-heading-container" width="1200">
            <h1 className="error-heading">
              4<span className="font-white">0</span>4
            </h1>
            <p className="error-description">{description}</p>
          </div>

          <Link
            className="error-page__button"
            aria-label="Back to Home"
            href="/"
          >
            back to home
          </Link>
        </div>
      </main>
    </>
  );
};

export default Error404;
