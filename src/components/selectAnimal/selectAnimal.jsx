// export function SelectAnimal({
//   textAttribute,
//   value,
//   handleSelect,
//   extraHandleSelect,
//   arrayForOptions,
// }) {
//   return (
//     <div className="control-wrapper">
//       <label className="control-label" htmlFor={`${textAttribute}`}>
//         {`${textAttribute}`}
//       </label>
//       <select
//         className="control-select"
//         id={`${textAttribute}`}
//         value={value}
//         onChange={function (event) {
//           handleSelect(event.target.value);
//           extraHandleSelect("");
//         }}
//         onBlur={function (event) {
//           handleSelect(event.target.value);
//           extraHandleSelect("");
//         }}
//       >
//         <option value="">Select an animal</option>
//         {arrayForOptions &&
//           arrayForOptions.map((element) => (
//             <option key={element.name} value={element.name}>
//               {element.name}
//             </option>
//           ))}
//       </select>
//     </div>
//   );
// }
