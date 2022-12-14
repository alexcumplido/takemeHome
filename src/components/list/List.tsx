type ListProps = {
  items: string[] | [];
};

export function List(props: ListProps): JSX.Element {
  return (
    <ul className="flex-center">
      {props.items.length ? (
        props.items.map(function (element: string) {
          return <li key={element}>{element} | </li>;
        })
      ) : (
        <span>No data</span>
      )}
    </ul>
  );
}
