"use client";

import { evalQuestions } from "@/app/constants";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const ChartsResult = () => {
  const data = {
    labels: [
      "Very Dissatisfied",
      "Dissatisfied",
      "Neutral",
      "Satisfied",
      "Very Satisfied",
    ],
    datasets: [
      {
        label: "",
        backgroundColor: [
          "#ff7400",
          "#ff0000",
          "#ffc100",
          "#00ff00",
          "#0000ff",
        ],
        borderColor: "white",
        data: [20, 30, 10, 15, 10],
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full justify-start items-center mt-6">
      <div className="flex flex-col gap-5 max-w-[760px]">
        {evalQuestions.map((evalqs, number) => (
          <div
            key={number}
            className="flex flex-col gap-5 border border-checkbox-border bg-[#f9f9f9] rounded-md p-7 pb-8"
          >
            <div className="flex gap-4">
              <p>{evalqs.number}.</p>
              <h1>{evalqs.question}</h1>
            </div>
            <div className="flex justify-around items-center flex-wrap">
              <div className="w-48 mb-4 sm:mb-0">
                <Doughnut data={data} options={options} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 bg-[#ff7400]"></div>
                  <h1>Very Dissatisfied:</h1>
                  <p>20%</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 bg-[#ff0000]"></div>
                  <h1>Dissatisfied:</h1>
                  <p>30%</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 bg-[#ffc100]"></div>
                  <h1>Neutral:</h1>
                  <p>10%</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 bg-[#00ff00]"></div>
                  <h1>Satisfied:</h1>
                  <p>15%</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 bg-[#0000ff]"></div>
                  <h1>Very Satisfied:</h1>
                  <p>10%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsResult;
