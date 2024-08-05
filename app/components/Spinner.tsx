import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green"></div>
  </div>
);

export default Spinner;
