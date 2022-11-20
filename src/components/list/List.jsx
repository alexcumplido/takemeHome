export function List({ items }) {
  return (
    <ul className="flex-center">
      {items.length ? (
        items.map(function (element) {
          return <li key={element}>{element} | </li>;
        })
      ) : (
        <span>No data</span>
      )}
    </ul>
  );
}
