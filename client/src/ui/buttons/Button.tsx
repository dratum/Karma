export default function Button(props: { label: string }) {
  return (
    <button
      className={
        "focus:outline-none transition" +
        " duration-300 w-80 hover:bg-green-600 " +
        " hover:text-white bg-white text-green-600 shadow-md"
      }
    >
      {props.label}
    </button>
  );
}
