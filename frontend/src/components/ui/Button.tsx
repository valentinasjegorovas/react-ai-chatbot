import classNames from "classnames";
import type { ReactNode } from "react";

type Props = {
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export default function Button({
  disabled,
  onClick,
  children,
  className,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        className,
        "cursor-pointer disabled:cursor-not-allowed h-12 w-full border rounded-lg text-center flex items-center justify-center"
      )}
    >
      {children}
    </button>
  );
}
