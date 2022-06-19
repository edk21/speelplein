import React,{useState} from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Footer from './Footer';

//https://speelpleinapi.herokuapp.com/

const Create = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [school, setSchool] = useState('');
    const [level, setLevel] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [contact1, setContact1] = useState('');
    const [tel1, setTel1] = useState('');
    const [contact2, setContact2] = useState('');
    const [tel2, setTel2] = useState('');
    const [parentSSN, setParentSSN] = useState('');
    const [parentDOB, setParentDOB] = useState('');
    const [childSSN, setChildSSN] = useState('');
    const [email, setEmail] = useState('');
    const [allergies, setAllergies] = useState('');
    const [parentRemarks, setParentRemarks] = useState('');
    const [teamRemarks, setTeamRemarks] = useState('');
    const [presence, setPresence] = useState('');
    const [balance, setBalance] = useState(0);
    const [social, setSocial] = useState('');

    const myDate = new Date();
    const year = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();

    const date = day + ' / ' + month + ' / ' + year;
    console.log('the date: ', date);

    const handleSubmit = (e) => {
      e.preventDefault();

      if(username === "" || name === "" || dateOfBirth === "" || presence === "" || balance === ""  || social === ""){
        alert("Please fill in all the fields");
      }
      else if(balance < 0){
        alert("Please enter a positive balance number");
      }else{
        var newBalance;
        if (balance === null || parseInt(balance) < 0) {
          alert("Please enter a positive balance");
        }else if (parseInt(balance) === 0) {
          if (presence === 'present' && social === 'social tarief') {
            newBalance = -2;
            setBalance(newBalance);
          } else if (presence === 'present' && social === 'no social') {
            newBalance = -4;
            setBalance(newBalance);
          } else if (presence === 'abscent') {
            newBalance = 0;
            setBalance(newBalance);
          }
        } else if (parseInt(balance) > 0) {
          if (presence === 'present' && social === 'social tarief') {
            newBalance = parseInt(balance) - 2;
            setBalance(newBalance);
          } else if (presence === 'present' && social === 'no social') {
            newBalance = parseInt(balance) - 4;
            setBalance(newBalance);
          } else if (presence === 'abscent') {
            newBalance = parseInt(balance);
            setBalance(newBalance);
          }
        }

        const newChild = {
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
        axios
          .post('https://speelpleinapi.herokuapp.com/record/add', newChild)
          .then((response) => console.log(response.data));


        setUsername('');
        setName('');
        setDateOfBirth('');
        setSchool('');
        setLevel('');
        setStreet('');
        setPostalCode('');
        setCity('');
        setContact1('');
        setTel1('');
        setContact2('');
        setTel2('');
        setParentSSN('');
        setParentDOB('');
        setChildSSN('');
        setEmail('');
        setAllergies('');
        setParentRemarks('');
        setTeamRemarks('');
        setPresence('');
        setBalance(0);
        setSocial('');

        addStats();
      
        handleOnClick();
      }
      
    }

    const handleOnClick = () => {
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

    return (
      <div style={{ height: '100vh' }}>
        <div className='container border rounded' style={{ marginTop: 20 }}>
          <p className='text-muted fw-light'>Fields with stars are <strong className='text-decoration-underline fw-bold'>mandatory</strong></p>
          <h3 className='text-center'>Add a New child</h3>
          <form onSubmit={handleSubmit}>
            <div className='row mt-3'>
              <div className='col-md-4'>
                <label className='position-relative' htmlFor='surname'>Surname <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <input
                  id='surname'
                  type='text'
                  onChange={(event) => setUsername(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label className='position-relative' htmlFor='name'>Name <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <input
                  id='name'
                  type='text'
                  onChange={(event) => setName(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label className='position-relative' htmlFor='dateOfBirth'>Date Of Birth <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <input
                  id='dateOfBirth'
                  type='date'
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-2'>
                <label className='position-relative' htmlFor='balance'>Balance <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <input
                  id='balance'
                  type='number'
                  onChange={(event) => setBalance(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-5'>
                <label className='position-relative' htmlFor='presence'>Presence <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <select
                  id='presence'
                  type='text'
                  onChange={(event) => setPresence(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    Select an option
                  </option>
                  <option value='present'>Present</option>
                  <option value='abscent'>Abscent</option>
                </select>
              </div>
              <div className='col-md-5'>
                <label className='position-relative' htmlFor='social'>Social <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <select
                  id='social'
                  type='text'
                  onChange={(event) => setSocial(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    Select an option
                  </option>
                  <option value='no social'>No Social Tarief</option>
                  <option value='social tarief'>Social Tarief</option>
                </select>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-5'>
                <label htmlFor='school'>School</label>
                <input
                  id='school'
                  type='text'
                  onChange={(event) => setSchool(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3'>
                <label htmlFor='level'>Level</label>
                <select
                  id='level'
                  type='text'
                  onChange={(event) => setLevel(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    Select an option
                  </option>
                  <option value='primaire'>Primaire</option>
                  <option value='secondaire'>Secondaire</option>
                </select>
              </div>
              <div className='col-md-4'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  type='text'
                  onChange={(event) => setEmail(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-5'>
                <label className='' htmlFor='street'>Street & box Nbr</label>
                <input
                  id='street'
                  type='text'
                  onChange={(event) => setStreet(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3'>
                <label className='' htmlFor='postalCode'>Postal Code</label>
                <input
                  id='postalCode'
                  type='text'
                  onChange={(event) => setPostalCode(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label className='' htmlFor='city'>City</label>
                <input
                  id='city'
                  type='text'
                  onChange={(event) => setCity(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='contact1'>Contact: 1</label>
                <input
                  id='contact1'
                  type='text'
                  onChange={(event) => setContact1(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='tel1'>Tel: 1</label>
                <input
                  id='tel1'
                  type='text'
                  onChange={(event) => setTel1(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='contact2'>Contact: 2</label>
                <input
                  id='contact2'
                  type='text'
                  onChange={(event) => setContact2(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='tel2'>Tel: 2</label>
                <input
                  id='tel2'
                  type='text'
                  onChange={(event) => setTel2(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-4'>
                <label htmlFor='pssn'>Parent Social Security Nr</label>
                <input
                  id='pssn'
                  type='text'
                  onChange={(event) => setParentSSN(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='pdob'>Parent Date Of Birth</label>
                <input
                  id='pdob'
                  type='date'
                  onChange={(event) => setParentDOB(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='cssn'>Child Social Security Nr</label>
                <input
                  id='cssn'
                  type='text'
                  onChange={(event) => setChildSSN(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>

            </div>
            <div className='row mt-3'>
              <div className='col-md-4'>
                <label htmlFor='allergies'>Allergies</label>
                <input
                  id='allergies'
                  type='text'
                  onChange={(event) => setAllergies(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='parentRemarks'>Parent Remarks</label>
                <input
                  id='parentRemarks'
                  type='text'
                  onChange={(event) => setParentRemarks(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='teamRemarks'>Team Remarks</label>
                <input
                  id='teamRemarks'
                  type='text'
                  onChange={(event) => setTeamRemarks(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            
            <div className='form-group mt-3 pb-5'>
              <input
                type='submit'
                value='New Record'
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

export default Create
