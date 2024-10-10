import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  saveUserData,
  updateUser,
} from "../../../features/userEditProfileSlice.ts";
import { getOrders } from "../../../features/userActivitySlice.ts";
import { Doughnut } from "react-chartjs-2";
import { RootState } from "../../../redux/store/store.ts";
import cryIcon from "./cry_icon.png";
import {
  Chart,
  ArcElement,
  registerables,
  ChartOptions,
  Plugin,
  ChartType,
} from "chart.js";
import "chartjs-plugin-datalabels";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAppDispatch } from "../../../hooks/redux.ts";
import NavBar from "./NavBar.tsx";
import { BioProfileType } from "./types.ts";
import { userId } from "../../constants/const.ts";
import UserData from "./UserDataWidget.tsx";
Chart.register(ArcElement, ...registerables, ChartDataLabels);

declare module "chart.js" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    centerText?: {
      display: boolean;
      text: string;
    };
  }
}

function ProfileBioPage() {
  const dispatch = useAppDispatch();
  const totalOrders = useSelector(
    (state: RootState) => state.activity.totalOrders
  );
  const completedOrders = useSelector(
    (state: RootState) => state.activity.completedOrders
  );

  const data = {
    labels: ["Завки в работе", "Опубликованные заявки"],
    datasets: [
      {
        data: [completedOrders, totalOrders],
        backgroundColor: ["#9370DB", "#36A2EB"],
        borderColor: "#11bf70", // зеленый цвет обводки
        borderWidth: 1.5,
      },
    ],
  };

  const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerText",
    beforeDraw: (chart) => {
      if (
        chart.config &&
        chart.config.options &&
        chart.config.options.plugins &&
        chart.config.options.plugins.centerText &&
        chart.config.options.plugins.centerText.display
      ) {
        drawCenterText(chart);
      }
    },
  };
  const drawCenterText = (chart: Chart<"doughnut">) => {
    const width = chart.width;
    const height = chart.height;
    const ctx = chart.ctx;
    ctx.restore();
    const fontSize = (height / 280).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";
    const text = chart.config?.options?.plugins?.centerText?.text ?? "";
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2.5;
    ctx.fillText(text, textX, textY);
    ctx.save();
  };
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // размер шрифта
            weight: "bold", // жирный шрифт
          },
          padding: 20,
        },

        display: true,
        position: "bottom",
      },

      datalabels: {
        display: completedOrders > 0 && totalOrders > 0,
        align: "center",
        anchor: "center",
        color: "black",
        font: {
          weight: "bold",
          size: 16,
        },
        offset: 0,
      },
      centerText: {
        display: completedOrders > 0 && totalOrders > 0,
        text: completedOrders > totalOrders ? "Ты деятель" : "Ты проситель",
      },
    },
  };

  useEffect(() => {
    dispatch(getOrders(userId));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div
        className={
          "flex flex-col items-center justify-around mt-12 md:flex-row"
        }
      >
        <UserData />

        {/* <div className={"flex flex-col items-center"}>
          <img
            className={"object-cover h-64 scale-y-50 scale-x-50"}
            src='https://cdn-icons-png.flaticon.com/256/4297/4297918.png'
            alt='pic'
          />
          <div className='w-56 h-56 rounded-full shadow-lg border-green-500 text-center transition duration-300 ease-in-out transform hover:scale-110'>
            <div className=' flex flex-col items-center mt-12 '>
              <div className='text-green-800 font-bold text-3xl p-4 rounded-lg '>
                {user ? user.scores : ""}
              </div>
              <div className='text-xl font-bold text-green-700 whitespace-normal break-words'>
                очки Вашей кармы
              </div>
            </div>
          </div>
        </div>

        {completedOrders > 0 && totalOrders > 0 ? (
          <div className='ml-8'>
            <h2 className='text-2xl font-bold mb-8'>
              Диаграмма Вашей активности
            </h2>
            <Doughnut
              data={data}
              options={options}
              plugins={[centerTextPlugin]}
            />
          </div>
        ) : (
          <div>
            <div>Пока нет активностей</div>
            <img src={cryIcon} alt='pic' />
          </div>
        )} */}
      </div>
    </>
  );
}

export default ProfileBioPage;
