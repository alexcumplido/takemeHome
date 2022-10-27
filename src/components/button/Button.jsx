export function Button({ disabled, handleOnclick, text, styleClass }) {
  return (
    <button className={styleClass} disabled={disabled} onClick={handleOnclick}>
      {text}
    </button>
  );
}
