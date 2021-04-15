import React from 'react';
import { Link } from 'gatsby';

const BPage = (): React.ReactNode => {
  return (
    <div>
      <div>Page B</div>
      <Link to="/a">To A</Link>
    </div>
  );
};

export default BPage;
