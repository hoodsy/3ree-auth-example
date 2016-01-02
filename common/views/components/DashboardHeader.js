import React, { PropTypes } from 'react';

export const DashboardHeader = (props) => (
  <div>
    <h1>{ props.title }</h1>
  </div>
);

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
