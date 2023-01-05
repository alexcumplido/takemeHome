type TypeSelect = {
  text: string;
  disabled: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
};

export function Select(props: TypeSelect): JSX.Element {
  return (
    <div className="control-wrapper">
      <label className="control-label" htmlFor={`${props.text}`}>
        {`${props.text}`}
      </label>
      <select
        className="control-select"
        disabled={props.disabled}
        id={`${props.text}`}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      >
        <option value="">Any</option>
        {props.options &&
          props.options.map((element: string) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
      </select>
    </div>
  );
}
