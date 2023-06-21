import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3368959360128868"
      crossOrigin="anonymous"
      key="ads"
    ></script>,
  ]);
};
