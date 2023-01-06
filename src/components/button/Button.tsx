
type ButtonProps = {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  className: string;
  children?: React.ReactNode;
};

export function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text || props.children}
    </button>
  );
}
