"use client";
import { useState, useEffect } from "react";
// import { evalQuestions } from "@/app/constants";
import { supabase } from "@/utils/supabase/client";
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
import { useSelector } from "react-redux";
import { selectEmail } from "@/redux/slice/authSlice";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const ChartsResult = () => {
  const [evalQuestions, setEvalQuestions] = useState([
    {
      number: 1,
      question:
        "How satisfied are you with the overall performance of the company?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 2,
      question:
        "Did the company meet your expectations in terms of product/service quality?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 3,
      question:
        "Were your concerns and inquiries addressed promptly by the company's customer support?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 4,
      question:
        "How likely are you to recommend the company to others based on your experience?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 5,
      question:
        "How satisfied are you with the overall performance of the company?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 6,
      question:
        "How would you rate the company's commitment to ethical business practices?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 7,
      question:
        "How satisfied were you with the efficiency and accuracy of the company's delivery/service process?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 8,
      question:
        "How well did the company understand and fulfill your specific needs and requirements?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 9,
      question: "Was the company transparent regarding pricing and policies?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
    {
      number: 10,
      question: "Overall, how would you rate your experience with the company?",
      very_dissatisfied: 0,
      dissatisfied: 0,
      neutral: 0,
      satisfied: 0,
      very_satisfied: 0,
    },
  ]);

  const userEmail = useSelector(selectEmail);

  const options = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    if (userEmail) {
      const fetchEvaluation = async () => {
        const { data: evaluationData, error } = await supabase
          .from("evaluation")
          .select("evaluation")
          .eq("company_email", userEmail);

        if (error) {
          console.error("Error fetching data: ", error);
          return;
        }

        if (evaluationData && evaluationData.length > 0) {
          const counts = {};

          evalQuestions.forEach((question) => {
            counts[question.number] = {
              very_dissatisfied: 0,
              dissatisfied: 0,
              neutral: 0,
              satisfied: 0,
              very_satisfied: 0,
            };
          });

          evaluationData.forEach((entry) => {
            const evaluation = entry.evaluation;
            Object.keys(evaluation).forEach((key) => {
              const response = evaluation[key];
              if (counts[key]) {
                counts[key][response] += 1;
              }
            });
          });

          const percentages = evalQuestions.map((question) => {
            const totalResponses = Object.values(
              counts[question.number]
            ).reduce((acc, count) => acc + count, 0);
            const percentageData =
              totalResponses > 0
                ? Object.keys(counts[question.number]).map(
                    (key) =>
                      (counts[question.number][key] / totalResponses) * 100
                  )
                : [0, 0, 0, 0, 0];

            return {
              ...question,
              very_dissatisfied: percentageData[0] || 0,
              dissatisfied: percentageData[1] || 0,
              neutral: percentageData[2] || 0,
              satisfied: percentageData[3] || 0,
              very_satisfied: percentageData[4] || 0,
              data: {
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
                    data: [
                      percentageData[0] || 0,
                      percentageData[1] || 0,
                      percentageData[2] || 0,
                      percentageData[3] || 0,
                      percentageData[4] || 0,
                    ],
                  },
                ],
              },
            };
          });

          setEvalQuestions(percentages);
        }
      };

      fetchEvaluation();
    }

    console.log(evalQuestions);
  }, [userEmail, evalQuestions]);

  return (
    <div className="w-full justify-start items-center mt-6">
      {evalQuestions && (
        <div className="flex flex-col gap-5 max-w-[760px] mx-auto">
          {evalQuestions.map((evalqs, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 border border-checkbox-border bg-[#f9f9f9] rounded-md p-7 pb-8"
            >
              <div className="flex gap-4">
                <p>{evalqs.number}.</p>
                <h1>{evalqs.question}</h1>
              </div>
              <div className="flex justify-around items-center flex-wrap">
                <div className="w-48 mb-4 sm:mb-0">
                  {evalqs.data && (
                    <Doughnut data={evalqs.data} options={options} />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-[#ff7400]"></div>
                    <h1>Very Dissatisfied:</h1>
                    <p>{evalqs.very_dissatisfied}%</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-[#ff0000]"></div>
                    <h1>Dissatisfied:</h1>
                    <p>{evalqs.dissatisfied}%</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-[#ffc100]"></div>
                    <h1>Neutral:</h1>
                    <p>{evalqs.neutral}%</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-[#00ff00]"></div>
                    <h1>Satisfied:</h1>
                    <p>{evalqs.satisfied}%</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-[#0000ff]"></div>
                    <h1>Very Satisfied:</h1>
                    <p>{evalqs.very_satisfied}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartsResult;
