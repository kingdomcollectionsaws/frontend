import React from 'react';

const Layout = ({ children }) => {
  return (
    <div style={{ boxSizing: 'border-box', padding: '0', margin: '0',}}>
      {children}
    </div>
  );
};

export default Layout;
