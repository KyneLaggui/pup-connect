"use client"
import React, { useState } from 'react'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { evalQuestions } from '@/app/constants';

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
        labels: ['Math', 'Science', 'Language', 'Social Studies', 'Sports', 'Arts'],
        datasets: [{
            label: 'Performance Grades',
            backgroundColor: ['#ff7400', '#ff0000', '#ffc100', '#00ff00', '#0000ff', '#ff00ff'],
            borderColor: 'white',
            data: [20, 30, 10, 15, 10, ], 
        }]
    };
    
    const options = {
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            }
        }
    };

  return (
    <div className='w-full justify-start container-sidebar items-center'>
        <div className='flex flex-col gap-5'>
            {evalQuestions.map((evalqs, number)=>(
                <div key={number} className='flex flex-col gap-5 border border-checkbox-border bg-[#f9f9f9] rounded-md p-7 pb-8'>
                    <div className='flex gap-4'>
                        <p>{evalqs.number}.</p>
                        <h1>{evalqs.question}</h1>
                    </div>
                    <div className='flex justify-center'>
                        <div className='w-60'>
                            <Doughnut 
                                data = {data}
                                options = {options}
                            ></Doughnut>
                        </div>
                    </div>
                    
                    
                </div>
                            
            ))}
        </div>
        
    </div>
    

  )
}

export default ChartsResult