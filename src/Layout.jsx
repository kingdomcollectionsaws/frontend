import React from 'react';

const Layout = ({ children }) => {
  return (
    <div style={{ boxSizing: 'border-box', padding: '0', margin: '0', overflowX:'hidden'}}>
      {children}
    </div>
  );
};

export default Layout;
