export default function Header({ label }: { label: string }) {
  return (
    <div className='flex items-center justify-center mb-8'>
      <h1 className='text-4xl tracking-normal font-medium leading-relaxed'>
        {label}
        {/* Список доступных заявок */}
      </h1>
    </div>
  );
}
