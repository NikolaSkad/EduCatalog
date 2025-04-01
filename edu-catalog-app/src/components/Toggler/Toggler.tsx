import PlusIcon from '@/assets/icon_plus.svg?react';
import clsx from 'clsx';

interface IToggler {
  toggled?: boolean;
}

export default function Toggler({ toggled }: IToggler) {
  return (
    <div
      className={clsx('flex justify-center items-center p-2 transition-all duration-200 bg-base-100 rounded-xl', {
        'rotate-45': toggled,
      })}
    >
      <PlusIcon />
    </div>
  );
}
