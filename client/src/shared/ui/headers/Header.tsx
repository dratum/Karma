export default function Header({ label }: { label: string }) {
  return (
    <div className='flex items-center justify-center mb-8'>
      <h1 className='text-xl tracking-wide font-medium leading-relaxed'>
        {label}
      </h1>
    </div>
  );
}
