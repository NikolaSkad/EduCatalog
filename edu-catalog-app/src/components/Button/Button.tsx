import React from 'react';
import CicularProgress from '../CicularProgress/CicularProgress';
import clsx from 'clsx';

export interface ButtonProps {
  text: string;
  loadingText?: string;
  loading?: boolean;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
  onClick?: (param?: any) => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  loadingText,
  loading,
  buttonProps,
  className,
  onClick = () => null,
}) => {
  const renderedText = loading ? loadingText : text;
  return (
    <button
      {...buttonProps}
      className={clsx(
        'btn min-h-3 h-fit px-4 py-2.5 input input-bordered bg-base-200 cursor-pointer active:!scale-95',
        className,
      )}
      onClick={onClick}
    >
      <div className={'flex items-center justify-center gap-3'}>
        <span>{renderedText}</span>
        {loading && <CicularProgress />}
      </div>
    </button>
  );
};

export default Button;
