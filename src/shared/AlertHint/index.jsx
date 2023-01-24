import React from 'react';

import './style.scss';

const AlertHint = (props) => {
  const { message, options } = props;
  let styleAlert = '';

  switch (options.type) {
    case 'error':
      styleAlert = 'hint-alert-red';
      break;
    case 'success':
      styleAlert = 'hint-alert-blue';
      break;
    default:
      styleAlert = 'hint-alert-blue';
      break;
  }

  return <div className={`hint-alert ${styleAlert}`}>{message}</div>;
};

export default AlertHint;
