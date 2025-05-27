// pages/_error.js
import React from 'react';

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      <h1>{statusCode ? `Error ${statusCode}` : "An error occurred"}</h1>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  // Redirect to home page for 404 or 500 errors
  if (res && (statusCode === 404 || statusCode === 500)) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
  return { statusCode };
};

export default ErrorPage;