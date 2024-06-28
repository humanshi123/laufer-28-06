
import React, { useState } from 'react';

const TableData = ({ tableBodyData }) => {
  const [selectedOptions, setSelectedOptions] = useState(Array(17).fill('Option 1'));

  const handleSelectChange = (index, event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <table className='my-[50px] custom-table w-full'>
      <thead>
        <tr>
          {[...Array(17).keys()].map((colIndex) => (
            <th className='border border-slate-300' key={colIndex}>
              <select value={selectedOptions[colIndex]} onChange={(event) => handleSelectChange(colIndex, event)}>
                <option value="CD">CD</option>
                <option value="IS">IS</option>
                <option value="TK">TK</option>
                <option value="H">H</option>
                <option value="E">E</option>
                <option value="ST">ST</option>
                {/* Add more options if needed */}
              </select>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {tableBodyData.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {rowData.map((cellData, colIndex) => (
              <td className='border border-slate-300' key={colIndex}>{cellData}</td>
            ))}
          </tr>
        ))}
        {tableBodyData.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {rowData.map((cellData, colIndex) => (
              <td className='border border-slate-300' key={colIndex}>
                {((rowIndex === 0 && colIndex !== 0) || (rowIndex === 3 && colIndex !== 0)) ? ( // Check if it's the first or fourth row and not the first column
                  <select value={selectedOptions[colIndex]} onChange={(event) => handleSelectChange(colIndex, event)}>
                    <option value="CD">CD</option>
                <option value="IS">IS</option>
                <option value="TK">TK</option>
                <option value="H">H</option>
                <option value="E">E</option>
                <option value="ST">ST</option>
                    {/* Add more options if needed */}
                  </select>
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;
