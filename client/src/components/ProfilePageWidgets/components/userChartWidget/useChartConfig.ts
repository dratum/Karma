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

export const useChartConfig = (
  completedOrders: number,
  totalOrders: number
) => {
  const data = {
    labels: ["Завки в работе", "Опубликованные заявки"],
    datasets: [
      {
        data: [completedOrders, totalOrders],
        backgroundColor: ["#9370DB", "#36A2EB"],
        borderColor: "#11bf70",
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
    const fontSize = (height / 0).toFixed(2);
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
            size: 16,
            weight: "bold",
          },
          padding: 20,
        },

        display: true,
        position: "bottom",
      },

      datalabels: {
        display: completedOrders > 0 || totalOrders > 0,
        align: "left",
        anchor: "center",
        color: "black",
        font: {
          weight: "bold",
          size: 16,
        },
        offset: 0,
      },
      centerText: {
        display: completedOrders > 0 || totalOrders > 0,
        text: completedOrders > totalOrders ? "Ты деятель" : "Ты проситель",
      },
    },
  };
  return { data, options, centerTextPlugin };
};
