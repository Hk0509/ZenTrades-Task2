import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fieldMapping = {
    "Product Id": "productId",
    "Subcategory": "subcategory",
    "Title" : "title",
    "Prices": "price",
    "Popularity": "popularity",
}

function Login() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [characterEncoding, setCharacterEncoding] = useState("");
  const [delimeter, setDelimeter] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [tempList, setTempList] = useState([]);
  const [defaultList, setDefaultList] = useState([
    "Product Id",
    "Subcategory",
    "Title",
    "Prices",
    "Popularity",
  ]);
  
  const [selectedFieldList, setSelectedFieldList] = useState([]);
  let currList = [];
  let navigate = useNavigate();

  const handleFileUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
  
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setSelectedFile(fileContent);
    };
  
    // Read the file as text
    reader.readAsText(file);
  };
  

  const fwd = ">>";
  const bwd = "<<";

  const nextButton = () => {

    if (!selectedFieldList.length || !selectedFile) return alert("Please select a field");
    let data = [], fields = [];
    selectedFieldList.map((field) =>{
        fields.push(fieldMapping[field]);
    })
    const parseData = JSON.parse(selectedFile);
    if(parseData && parseData.products){
        for (let key in parseData.products){
            data.push({...parseData.products[key], productId : key});
        }
    }
    // console.log(data);
    data.sort((a,b) => b.popularity - a.popularity);
    localStorage.setItem('myData', JSON.stringify(data));
    localStorage.setItem('myFields', JSON.stringify(fields));
    navigate("/data");
  }

  const addToList = (st) => {
     setTempList([...tempList, st]);
  };

  const handleRightButton = async () => {
    const newSelectedArray = [...selectedFieldList, ...tempList];
    setSelectedFieldList([...new Set(newSelectedArray)]);
    setTempList([]);
    const newDefaultList = defaultList.filter(item => !tempList.includes(item));
    setDefaultList(newDefaultList);
};

  const handleLeftButton = () => {
    const newDefaultArray = [...defaultList, ...tempList];
    setDefaultList([...new Set(newDefaultArray)]);
    setTempList([]);
    const newSelectedList = selectedFieldList.filter(item => !tempList.includes(item));
    setSelectedFieldList(newSelectedList);
  };
//   console.log(selectedFile);
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex">
        <div className="w-1/2 bg-white border border-gray-300 m-4 p-6 rounded-md shadow-md">
          <div className="m-4">
            <h3 className="text-xl font-semibold">Step 1:</h3>
          </div>
          <div className="p-6">
            <h3 className="my-3 text-lg font-semibold"> Select File </h3>
            <input
              type="file"
              onChange={handleFileUpload}
              className="my-3 p-2 border border-gray-300 rounded-md"
            />
            <p className="text-sm text-gray-600 my-3">
              Supported File Type(s): .CSV, .JSON
            </p>
          </div>
        </div>

        <div className="w-1/2 bg-white border border-gray-300 m-4 p-4 rounded-md shadow-md">
            <h1>Step 2: </h1>
          <label className="block m-0">
            File Type:
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="m-4 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </label>
          <label className="block m-0 ">
            Character Encoding:
            <select
              value={characterEncoding}
              onChange={(e) => setCharacterEncoding(e.target.value)}
              className="m-4 p-2 border border-gray-300 rounded-md"
            >
              <option value="utf-8">UTF-8</option>
            </select>
          </label>
          <label className="block m-0">
            Delimiter:
            <select
              value={delimeter}
              onChange={(e) => setDelimeter(e.target.value)}
              className="m-4 p-2 border border-gray-300 rounded-md"
            >
              <option value="comma">comma </option>
            </select>
          </label>
          <label className="block">
            Has Header:
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={() => setHasHeader(!hasHeader)}
              className="m-4 p-2"
            />
          </label>
        </div>
      </div>

      <div className="bg-white border border-gray-300 m-4 p-4 rounded-md shadow-md">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/3">
            <h1>Step3: </h1>
            <br/>
            <h2 className="text-lg font-semibold">Available Fields</h2>
            <div className="border border-gray-300 m-2 p-4">
              {defaultList.length !== 0 ? (
                defaultList.map((item, index) => (
                  <div key={index}>
                    <button className={`p-2 m-1 rounded-md bg-blue-500 text-white ${
                        tempList.includes(item) ? "bg-gray-500 text-white" : ""
                      }`}
                      onClick={() => addToList(item)}
                    >
                      {item}
                    </button>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-1/3">
            <button
              className="border border-gray-300 p-2 m-1 bg-gray-500 text-white rounded-md"
              onClick={() => handleRightButton()}
            >
              {fwd}
            </button>
            <button
              className="border border-gray-300 p-2 m-1 bg-gray-500 text-white rounded-md"
              onClick={() => handleLeftButton()}
            >
              {bwd}
            </button>
          </div>

          <div className="flex flex-col w-1/3">
            <br/><br/>
            <h2 className="text-lg font-semibold">Field to be Displayed</h2>
            <div className=" border border-gray-300 m-2 p-4">
              {selectedFieldList.length !== 0 ? (
                selectedFieldList.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => addToList(item)}
                      className={`p-2 m-1 rounded-md bg-green-500 text-white ${
                        tempList.includes(item) ? "bg-gray-500" : ""
                      }`}
                    >
                      {item}
                    </button>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-auto">
        <button
          onClick={() => nextButton()}
          className="bg-green-500 text-white p-2 m-5 rounded-md"
        >
          Next
        </button>
        <button
          onClick={() => window.location.reload()}
          className="text-red-500 mr-10"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Login;
