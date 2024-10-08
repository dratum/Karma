import { MouseEventHandler } from "react";

export default function Button(props: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  srcPath?: string | undefined;
  label: string;
}) {
  return (
    <button
      onClick={props.onClick}
      className={
        "flex flex-row gap-x-3 items-center shadow-md focus:outline-none transition duration-300 rounded-xl" +
        " shadow-sm hover:bg-lime-600 hover:text-white" +
        " hover:border-lime-600 bg-white text-lime-600"
      }
    >
      <img src={props.srcPath} className='w-10' alt='map-button' />
      {props.label}
    </button>
  );
}
