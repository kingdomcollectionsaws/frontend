import React from 'react';

const Layout = ({ children }) => {
  return (
    <div style={{ boxSizing: 'border-box', padding: '0', margin: '0', overflowX:'hidden',overflowY:'scroll'}}>
      {children}
    </div>
  );
};

export default Layout;
