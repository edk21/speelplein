import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { IoIosTrash, IoIosCreate } from 'react-icons/io';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Footer from './Footer';
import Spinner from './Spinner';

//http://localhost:5001/

const ChildrenList = () => {

    const [childs, setChild] = useState([]);
    // const [filteredData, setFilteredData] = useState(childs);    
    // const [newfilteredData, setNewFilteredData] = useState(childs);    
    const [query, setQuery] = useState("")

    const getAllRecords = async () => {
        await axios
          .get('https://speelpleinapi.herokuapp.com/record/')
          .then((response) => {
            setChild(response.data);
            //setFilteredData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const deleteRecord = async (id) => {
        console.log("to delete: ", id);
        await axios.delete(`https://speelpleinapi.herokuapp.com/${id}`);
        getAllRecords();
    }

    useEffect(() => {
      getAllRecords();
    }, [childs]);

    const handleDelete = (id) => {
      if (window.confirm('Weet je zeker dat je wilt verwijderen?')){
            deleteRecord(id);
        }else{

        }
        getAllRecords();
    }

    // const handleSearch = (event) => {
    //   let value = event.target.value.toLowerCase();
    //   let result = [];
    //   let newResult = [];
    //   console.log(value)

    //   newResult = childs.filter((data) => {
    //     return data.name.toLowerCase().includes(value)
    //     })

    //   result = childs.filter((data) => {
    //     return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    //   });

    //   setFilteredData(result);
    //   setNewFilteredData(newResult);
    // };

    if(childs.length === 0){
        return <Spinner />
    }

    return (
      <div style={{position: "relative"}}>
        <div className='table__container'>
          <h3 className='text-center py-3 table__text'>Ingeschreven Kinderen</h3>
          <div className='row mb-3'>
            <div className='col-4'>
              <input
                className='form-control'
                placeholder='zoeken op naam of achternaam'
                type='text'
                // onChange={(event) => handleSearch(event)}
                onChange={(e)=> setQuery(e.target.value)}
              />
            </div>

            <div className='to-excel col-3'>
              <ReactHTMLTableToExcel
                className='btn btn-primary '
                table='emp-table'
                filename='Emp Excel file'
                sheet='Sheet'
                buttonText='Exporteren naar Excel'
              />
            </div>
            
          </div>
          <div className='table__wrapper'>
            <div className='table-responsive table__wrapper1'>
              <table
                className='table table-striped table-bordered table-hover w-auto text-nowrap '
                id='emp-table'
                style={{ marginTop: 20 }}
              >
                <thead className='table-dark table-rows position-sticky sticky-top'>
                  <tr>
                    <th>#</th>
                    <th>Update</th>
                    {/* <th>#</th> */}
                    
                    <th>Achtenaam</th>
                    <th>Voornaam</th>
                    <th>Saldo</th>
                    <th>Social</th>
                    <th>Kind Geboortedatum</th>
                    <th>School</th>
                    <th>Level</th>
                    <th>Straatnaam en huisnummer</th>
                    <th>PostCode</th>
                    <th>Gemeente</th>
                    <th>Contact1</th>
                    <th>Tel:1</th>
                    <th>Contact2</th>
                    <th>Tel:2</th>
                    <th>Ouder RN</th>
                    <th>Ouder Geboortedatum</th>
                    <th>Kind RN</th>
                    <th>Email</th>
                    <th>Allergieën</th>
                    <th>Opmerkingen ouders</th>
                    <th>Opmerkingen pleinleiding</th>
                    <th>Medische Fiche</th>
                    <th>Week 1</th>
                    <th>Week 2</th>
                    <th>Week 3</th>
                    <th>Week 4</th>
                    {/* <th>Total Deposit</th> */}
                    
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {childs.filter((child)=> (child.name?.toLowerCase().includes(query.toLowerCase())) || (child.surname.toLowerCase().includes(query.toLowerCase()))).map((child, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>
                          <Link to={'/edit/' + child._id}>
                            {' '}
                            <IoIosCreate className='icon-one' />
                          </Link>
                        </td>
                        {/* <td>{index}</td> */}
                        
                        <td>{child.surname}</td>
                        <td>{child.name}</td>
                        <td
                          style={{
                            color: `${child.balance <= 0 ? 'white' : 'black'}`,
                            backgroundColor: `${child.balance < 0
                              ? 'red'
                              : child.balance <= 4
                                ? 'orange'
                                : 'white'
                              }`,
                            fontWeight: 700,
                          }}
                          //contenteditable="true"
                        >
                          {child.balance} €
                        </td>
                        <td>{child.social}</td>
                        <td style={{
                          background: child.dateOfBirth === '' ? '#dddf00' : child.dateOfBirth === null ? '#dddf00' : '',
                        }}>{child.dateOfBirth}</td>
                        <td style={{
                          background: child.school === '' ? '#dddf00' : '',
                        }}>{child.school}</td>
                        <td style={{
                          background: child.level === '' ? '#dddf00' : '',
                        }}>{child.level}</td>
                        <td style={{
                          background: child.street === '' ? '#dddf00' : child.street === null ? '#dddf00' : '',
                        }}>{child.street}</td>
                        <td style={{
                          background: child.postalCode === null ? '#dddf00' : child.postalCode === '' ? "#dddf00" : '',
                        }}>{child.postalCode}</td>
                        <td style={{
                          background: child.city === null ? '#dddf00' : child.city === "" ? '#dddf00' : "",
                        }}>{child.city}</td>
                        <td style={{
                          background: child.contact1 === null ? '#dddf00' : child.contact1 === "" ? '#dddf00' : "",
                        }}>{child.contact1}</td>
                        <td style={{
                          background: child.tel1 === '' ? '#dddf00' : '',
                        }}>{child.tel1}</td>
                        <td>{child.contact2}</td>
                        <td>{child.tel2}</td>
                        <td style={{
                          background: child.parentSSN === '' ? '#dddf00' : '',
                        }}>{child.parentSSN}</td>
                        <td style={{
                          background: child.parentDOB === '' ? '#dddf00' : '',
                        }}>{child.parentDOB}</td>
                        <td style={{
                          background: child.childSSN === '' ? '#dddf00' : '',
                        }}>{child.childSSN}</td>
                        <td style={{
                          background: child.email === '' ? '#dddf00' : '',
                        }}>{child.email}</td>
                        
                        <td style={{
                          background: child.allergies === '' ? '#dddf00' : '',
                        }}>{child.allergies}</td>
                        <td>{child.parentRemarks}</td>
                        <td>{child.teamRemarks}</td>
                        <td><input className='form-check-input' type="checkbox" name="medical" checked={child.medicals === "checked" ? "checked" : ""} /></td>
                        <td style={{ textTransform: "uppercase", color: "#f5f5f5", fontWeight: "600", backgroundColor: child.week1 === null ? "red" : child.week1 === "" ? "red" : child.week1 === "afwezig" ? "red" : "#8ac926" }}>{child.week1 === null ? "afwezig" : child.week1 === "" ? "afwezig" : child.week1}</td>
                        <td style={{ textTransform: "uppercase", color: "#f5f5f5", fontWeight: "600", backgroundColor: child.week2 === null ? "red" : child.week2 === "" ? "red" : child.week2 === "afwezig" ? "red" : "#8ac926" }}>{child.week2 === null ? "afwezig" : child.week2 === "" ? "afwezig" : child.week2}</td>
                        <td style={{ textTransform: "uppercase", color: "#f5f5f5", fontWeight: "600", backgroundColor: child.week3 === null ? "red" : child.week3 === "" ? "red" : child.week3 === "afwezig" ? "red" : "#8ac926" }}>{child.week3 === null ? "afwezig" : child.week3 === "" ? "afwezig" : child.week3}</td>
                        <td style={{ textTransform: "uppercase", color: "#f5f5f5", fontWeight: "600", backgroundColor: child.week4 === null ? "red" : child.week4 === "" ? "red" : child.week4 === "afwezig" ? "red" : "#8ac926" }}>{child.week4 === null ? "afwezig" : child.week4 === "" ? "afwezig" : child.week4}</td>
                        {/* <td>{child.totalAmount}</td> */}
                        
                        <td>
                          <Link
                            to={'/'}
                            onClick={() => handleDelete(child._id)}
                          >
                            <IoIosTrash className='icon-two' />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default ChildrenList
