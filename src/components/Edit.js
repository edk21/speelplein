import React,{useEffect, useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Footer from './Footer'

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log("child: ", id)

    const myDate = new Date();
    const year = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();

    const date = day + ' / ' + month + ' / ' + year;

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [school, setSchool] = useState("");
    const [level, setLevel] = useState("");
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [contact1, setContact1] = useState("");
    const [tel1, setTel1] = useState("");
    const [contact2, setContact2] = useState("");
    const [tel2, setTel2] = useState("");
    const [parentSSN, setParentSSN] = useState("");
    const [parentDOB, setParentDOB] = useState("");
    const [childSSN, setChildSSN] = useState("");
    const [email, setEmail] = useState("");
    const [allergies, setAllergies] = useState("");
    const [parentRemarks, setParentRemarks] = useState("");
    const [teamRemarks, setTeamRemarks] = useState("");
    const [presence, setPresence] = useState("");
    const [balance, setBalance] = useState(0);
    const [social, setSocial] = useState("");
    const [addBalance, setAddBalance] = useState(0);

    useEffect(() => {
      axios
        .get(`https://speelpleinapi.herokuapp.com/record/${id}`)
        .then((response) => {
          // console.log('response: ', response);
          setUsername(response.data.surname);
          setName(response.data.name);
          setDateOfBirth(response.data.dateOfBirth);
          setSchool(response.data.school);
          setLevel(response.data.level);
          setStreet(response.data.street);
          setPostalCode(response.data.postalCode);
          setCity(response.data.city);
          setContact1(response.data.contact1);
          setTel1(response.data.tel1);
          setContact2(response.data.contact2);
          setTel2(response.data.tel2);
          setParentSSN(response.data.parentSSN);
          setParentDOB(response.data.parentDOB);
          setChildSSN(response.data.childSSN);
          setEmail(response.data.email);
          setAllergies(response.data.allergies);
          setParentRemarks(response.data.parentRemarks);
          setTeamRemarks(response.data.teamRemarks);
          setPresence(response.data.presence);
          setBalance(response.data.balance);
          setSocial(response.data.social);
        })
        .catch(function (err) {
          console.log(err);
        });
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();

        var newBalance = 0;
        if(addBalance !== 0){
          if(presence === 'present' && social === 'no social'){
            newBalance = parseInt(addBalance) + parseInt(balance) - 4;
            //setBalance(newBalance);
          }else if(presence === 'present' && social === 'social tarief'){
            newBalance = parseInt(addBalance) + parseInt(balance) - 2;
            //setBalance(newBalance);
          }else if(presence === 'abscent'){
            newBalance = parseInt(addBalance) + parseInt(balance);
            //setBalance(newBalance);
          }
        }else if(addBalance === 0){
          if (presence === 'present' && social === 'no social') {
            newBalance = parseInt(balance) - 4;
            //setBalance(newBalance);
          } else if (presence === 'present' && social === 'social tarief') {
            newBalance = parseInt(balance) - 2;
            //setBalance(newBalance);
          } else if(presence === 'abscent'){
            newBalance = parseInt(balance)
          }
        }
        
        const Obj = {
          surname: username,
          name: name,
          dateOfBirth: dateOfBirth,
          school: school,
          level: level,
          street: street,
          postalCode: postalCode,
          city: city,
          contact1: contact1,
          tel1: tel1,
          contact2: contact2,
          tel2: tel2,
          parentSSN: parentSSN,
          parentDOB: parentDOB,
          childSSN: childSSN,
          email: email,
          allergies: allergies,
          parentRemarks: parentRemarks,
          teamRemarks: teamRemarks,
          presence: presence,
          balance: newBalance,
          social: social,
        };
        console.log("Obj: ", Obj)

        axios
          .put(`https://speelpleinapi.herokuapp.com/update/${id}`, Obj)
          .then((res) => console.log('res.data: ', res.data));
        
        addStats();
        
        navigate("/")
    }

    const addStats = async () => {
      if (presence === 'present') {
        let statBalance;
        if (social === 'no social') {
          statBalance = 4;
        } else {
          statBalance = 2;
        }
        const newStat = {
          name: username + ' ' + name,
          balance: statBalance,
          social: social,
          date: date,
        };
        console.log('the newStat: ', newStat);

        await axios
          .post(
            'https://speelpleinapi.herokuapp.com/record/stats/add',
            newStat
          )
          .then((response) => console.log(response.data));
      }
    };

    const handleOnClick = () => {
        navigate("/")
    }
    return (
      <div>
        <div className='container border rounded mt-3 pb-5'>
          <h3 className='text-center'>Update Record</h3>
          <form onSubmit={handleSubmit}>
            <div className='row mt-3'>
              <div className='col-md-5'>
                <label htmlFor='surname'>Surname</label>
                <input
                  id='surname'
                  type='text'
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-5'>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-2'>
                <label htmlFor='dateOfBirth'>Date Of Birth</label>
                <input
                  id='dateOfBirth'
                  type='text'
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-5 col-sm-6'>
                <label htmlFor='street'>Street & box Nbr</label>
                <input
                  id='street'
                  type='text'
                  value={street}
                  onChange={(event) => setStreet(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-2 col-sm-6'>
                <label htmlFor='postalCode'>Postal Code</label>
                <input
                  id='postalCode'
                  type='text'
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-5 col-sm-6'>
                <label htmlFor='city'>City</label>
                <input
                  id='city'
                  type='text'
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-5 col-sm-6'>
                <label htmlFor='school'>School</label>
                <input
                  id='school'
                  type='text'
                  value={school}
                  onChange={(event) => setSchool(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-2 col-sm-6'>
                <label htmlFor='level'>Level</label>
                <select
                  id='level'
                  type='text'
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  className='form-control'
                >
                  <option value='primaire'>Primaire</option>
                  <option value='secondaire'>Secondaire</option>
                </select>
              </div>
              <div className='col-md-5 col-sm-6'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  type='text'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='contact1'>Contact: 1</label>
                <input
                  id='contact1'
                  type='text'
                  value={contact1}
                  onChange={(event) => setContact1(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='tel1'>Tel: 1</label>
                <input
                  id='tel1'
                  type='text'
                  value={tel1}
                  onChange={(event) => setTel1(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='contact2'>Contact: 2</label>
                <input
                  id='contact2'
                  type='text'
                  value={contact2}
                  onChange={(event) => setContact2(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='tel2'>Tel: 2</label>
                <input
                  id='tel2'
                  type='text'
                  value={tel2}
                  onChange={(event) => setTel2(event.target.value)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-4'>
                <label htmlFor='pssn'>Parent Social Security Nr</label>
                <input
                  id='pssn'
                  type='text'
                  value={parentSSN}
                  onChange={(event) => setParentSSN(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='pdob'>Parent Date Of Birth</label>
                <input
                  id='pdob'
                  type='date'
                  value={parentDOB}
                  onChange={(event) => setParentDOB(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='cssn'>Child Social Security Nr</label>
                <input
                  id='cssn'
                  type='text'
                  value={childSSN}
                  onChange={(event) => setChildSSN(event.target.value)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-6 col-sm-12'>
                <label htmlFor='parentRemarks'>Parent Remarks</label>
                <input
                  id='parentRemarks'
                  type='text'
                  value={parentRemarks}
                  onChange={(event) => setParentRemarks(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-6 col-sm-12'>
                <label htmlFor='teamRemarks'>Team Remarks</label>
                <input
                  id='teamRemarks'
                  type='text'
                  value={teamRemarks}
                  onChange={(event) => setTeamRemarks(event.target.value)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-8 col-sm-12'>
                <label htmlFor='allergies'>Allergies</label>
                <input
                  id='allergies'
                  type='text'
                  value={allergies}
                  onChange={(event) => setAllergies(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-2 col-sm-4'>
                <label htmlFor='presence'>Presence</label>
                <select
                  id='presence'
                  type='text'
                  value={presence}
                  onChange={(event) => setPresence(event.target.value)}
                  className='form-control'
                >
                  <option value='present'>present</option>
                  <option value='abscent'>abscent</option>
                </select>
              </div>

              <div className='col-md-2 col-sm-4'>
                <label htmlFor='social'>Social</label>
                <select
                  id='social'
                  type='text'
                  value={social}
                  onChange={(event) => setSocial(event.target.value)}
                  className='form-control'
                >
                  <option value='no social'>no social</option>
                  <option value='social tarief'>social tarief</option>
                  <option selected value=''></option>
                </select>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-2 col-sm-7'>
                <label htmlFor='balance'>Balance</label>
                <input
                  id='balance'
                  type='number'
                  value={balance}
                  //onChange={(event) => setBalance(event.target.value)}
                  //onChange={handleChange}
                  className='form-control'
                  style={{ background: `${balance < 0 ? 'red' : 'green'}` }}
                />
              </div>
              <div className='col-md-2 col-sm-7'>
                <label htmlFor='addBalance'>Add Balance</label>
                <input
                  id='addBalance'
                  type='number'
                  value={addBalance}
                  onChange={(event) => setAddBalance(event.target.value)}
                  className='form-control'
                />
              </div>
            </div>
            <div className='form-group mt-3'>
              <input
                type='submit'
                value='Update Record'
                className='btn btn-primary'
              />
              <input
                onClick={handleOnClick}
                value='Home'
                className='btn btn-secondary mx-3'
              />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
}

export default Edit
