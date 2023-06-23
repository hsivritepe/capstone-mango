'use client';

import React from 'react';

function ErrorPage({ statusCode, message }) {
    return (
        <div>
            <h1>Error !!! {statusCode}</h1>
            <p>{message}</p>
        </div>
    );
}

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res
        ? res.statusCode
        : err
        ? err.statusCode
        : 404;
    const message = err ? err.message : 'Page not found';

    return { statusCode, message };
};

export default ErrorPage;
