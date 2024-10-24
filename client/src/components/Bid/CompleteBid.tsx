import { Bid } from "../../../features/bidsUserSlice.ts";

export default function CompleteBid({ bid }: { bid: Bid }) {
  return (
    <div
      className={
        "w-[60rem] start-bid rounded-md bg-white p-3 text-left hover:shadow-xl pl-8 shadow-md "
      }
    >
      <h3 className={"text-lg font-semibold tracking-wide leading-8"}>
        {bid.title}
      </h3>
      <div className={"flex gap-x-2"}>
        <img className={"w-4"} src={"/svg/Vector.svg"} alt={bid.title} />
        <p
          className={"text-sm font-sans tracking-wide leading-8 text-gray-500"}
        >
          {bid.address}
        </p>
      </div>
      <div className={"flex flex-row gap-2 justify-start items-center mt-2"}>
        <img src='/svg/success.svg' className='w-5' alt='success-pic' />{" "}
        <p>Завершено</p>
      </div>
    </div>
  );
}
