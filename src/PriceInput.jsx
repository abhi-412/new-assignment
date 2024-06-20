import React from 'react';

const PriceInput = ({ id, label, icon,val, placeholder,onBl, onCh}) => {
  return (
    <div className="mb-4 flex gap-3 items-center">
      {/* <label htmlFor={id} className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
        {label}
      </label> */}
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-md border-gray-300 rounded-r-none dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {icon}
        </span>
        <input
          type='number'
          id={id}
          value={val}
          onBlur={onBl}
          placeholder={placeholder}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          onChange={onCh}
        />
      </div>
    </div>
  );
};

export default PriceInput;
