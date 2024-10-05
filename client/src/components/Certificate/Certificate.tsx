import { useState } from "react";
import "./Certificate.css";
import $api from "../../http";

interface Certificate {
  id: number;
  store_title: string;
  description: string;
  sum: number;
  image: string;
  quantity: number;
}

export default function Certificate({ certificate, }: { certificate: Certificate }) {
  const [buySuccess, setBuySuccess] = useState<boolean>(false);
  const [buyFailure, setBuyFailure] = useState<boolean>(false);

  async function buyCertificatehandler(sum: string, image: string): Promise<void> {
    try {
      console.log(sum)
      const userId = localStorage.getItem("userId");
      const response = await $api.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/certificates/buy`,
        { userId, sum, image }
      );
      const result = response.data.message
      if (result === 'Покупка успешно совершена.') {
        setBuySuccess(true)
      } else {
        setBuyFailure(true)
      }
    } catch (error) {
      console.log("Ошибка! Срочно звоните Алмамбету!");
    }
  }

  const handlePopupClose = (): void => {
    buySuccess ? setBuySuccess(false) : setBuyFailure(false)
    // window.location.assign('/bids-list');
  };

  return (
    <>


<div className={'rounded-md bg-white p-3 text-left hover:scale-105 transition duration-300 pl-8 mb-10'}>
<h3 className={'text-lg font-semibold tracking-wide leading-8'}>{certificate.description}</h3>
<div className={'flex gap-x-2'}>
<img
            src={certificate.image}
            alt="certificate"
            className="certificate-image"
          />
</div>
<div className={'flex justify-between items-baseline -mt-2'}>
  <p className={'font-serif'}>{certificate.sum} очков</p>
  
  
  
  <div>
  <button
            onClick={() => buyCertificatehandler(`${certificate.sum}`, `${certificate.image}`)}
    className="px-4 py-2 rounded-md border-lime-600 hover:bg-lime-600 hover:text-white hover:border-none bg-white text-lime-600"
          >
            Потратить очки
          </button>
  </div>
</div>
</div>



      {buySuccess && (
        <div
          className="fixed top-0 left-0 w-full h-full flex
         items-center justify-center bg-gray-500 bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-md">
            <p className="mb-4 text-lg">ДЕЛАЙ ЛЮДЯМ ДОБРО И ОНО К ТЕБЕ ВЕРНЕТСЯ. <br/>СЕРТИФИКАТ ТВОЙ, ДОБРЫЙ ЧЕЛОВЕК. <br/>ПРОВЕРЬ СВОЮ ПОЧТУ.</p>
            <div className='flex justify-center'>
            <button
              onClick={handlePopupClose}
              className="px-4 py-2 rounded-md border-lime-600 hover:bg-lime-600 hover:text-white hover:border-none bg-white text-lime-600"
            >
              Закрыть
            </button>
            </div>


          </div>
        </div>
      )}

      {buyFailure && (
        <div
          className="fixed top-0 left-0 w-full h-full flex
         items-center justify-center bg-gray-500 bg-opacity-50 content-center"
        >
          <div className="bg-white p-6 rounded-md content-center ">
            <p className="mb-4 text-lg">К СОЖАЛЕНИЮ, НА ПРИОБРЕТЕНИЕ ДАННОГО СЕРТИФИКАТА НЕ ДОСТАЕТ БАЛЛОВ. <br/>НЕ ОТЧАЙВАЙСЯ - ЭТО ЛИШЬ ПОВОД СДЕЛАТЬ БОЛЬШЕ ДОБРЫХ ДЕЛ!</p>
            <div className='flex justify-center'>
              <button
              onClick={handlePopupClose}
              className="px-4 py-2 place-self-center rounded-md border-lime-600 hover:bg-lime-600 hover:text-white hover:border-none bg-white text-lime-600"
            >
              Закрыть
            </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}



{/* <div className="certificate-wrapper">
<div>
  <img
    src={certificate.image}
    alt="certificate"
    className="certificate-image"
  />
</div>
<div>{certificate.description}</div>
<div>{certificate.sum} руб.</div>
<div>
  <button
    onClick={() => buyCertificatehandler(`${certificate.sum}`, `${certificate.image}`)}
  >
    КУПИТЬ
  </button>
</div>
</div> */}