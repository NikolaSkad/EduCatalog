import React from 'react';

interface IShowAt {
  at: boolean;
  children: React.ReactNode[] | React.ReactNode;
}

const ShowAt: React.FC<IShowAt> = ({ at, children }) => {
  return <>{!!at && children}</>;
};

export default ShowAt;
