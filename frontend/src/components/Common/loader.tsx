import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

const Loader: FC<{ fill?: boolean; className?: string }> = ({ fill, className }) => {
  const classes = fill ? 'position-fixed h-100' : 'pt-3';

  return (
    <div className={`${classes} ${className} w-100 d-flex justify-content-center align-items-center`}>
      <Spinner color='danger' />
    </div>
  );
};

export default Loader;
