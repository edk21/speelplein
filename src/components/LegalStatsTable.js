import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { IoIosCreate } from 'react-icons/io';
import { Link } from 'react-router-dom';

const userName = "admin"
const passWord = "admin"


const LegalStatsTable = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [alreadyLogged, setAlreadyLogged] = useState(JSON.parse(localStorage.getItem("loggedIn")))
    const [myUser, setMyUser] = useState("")
    const [myPassword, setMyPassword] = useState("")

    useEffect(()=> {
        if(loggedIn){
            setAlreadyLogged(true);
            localStorage.setItem("loggedIn", JSON.stringify(loggedIn))
        }
    },[loggedIn])
    
    //setAlreadyLogged(JSON.parse(localStorage.getItem("loggedIn")))

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

    useEffect(() => {
        getAllRecords();
    }, []);

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        console.log(value)
        result = childs.filter((data) => {
            return data.surname.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });

        setFilteredData(result);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (myUser === userName && myPassword === passWord) {
            setLoggedIn(true)
            
        } else {
            setLoggedIn(false)
        }
    }


  return (
    <div className='mt-3'>
        {
              !alreadyLogged ? (
                  <form onSubmit={handleSubmit} className="mt-5 border p-3 rounded">
                      <div className="row mb-3">
                          <div className="col">
                              <label htmlFor="userName" className="col-sm-2 col-form-label">UserName</label>
                              <div className="col-sm-10">
                                  <input type="text" className="form-control" id="userName" autoComplete='off' onChange={(e) => setMyUser(e.target.value)} />
                              </div>
                          </div>
                          <div className="col">
                              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                              <div className="col-sm-10">
                                  <input type="password" className="form-control" id="inputPassword" autoComplete='off' onChange={(e) => setMyPassword(e.target.value)} />
                              </div>
                          </div>
                      </div>
                      <div className="col-auto">
                          <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
                      </div>
                  </form>
              ) : 
              alreadyLogged ?
              (
                <>
                <div className="row">
                    <div className='col-3'>
                        <input
                            className='form-control'
                            placeholder='Search By Name'
                            type='text'
                            onChange={(event) => handleSearch(event)}
                        />
                    </div>
                </div>
                <div className='table__wrapper'>
                    <div className='table-responsive table__wrapper1'>
                        <table
                            className='table table-striped table-bordered table-hover mt-5 w-auto text-nowrap'
                            style={{ marginTop: 20 }}
                        >
                            <thead className='table-dark table-rows'>
                                <tr>
                                    <th>#</th>
                                    <th>Surname</th>
                                    <th>Name</th>
                                    <th>Child Date Of Birth</th>
                                    <th>Street & box Nbr</th>
                                    <th>Postal Code</th>
                                    <th>Town</th>
                                    <th>Child SSN</th>
                                    <th>Presence</th>
                                    <th>Balance</th>
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
                                                background: child.street === '' ? '#dddf00' : '',
                                            }}>{child.street}</td>
                                            <td style={{
                                                background: child.PostalCode === '' ? '#dddf00' : '',
                                            }}>{child.postalCode}</td>
                                            <td style={{
                                                background: child.city === '' ? '#dddf00' : '',
                                            }}>{child.city}</td>
                                            <td style={{
                                                background: child.childSSN === '' ? '#dddf00' : '',
                                            }}>{child.childSSN}</td>
                                            <td>{child.presence}</td>
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
                                            >
                                                {child.balance} €
                                            </td>
                                            <td>
                                                <Link to={'/legalss/' + child._id}>
                                                    {' '}
                                                    <IoIosCreate className='icon-one' />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
              ) :(
                null
              )
        }
        
    </div>
  )
}

export default LegalStatsTable