export default function Cards(): JSX.Element {
  return (
    <div className={"flex mt-12 justify-center flex-wrap gap-5 w-full"}>
      <div
        className={
          "w-96 h-48 bg-white rounded-lg shadow-md transition hover:scale-[1.02] bg-opacity-85"
        }
      >
        <h5 className={"text-lg p-3 font-bold"}>Действительно впечатляет!</h5>
        <div className={"pl-3"}>
          <span className={"font-light text-blue-gray-700"}>
            Не ожидала такого количества заинтересованных людей готовых помочь
            справиться с любой моей проблемой!
          </span>
        </div>
        <div className={"mt-5 pl-3"}>
          <span>Олег, г. Москва</span>
        </div>
      </div>
      <div
        className={
          "w-96 h-48 bg-white rounded-lg shadow-md transition hover:scale-[1.02] bg-opacity-85"
        }
      >
        <h5 className={"text-lg p-3 font-bold"}>Я просто взял и сделал это!</h5>
        <div className={"pl-3"}>
          <span className={"font-light text-blue-gray-700"}>
            Не ожидала такого количества заинтересованных людей готовых помочь
            справиться с любой моей проблемой!
          </span>
        </div>
        <div className={"mt-5 pl-3"}>
          <span>Влад, г. Москва</span>
        </div>
      </div>
      <div
        className={
          "w-96 h-48 bg-white rounded-lg shadow-md transition hover:scale-[1.02] bg-opacity-85"
        }
      >
        <h5 className={"text-lg p-3 font-bold"}>
          Жить стало действительно приятнее!
        </h5>
        <div className={"pl-3"}>
          <span className={"font-light text-blue-gray-700"}>
            Не ожидала такого количества заинтересованных людей готовых помочь
            справиться с любой моей проблемой!
          </span>
        </div>
        <div className={"mt-5 pl-3"}>
          <span>Иван, г. Москва</span>
        </div>
      </div>
      <div
        className={
          "w-96 h-48 bg-white rounded-lg shadow-md transition hover:scale-[1.02] bg-opacity-85"
        }
      >
        <h5 className={"text-lg p-3 font-bold"}>
          Много крутых людей готовых помочь!
        </h5>
        <div className={"pl-3"}>
          <span className={"font-light text-blue-gray-700"}>
            Не ожидала такого количества заинтересованных людей готовых помочь
            справиться с любой моей проблемой!
          </span>
        </div>
        <div className={"mt-5 pl-3"}>
          <span>Сергей, г. Москва</span>
        </div>
      </div>
    </div>
  );
}
