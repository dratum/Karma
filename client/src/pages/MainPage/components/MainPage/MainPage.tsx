import "./MainPage.styles.css";
import { Link } from "react-router-dom";
import { Cards } from "../../../../components/UserCard";
import Button from "../../../../ui/buttons/Button.tsx";

export default function MainPage() {
  return (
    <div className='flex flex-wrap items-center justify-around'>
      <div className='flex flex-col items-start'>
        <img width={"400em"} src='/svg/logo2.svg' alt='main-logo' />
        <span className='font-normal text-gray-600 tracking-wide'>
          Сервис, объединяющий людей через добрые дела.
          <br />
          Оказывайте безвозмедную помощь и зарабатывайте КАРМУ!
        </span>
        <div className='mt-5'>
          <span className='text-6xl font-medium text-blue-700'>
            Найдите исполнителя или <br />
            станьте исполнителем сами
          </span>
        </div>
        <div className='flex justify-between w-full '>
          <Link to={"/bid-form"}>
            <Button label={"Нужна помощь"} />
          </Link>
          <Link to={"/bids-list"}>
            <Button label={"Хочу помочь"} />
          </Link>
        </div>
      </div>
      <div className=''>
        <img
          className='drop-shadow-md'
          width={"400em"}
          src={"./img/main_img.png"}
          alt={"main-page-img"}
        />
      </div>
      <Cards />
    </div>
  );
}
