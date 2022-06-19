import React,{useState, useEffect} from 'react'
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { IoIosTrash, IoIosCreate } from 'react-icons/io';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Footer from './Footer';
import Spinner from './Spinner';

//http://localhost:5001/

const ChildrenList = () => {
  const location = useLocation();

    const [childs, setChild] = useState([]);
    const [filteredData, setFilteredData] = useState(childs);    

    const getAllRecords = async () => {
        await axios
          .get('https://speelpleinapi.herokuapp.com/record/')
          .then((response) => {
            setChild(response.data);
            setFilteredData(response.data)
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
    }, [location.key]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to DELETE?')){
            deleteRecord(id);
        }else{

        }
        getAllRecords();
    }

    const handleSearch = (event) => {
      let value = event.target.value.toLowerCase();
      let result = [];
      console.log(value)
      result = childs.filter((data) => {
        return data.surname.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });

      setFilteredData(result);
    };

    if(childs.length === 0){
        return <Spinner />
    }

    return (
      <div style={{position: "relative"}}>
        <div className='table__container'>
          <h3 className='text-center py-3 table__text'>Children List</h3>
          <div className='row'>
            <div className='col-3'>
              <input
                className='form-control'
                placeholder='Search By Name'
                type='text'
                onChange={(event) => handleSearch(event)}
              />
            </div>

            <div className='to-excel col-3'>
              <ReactHTMLTableToExcel
                className='btn btn-primary '
                table='emp-table'
                filename='Emp Excel file'
                sheet='Sheet'
                buttonText='Export to Excel'
              />
            </div>
          </div>
          <div className='table__wrapper'>
            <div className='table-responsive table__wrapper1'>
              <table
                className='table table-striped table-bordered table-hover mt-5 w-auto text-nowrap'
                id='emp-table'
                style={{ marginTop: 20 }}
              >
                <thead className='table-dark table-rows'>
                  <tr>
                    <th>#</th>
                    <th>Surname</th>
                    <th>Name</th>
                    <th>Child Date Of Birth</th>
                    <th>School</th>
                    <th>Level</th>
                    <th>Street & box Nbr</th>
                    <th>Postal Code</th>
                    <th>Town</th>
                    <th>Contact1</th>
                    <th>Tel:1</th>
                    <th>Contact2</th>
                    <th>Tel:2</th>
                    <th>Parent SSN</th>
                    <th>Parent Date of Birth</th>
                    <th>Child SSN</th>
                    <th>Email</th>
                    <th>Allergies</th>
                    <th>Parent Remarks</th>
                    <th>Team Remarks</th>
                    <th>Presence</th>
                    <th>Balance</th>
                    <th>Social</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((child, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{child.surname}</td>
                        <td>{child.name}</td>
                        <td>{child.dateOfBirth}</td>
                        <td style={{
                          background: child.school === '' ? '#dddf00' : '',
                        }}>{child.school}</td>
                        <td style={{
                          background: child.level === '' ? '#dddf00' : '',
                        }}>{child.level}</td>
                        <td style={{
                          background: child.street === '' ? '#dddf00' : '',
                        }}>{child.street}</td>
                        <td style={{
                          background: child.PostalCode === '' ? '#dddf00' : '',
                        }}>{child.postalCode}</td>
                        <td style={{
                          background: child.city === '' ? '#dddf00' : '',
                        }}>{child.city}</td>
                        <td style={{
                          background: child.contact1 === '' ? '#dddf00' : '',
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
                        <td>{child.presence}</td>
                        <td
                          style={{
                            color: `${child.balance <= 0 ? 'white' : 'black'}`,
                            backgroundColor: `${
                              child.balance < 0
                                ? 'red'
                                : child.balance <= 4
                                ? 'orange'
                                : 'white'
                            }`,
                            fontWeight: 700,
                          }}
                        >
                          {child.balance} €
                        </td>
                        <td>{child.social}</td>
                        <td>
                          <Link to={'/edit/' + child._id}>
                            {' '}
                            <IoIosCreate className='icon-one' />
                          </Link>
                        </td>
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
