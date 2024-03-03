import React from 'react';

function Table({data,headers,renderCell}) {
    return (
        <>
            {
                <table className="table   rounded  bg-gray-900 text-center shadow-sm">
                    <thead className='text-white'>
                        <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (

                            <tr key={rowIndex}>
                                {headers.map((header, colIndex) => (
                                <>
                                <td key={colIndex}>{renderCell(row, header)}</td>
                               
                                </>
                                ))}   
                            </tr>

                        ))}
                    </tbody>
                </table>
                
                                
            }
        </>
    );
}

export default Table;