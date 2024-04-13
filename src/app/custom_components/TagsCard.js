import React from 'react';

const TagsCard = ({ tags }) => { 
    return (
        <div className='flex gap-1'>
            {tags.map((tag, index) => ( 
                <div className='py-1 px-2 bg-blue-50 border border-blue-100 rounded-md whitespace-nowrap' key={index}>
                    <p className='text-xs text-blue-900 font-medium'>{tag}</p>
                </div>
            ))}
        </div>
    );
};

export default TagsCard;
