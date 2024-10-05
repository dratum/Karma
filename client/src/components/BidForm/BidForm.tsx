import { SubmitHandler, useForm } from "react-hook-form";
import { JSX, useState } from "react";
import SuccessModal from "../UI/Modal/SuccesModal/SuccessModal.tsx";
import $api from "../../http";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import React from "react";

interface Form {
  title: string;
  description: string;
  address: string;
}

export default function BidForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<Form>();

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user as string);
  const userObjectId = String(userObject.id);

  const submit: SubmitHandler<Form> = function (data) {
    $api
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/bids`, data, {
        params: { userId: userObjectId },
      })
      .then((response) => {
        console.log(response.data);
        reset();
        setSubmitSuccess(true);
      })
      .catch((error) => console.log(error.message, "нет backend"));
  };
  const handlePopupClose = () => {
    setSubmitSuccess(false);
    window.location.assign("/bids-list");
    // пока перенаправляю заказчиков на страницу всех заявок
  };

  return (
    <>
      <h2 className='d mt-10 text-center text-3xl font-medium leading-9 tracking-normal text-gray-900'>
        Создание Вашей заявки
      </h2>
      <form
        onSubmit={handleSubmit(submit)}
        className={
          "drop-shadow-md flex flex-col bg-white p-6 rounded-xl gap-2 mt-5 mx-[auto] w-[700px]"
        }
      >
        <div className=' flex flex-row justify-between'>
          <label
            className='text-md font-normal tracking-wide leading-8 text-gray-900'
            htmlFor={"title"}
          >
            Название Вашей заявки:
          </label>
          <img
            className='w-6'
            src='/svg/seal-question.svg'
            data-tooltip-id='title-tooltip'
            data-tooltip-html='Пожалуйста, напишите название<br />которое вызовет большее количество<br />сострадания и жалости!'
          />

          <Tooltip
            id='title-tooltip'
            style={{ backgroundColor: "grey" }}
            place='right'
          />
        </div>

        <input
          id={"title"}
          placeholder={"Введите название"}
          type={"text"}
          {...register("title", {
            required: "Введите название заявки! (Не менее 5 символов)",
            minLength: {
              value: 5,
              message: "Не менее 5 символов!",
            },
          })}
          className={
            "p-2 rounded-xl shadow-sm outline-gray-100 border border-gray-200"
          }
        />
        {errors.title && (
          <p className='text-red-600 text-sm'>{errors.title.message}</p>
        )}
        <div className=' flex flex-row justify-between'>
          <label
            htmlFor={"description"}
            className={
              "text-md font-normal tracking-wide leading-8 text-gray-900 mt-2"
            }
          >
            Опишите Вашу проблему:
          </label>
          <img
            className='w-6'
            src='/svg/seal-question.svg'
            data-tooltip-id='title-tooltip'
            data-tooltip-html='В тексте заявки можно отразить<br /> все обстоятельства и нюансы, которые должен<br /> знать исполнитель, чтобы в последствии<br /> Вам не было отказано в помощи.'
          />

          <Tooltip
            id='title-tooltip'
            style={{ backgroundColor: "grey" }}
            place='right'
          />
        </div>

        <textarea
          id={"description"}
          spellCheck={"true"}
          rows={10}
          placeholder={"Текст проблемы"}
          {...register("description", {
            required: "Введите текст проблемы! (Не менее 10 символов)",
            minLength: {
              value: 10,
              message: "Не менее 10 символов!",
            },
          })}
          className={
            "outline-gray-100 border-gray-200 p-2 rounded-xl shadow-sm outline-none italic"
          }
        />
        {errors.description && (
          <p className='text-red-600 text-sm'>{errors.description.message}</p>
        )}
        <div className=' flex flex-row justify-between'>
          <label
            htmlFor={"address"}
            className={
              "text-md font-normal tracking-wide leading-8 text-gray-900 mt-2"
            }
          >
            Адрес по которому Вам требуется помощь:
          </label>
          <img
            className='w-6'
            src='/svg/seal-question.svg'
            data-tooltip-id='title-tooltip'
            data-tooltip-html='Указывайте точный адрес, где нужно будет <br/> оказать Вам помощь, в противном случае <br/> вероятность отказа возрастает!'
          />
          <Tooltip
            id='title-tooltip'
            style={{ backgroundColor: "grey" }}
            place='right'
          />
        </div>
        <input
          id={"address"}
          placeholder={"Введите адрес"}
          type={"text"}
          {...register("address", {
            required: "Введите адрес! (Не менее 10 символов)",
            minLength: {
              value: 10,
              message: "Не менее 10 символов!",
            },
          })}
          className={
            "outline-gray-100 border-gray-200 p-2 rounded-xl shadow-sm outline-none"
          }
        />
        {errors.address && (
          <p className='text-red-600 text-sm'>{errors.address.message}</p>
        )}
        <button
          className={
            "transition duration-300 mt-3 rounded-md" +
            " shadow-sm border-green-600 hover:bg-green-600 hover:text-white" +
            " hover:border-green-600 bg-white text-green-600"
          }
        >
          {isSubmitting ? "Отправка..." : "Создать заявку"}
        </button>
        <div className='flex justify-center'>
          <p>
            Нажимая кнопку "Cоздать заявку",
            <br /> Вы соглашаетесь с{" "}
            <span className='decoration-1 underline text-blue-800 '>
              Правилами пользования
            </span>{" "}
            сервиса.
          </p>
        </div>
      </form>
      {submitSuccess && <SuccessModal onClick={handlePopupClose} />}
    </>
  );
}
