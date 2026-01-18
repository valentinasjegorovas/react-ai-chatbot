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
      className={classNames("h-12 w-full border rounded-lg px-5", className)}
    />
  );
}
