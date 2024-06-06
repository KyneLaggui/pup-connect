"use client"
import React, { useState } from 'react'

const page = () => {
    const [activeTab, setActiveTab] = useState('charts');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
  return (
    <div className='container-sidebar'>
        <div className='flex gap-2'>
            <button
            className={activeTab === 'charts' ? 'active' : ''}
            onClick={() => handleTabClick('charts')}
            >
            Charts
            </button>
            <button
            className={activeTab === 'table' ? 'active' : ''}
            onClick={() => handleTabClick('table')}
            >
            Table
            </button>
        </div>

        <div className={`recipient-box-container ${activeTab === 'charts' ? '' : 'invisible'}`}>
            <h1>Charts</h1>
        </div>
        
        <div className={`cmc-quiz-components ${activeTab === 'table' ? '' : 'invisible'}`}>
            <h1>Table</h1>
        </div>
               


    </div>
  )
}

export default page