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
        "h-12 w-full rounded-xl font-medium text-[15px]",
        "flex items-center justify-center gap-2",
        "transition-all duration-200 ease-out",
        "bg-[var(--primary)] text-white",
        "hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-md)]",
        "active:scale-[0.98]",
        "disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100",
        "cursor-pointer"
      )}
    >
      {children}
    </button>
  );
}
