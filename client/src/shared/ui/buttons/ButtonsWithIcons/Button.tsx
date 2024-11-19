import { MouseEventHandler } from "react";
import '../styles.css'
export default function Button(props: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  srcPath?: string | undefined;
  label: string;
}) {
  return (
    <button
      onClick={props.onClick}
      className={
        "flex flex-row gap-x-3 items-center shadow-md focus:outline-none transition duration-300 rounded-lg " +
        " shadow-sm border-lime-600 hover:bg-lime-600 hover:text-white" +
        " hover:border-lime-600 bg-white text-lime-600 text-sm"
      }
    >
      <img
        src={props.srcPath}
        width={1.25}
        className='w-5'
        alt={`${props.label}-button`}
      />
      {props.label}
    </button>
  );
}
