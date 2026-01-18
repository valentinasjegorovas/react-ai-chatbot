import classNames from "classnames";

type InputType = "text" | "password" | "email" | "search" | "url";

type Props = {
  type: InputType;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
};

export default function Input({
  type,
  value,
  placeholder,
  onChange,
  className,
}: Props) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classNames(
        "h-12 w-full rounded-xl px-4",
        "bg-white border border-[var(--border)]",
        "text-[15px] text-[var(--text)]",
        "placeholder:text-[var(--text-muted)]",
        "shadow-[var(--shadow)]",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]",
        "hover:border-slate-300",
        className
      )}
    />
  );
}
