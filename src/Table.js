import React from 'react'

function Table(props) {
    const data = JSON.parse(localStorage.getItem('myData'));
    // const dataArray = Object.values(data?.products);
    // const location = useLocation();
    const fieldNames = JSON.parse(localStorage.getItem('myFields'));
    // console.log(data);
    console.log(fieldNames);
  return (
    <div>
         <table>
      <thead>
        <tr>
          {fieldNames.map((fieldName, index) => (
            <th key={index}>{fieldName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {fieldNames.map((fieldName, innerIndex) => (
              <td key={innerIndex}>{item[fieldName]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Table