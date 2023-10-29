import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

function Loader() {
  const loaderStyle = css`
    display: block;
    margin: 0 auto;
    border-color: #3498db; /* Blue color */
  `;

  return (
    <div className="loader">
      <ClipLoader css={loaderStyle} size={40} color={'#3498db'} loading={true} />
    </div>
  );
}

export default Loader;
