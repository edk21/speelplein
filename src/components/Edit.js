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
    const [medicals, setMedical] = useState("");
    const [parentRemarks, setParentRemarks] = useState("");
    const [teamRemarks, setTeamRemarks] = useState("");
    const [week1, setWeek1] = useState('');
    const [week2, setWeek2] = useState('');
    const [week3, setWeek3] = useState('');
    const [week4, setWeek4] = useState('');
    const [presence, setPresence] = useState("");
    const [balance, setBalance] = useState(0);
    const [social, setSocial] = useState("");
    const [addBalance, setAddBalance] = useState(0);
    const [isChecked, setIsChecked] = useState(false);

  //console.log("isChecked: ", isChecked)
  //console.log("medical: ", medicals)

  const handleChecked = (e) => {
    if (e.target.checked) {
      setMedical("checked")
      setIsChecked(!isChecked)
    } else {
      setMedical("not-checked")
      setIsChecked(!isChecked)
    }
  }

    useEffect(() => {
      axios
        .get(`https://speelpleinapi.herokuapp.com/record/${id}`)
        .then((response) => {
          console.log('response: ', response.data.medicals);
        
          setUsername(response.data.surname);
          setName(response.data.name);
          setDateOfBirth(response.data.dateOfBirth);
          if(response.data.school === null){
            setSchool("")
          }else {
            setSchool(response.data.school);
          }
          
          if (response.data.level === null) {
            setLevel("")
          } else {
            setLevel(response.data.school);
          }
          setStreet(response.data.street);
          setPostalCode(response.data.postalCode);
          setCity(response.data.city);

          if (response.data.contact1 === null) {
            setContact1("")
          } else {
            setContact1(response.data.contact1);
          }

          setTel1(response.data.tel1);

          if (response.data.contact2 === null) {
            setContact2("")
          } else {
            setContact2(response.data.contact2);
          }

          if (response.data.tel2 === null) {
            setTel2("")
          } else {
            setTel2(response.data.tel2);
          }

          if (response.data.parentSSN === null) {
            setParentSSN("")
          } else {
            setParentSSN(response.data.parentSSN);
          }

          if (response.data.parentDOB === null) {
            setParentDOB("")
          } else {
            setParentDOB(response.data.parentDOB);
          }

          if (response.data.childSSN === null) {
            setChildSSN("")
          } else {
            setChildSSN(response.data.childSSN);
          }

          setEmail(response.data.email);

          if (response.data.allergies === null) {
            setAllergies("")
          } else {
            setAllergies(response.data.allergies);
          }
          setMedical(response.data.medicals)

          if (response.data.parentRemarks === null) {
            setParentRemarks("")
          } else {
            setParentRemarks(response.data.parentRemarks);
          }

          if (response.data.teamRemarks === null) {
            setTeamRemarks("")
          } else {
            setTeamRemarks(response.data.teamRemarks);
          }
          
          setWeek1(response.data.week1);
          setWeek2(response.data.week2);
          setWeek3(response.data.week3);
          setWeek4(response.data.week4);

          if (response.data.presence === null) {
            setPresence("afwezig")
          } else {
            setPresence(response.data.presence);
          }

          if (response.data.balance === null) {
            setBalance(0)
          } else {
            setBalance(response.data.balance);
          }

          if (response.data.social === null) {
            setSocial("geen sociaal")
          } else {
            setSocial(response.data.social);
          }

          
        })
        .catch(function (err) {
          console.log(err);
        });
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();

        var newBalance = 0;
        if(addBalance !== 0){
          if (presence === 'aanwezig' && social === 'geen sociaal'){
            newBalance = parseInt(addBalance) + parseInt(balance) - 4;
            //setBalance(newBalance);
          } else if (presence === 'aanwezig' && social === 'sociaal tarief'){
            newBalance = parseInt(addBalance) + parseInt(balance) - 2;
            //setBalance(newBalance);
          } else if (presence === 'afwezig'){
            newBalance = parseInt(addBalance) + parseInt(balance);
            //setBalance(newBalance);
          }
        }else if(addBalance === 0){
          if (presence === 'aanwezig' && social === 'geen sociaal') {
            newBalance = parseInt(balance) - 4;
            //setBalance(newBalance);
          } else if (presence === 'aanwezig' && social === 'sociaal tarief') {
            newBalance = parseInt(balance) - 2;
            //setBalance(newBalance);
          } else if (presence === 'afwezig'){
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
          medicals: medicals,
          parentRemarks: parentRemarks,
          teamRemarks: teamRemarks,
          week1: week1,
          week2: week2,
          week3: week3,
          week4: week4,
          presence: presence,
          balance: newBalance,
          social: social,
        };
        //console.log("Obj: ", Obj)

        axios
          .put(`https://speelpleinapi.herokuapp.com/update/${id}`, Obj)
          .then((res) => console.log('res.data: ', res.data));
        
        addStats();
        
        navigate("/")
    }

    const addStats = async () => {
      if (presence === 'aanwezig') {
        let statBalance;
        if (social === 'geen sociaal') {
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
        //console.log('the newStat: ', newStat);

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
          <h3 className='text-center'>Gegevens Bijwerken</h3>
          <form onSubmit={handleSubmit}>
            <div className='row mt-3'>
              <div className='col-md-5'>
                <label htmlFor='surname'>Achtenaam</label>
                <input
                  id='surname'
                  type='text'
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-5'>
                <label htmlFor='name'>Voornaam</label>
                <input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-2'>
                <label htmlFor='dateOfBirth'>Geboortedatum</label>
                <input
                  id='dateOfBirth'
                  type='text'
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  className={dateOfBirth === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-5 col-sm-6'>
                <label htmlFor='street'>Straatnaam en Huisnummer</label>
                <input
                  id='street'
                  type='text'
                  value={street}
                  onChange={(event) => setStreet(event.target.value)}
                  className={street === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
              <div className='col-md-2 col-sm-6'>
                <label htmlFor='postalCode'>Post Code</label>
                <input
                  id='postalCode'
                  type='text'
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  className={postalCode === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
              <div className='col-md-5 col-sm-6'>
                <label htmlFor='city'>Gemeente</label>
                <input
                  id='city'
                  type='text'
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className={city === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
            </div>
            <div className='row mt-3 border py-2'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='week1'>Week 1</label>
                <select
                  id='week1'
                  type='text'
                  value={week1}
                  onChange={(event) => setWeek1(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option value='afwezig'>Afwezig</option>
                </select>
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='week2'>Week 2</label>
                <select
                  id='week2'
                  type='text'
                  value={week2}
                  onChange={(event) => setWeek2(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option value='afwezig'>Afwezig</option>
                </select>
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='week3'>Week 3</label>
                <select
                  id='week3'
                  type='text'
                  value={week3}
                  onChange={(event) => setWeek3(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option value='afwezig'>Afwezig</option>
                </select>
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='week4'>Week 4</label>
                <select
                  id='week4'
                  type='text'
                  value={week4}
                  onChange={(event) => setWeek4(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option value='afwezig'>Afwezig</option>
                </select>
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
                  className={school === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
              <div className='col-md-2 col-sm-6'>
                <label htmlFor='level'>Groep</label>
                <select
                  id='level'
                  type='text'
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  className={level === "" ? 'form-control bg-warning' : 'form-control'}
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='kleuters'>Kleuters</option>
                  <option value='lagere'>Lagere</option>
                </select>
              </div>
              <div className='col-md-5 col-sm-6'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  type='text'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={email === "" ? 'form-control bg-warning' : 'form-control'}
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
                  className={contact1 === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='tel1'>Tel: 1</label>
                <input
                  id='tel1'
                  type='text'
                  value={tel1}
                  onChange={(event) => setTel1(event.target.value)}
                  className={tel1 === "" ? 'form-control bg-warning' : 'form-control'}
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
                <label htmlFor='pssn'>Ouder RN</label>
                <input
                  id='pssn'
                  type='text'
                  value={parentSSN}
                  onChange={(event) => setParentSSN(event.target.value)}
                  className={parentSSN === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='pdob'>Ouder Geboortedatum</label>
                <input
                  id='pdob'
                  type='text'
                  value={parentDOB}
                  onChange={(event) => setParentDOB(event.target.value)}
                  className={parentDOB === "" ? 'form-control bg-warning': 'form-control'}
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='cssn'>Kind RN</label>
                <input
                  id='cssn'
                  type='text'
                  value={childSSN}
                  onChange={(event) => setChildSSN(event.target.value)}
                  className={childSSN === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-6 col-sm-12'>
                <label htmlFor='parentRemarks'>Opmerkingen Ouders</label>
                <input
                  id='parentRemarks'
                  type='text'
                  value={parentRemarks}
                  onChange={(event) => setParentRemarks(event.target.value)}
                  className='form-control'
                />
              </div>
              <div className='col-md-6 col-sm-12'>
                <label htmlFor='teamRemarks'>Opmerkingen Pleinleiding</label>
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
                <label htmlFor='allergies'>Allergieën</label>
                <input
                  id='allergies'
                  type='text'
                  value={allergies}
                  onChange={(event) => setAllergies(event.target.value)}
                  className={allergies === "" ? 'form-control bg-warning' : 'form-control'}
                />
              </div>
              <div className='col form-check d-flex align-items-center'>
                <input class="form-check-input checkbox" type="checkbox" value={isChecked} checked={medicals === "checked" ? "checked" : ""} id="medical" name="medical" onChange={handleChecked} />
                <label className='check__label' htmlFor='medical'>Medische Fiche</label>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-2 col-sm-4'>
                <label htmlFor='presence'>Aanweizigheid</label>
                <select
                  id='presence'
                  type='text'
                  value={presence}
                  onChange={(event) => setPresence(event.target.value)}
                  className='form-control'
                >
                  <option value='aanwezig'>Aanwezig</option>
                  <option value='afwezig'>Afwezig</option>
                </select>
              </div>

              <div className='col-md-2 col-sm-4'>
                <label htmlFor='social'>Sociaal</label>
                <select
                  id='social'
                  type='text'
                  value={social}
                  onChange={(event) => setSocial(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='geen sociaal'>Geen Sociaal Tarief</option>
                  <option value='sociaal tarief'>Sociaal Tarief</option>
                  <option selected value=''></option>
                </select>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-2 col-sm-7'>
                <label htmlFor='balance'>Saldo</label>
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
                <label htmlFor='addBalance'>Saldo Toevoegen</label>
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
                value='Gegevens Bijwerken'
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
