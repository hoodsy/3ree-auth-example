import React, { PropTypes } from 'react'

export const Resource = (
  { url }) =>
(
  <li>
    <a
      href={ url }
      target="_blank" >
      { url }
    </a>
  </li>
)


Resource.propTypes = {
  url: PropTypes.string.isRequired
}
