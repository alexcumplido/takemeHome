type SelectAnimalProps = {
  text: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  extraOnChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
};

export function SelectAnimal(props: SelectAnimalProps): JSX.Element {
  return (
    <div className="control-wrapper">
      <label className="control-label" htmlFor={`${props.text}`}>
        {`${props.text}`}
      </label>
      <select
        className="control-select"
        id={`${props.text}`}
        value={props.value}
        onChange={function (event) {
          props.onChange(event.target.value);
          props.extraOnChange("");
        }}
        onBlur={function (event) {
          props.onChange(event.target.value);
          props.extraOnChange("");
        }}
      >
        <option value="">Select an animal</option>
        {props.options.length &&
          props.options.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
      </select>
    </div>
  );
}
