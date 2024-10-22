export default function NotFound({ label }: { label: string }) {
  return (
    <div className={"w-[60rem] flex gap-x-5 justify-center items-center"}>
      <img className='w-10' src='/svg/question.png' />
      <h1 className='text-xl'>{label}</h1>
    </div>
  );
}
