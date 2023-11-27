import { cn } from '@/lib/utils';
import React, { FC } from 'react';

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  active?: boolean;
} & React.ComponentPropsWithRef<'button'>;

const AnswerButton: FC<ButtonProps> = ({
  children,
  active = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'relative  w-full rounded-lg py-2 text-lg font-medium text-white',
        active ? 'bg-button-active' : 'bg-button'
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnswerButton;
