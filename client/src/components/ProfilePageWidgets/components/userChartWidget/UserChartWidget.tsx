import { Doughnut } from "react-chartjs-2";
import { useChartConfig } from "./useChartConfig";

export default function UserChartWidget({
  totalOrders,
  completedOrders,
}: {
  totalOrders: number;
  completedOrders: number;
}) {
  const { data, options, centerTextPlugin } = useChartConfig(
    completedOrders,
    totalOrders
  );

  return (
    <>
      {completedOrders > 0 || totalOrders > 0 ? (
        <div className='ml-8 flex flex-col bg-opacity-55 bg-white p-3 rounded-md shadow-lg'>
          <h5 className='text-2xl mb-2'>Диаграмма Вашей активности</h5>
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>
      ) : (
        <div className='flex flex-col items-center bg-white bg-opacity-50 w-80 h-80 justify-center rounded-md gap-y-4'>
          <img src='/img/cry_icon.png' alt='pic' />
          <div className='text-md font-semibold text-gray-700 whitespace-normal break-words'>
            Пока нет активностей
          </div>
        </div>
      )}
    </>
  );
}
