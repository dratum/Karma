import { Bid } from "../../../features/bidsUserSlice.ts";

export default function CompleteBid({ bid }: { bid: Bid }) {

  return (
    <>
      <div
        className={
          "start-bid rounded-md bg-white text-left hover:scale-[1.02] transition duration-300 pl-8 shadow-md flex flex-col p-5 gap-y-2"
        }
      >
        <h3 className={"text-lg font-semibold tracking-wide leading-8"}>
          {bid.title}
        </h3>
        <div className={"flex gap-x-2"}>
          <img className={"w-4"} src={"/svg/Vector.svg"} alt={bid.title} />
          <p
            className={
              "text-sm font-sans tracking-wide leading-8 text-gray-500"
            }
          >
            {bid.address}
          </p>
        </div>
        <div className={"flex flex-row justify-between items-baseline"}>
          <div className='flex flex-row gap-2'>
            <img src='/svg/success.svg' className='w-5' alt='' />{" "}
            <p>Завершено</p>
          </div>
        </div>
      </div>
    </>
  );
}
