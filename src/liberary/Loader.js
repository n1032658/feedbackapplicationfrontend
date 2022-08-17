import React, { Fragment } from 'react';
var Spinner = require('react-spinkit');



function Loading(props) {
    return (
        <Fragment>
            <Spinner name="line-spin-fade-loader" />
        </Fragment>
    )
}

export default Loading;
