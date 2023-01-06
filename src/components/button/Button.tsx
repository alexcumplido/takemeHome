type TypeButtonProps = {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  className: string;
};

export function Button(props: TypeButtonProps): JSX.Element {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </button>
  );
}
