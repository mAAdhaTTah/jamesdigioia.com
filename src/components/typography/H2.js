import React from 'react';
import cc from 'classcat';

const h2Class = cc(['mb-5', 'font-header']);

const H2 = ({ className, children }) => (
  <h2 className={cc([h2Class, className])}>{children}</h2>
);

export default H2;
