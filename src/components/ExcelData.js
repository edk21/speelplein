import React,{useState} from 'react'
import { Link } from "react-router-dom"
import * as XLSX from "xlsx"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { IoIosCreate, IoIosTrash } from 'react-icons/io';
import axios from 'axios';
import Footer from './Footer';


const ExcelData = () => {
  const [items, setItems] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [goodJsonData, setGoodJsonData] = useState();
  //console.log('items', items);
  //console.log('json Data', jsonData);
  //console.log('good json Data', goodJsonData);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];
        //console.log("work sheet name", wsname)

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        setJsonData(data);
        const testData = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        const converted = convertToJson(testData)
        setGoodJsonData(converted)

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log('excel data: ', d);
      setItems(d);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('http://localhost:5001/record/addAll', goodJsonData)
      .then((response) => console.log(response.data));
  }

  const convertToJson = (csv) => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <input
          type='file'
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
        <div>
          <Link to='/'>
            <button
              type='button'
              className='btn btn-info'
              style={{ marginBottom: 20 }}
            >
              Back Home
            </button>
          </Link>
          <Link to='/qrGenerator'>
            <button
              type='button'
              className='btn btn-info'
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
              Generate QR
            </button>
          </Link>
        </div>
      </div>

      <table
        className='table table-striped table-hover table-bordered container'
        id='emp-table'
      >
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Surname</th>
            <th scope='col'>Name</th>
            <th scope='col'>DateOfBirth</th>
            <th scope='col'>School</th>
            <th scope='col'>Level</th>
            <th scope='col'>Address</th>
            <th scope='col'>Contact1</th>
            <th scope='col'>Tel:1</th>
            <th scope='col'>Contact2</th>
            <th scope='col'>Tel:2</th>
            <th scope='col'>Allergies</th>
            <th scope='col'>Email</th>
            <th scope='col'>ParentRemarks</th>
            <th scope='col'>TeamRemarks</th>
            <th scope='col'>Balance</th>
            <th scope='col'>Social</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((d, index) => (
            <tr key={index}>
              <th scope='row'>{index}</th>
              <td>{d.surname}</td>
              <td>{d.name}</td>
              <td>{d.dateOfBirth}</td>
              <td>{d.school}</td>
              <td>{d.level}</td>
              <td>{d.address}</td>
              <td>{d.contact1}</td>
              <td>{d.tel1}</td>
              <td>{d.contact2}</td>
              <td>{d.tel2}</td>
              <td>{d.allergies}</td>
              <td>{d.email}</td>
              <td>{d.parentRemarks}</td>
              <td>{d.teamRemarks}</td>
              <td>{d.balance}</td>
              <td>{d.social}</td>
              <td>
                <Link to={'/edit/'}>
                  {' '}
                  <IoIosCreate className='icon-one' />
                </Link>
              </td>
              <td>
                <IoIosTrash
                  className='Icon-two'
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactHTMLTableToExcel
        className='btn btn-primary ml-5 my-4'
        table='emp-table'
        filename='Emp Excel file'
        sheet='Sheet'
        buttonText='Export to Excel'
      />
      <button
        type='button'
        className='btn btn-primary'
        style={{ marginLeft: 20 }}
        onClick={handleSubmit}
      >
        Save File to DB
      </button>
      <Footer />
    </div>
  );
}

export default ExcelData
