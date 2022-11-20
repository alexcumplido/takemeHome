type TypeButton = {
  disabled: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  text: string,
  className: string
}

export function Button({ disabled, onClick, text, className } : TypeButton) : JSX.Element {
  return (
    <button disabled={disabled} onClick={onClick} className={className} >
      {text}
    </button>
  );
}
