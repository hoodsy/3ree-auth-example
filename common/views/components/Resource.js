import React, { PropTypes } from 'react';

export const Resource = (props) => {
  // const url = `http://${props.url}`;
  return (
    <li>
      <a
        href={ props.url }
        target="_blank"
      >
        { props.url }
      </a>
    </li>
  );
};

Resource.propTypes = {
  url: PropTypes.string.isRequired,
};
