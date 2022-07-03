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
    const [isChecked, setIsChecked] = useState("not-checked");
    const [medicals, setMedical] = useState(isChecked);
    const [parentRemarks, setParentRemarks] = useState('');
    const [teamRemarks, setTeamRemarks] = useState('');
    const [week1, setWeek1] = useState('');
    const [week2, setWeek2] = useState('');
    const [week3, setWeek3] = useState('');
    const [week4, setWeek4] = useState('');
    const [presence, setPresence] = useState('');
    const [balance, setBalance] = useState(0);
    const [social, setSocial] = useState('');
    

    const myDate = new Date();
    const year = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();

    const date = day + ' / ' + month + ' / ' + year;
    //console.log('the date: ', date);
    const handleChecked = (e) => {
      if(e.target.checked){
        setIsChecked("checked")
      }else{
        setIsChecked("not-checked")
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      if(username === "" || name === "" || presence === "" || balance === ""  || social === ""){
        alert("Gelieve alle velden in te vullen");
      }
      else if(balance < 0){
        alert("vul alstublieft een positief getal in");
      }else if(balance > 20){
        alert("Je mag niet meer dan 20€ invoeren")
      }else{
        var newBalance;
        if (balance === null || parseInt(balance) < 0) {
          alert("vul alstublieft een positief getal in");
        }else if (parseInt(balance) === 0) {
          if (presence === 'aanwezig' && social === 'sociaal tarief') {
            newBalance = -2;
            setBalance(newBalance);
          } else if (presence === 'aanwezig' && social === 'geen sociaal') {
            newBalance = -4;
            setBalance(newBalance);
          } else if (presence === 'afwezig') {
            newBalance = 0;
            setBalance(newBalance);
          }
        } else if (parseInt(balance) > 0) {
          if (presence === 'aanwezig' && social === 'sociaal tarief') {
            newBalance = parseInt(balance) - 2;
            setBalance(newBalance);
          } else if (presence === 'aanwezig' && social === 'geen sociaal') {
            newBalance = parseInt(balance) - 4;
            setBalance(newBalance);
          } else if (presence === 'afwezig') {
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
        setMedical('');
        setParentRemarks('');
        setTeamRemarks('');
        setWeek1("");
        setWeek2("");
        setWeek3("");
        setWeek4("");
        setPresence('');
        setBalance(0);
        setSocial('');
        setIsChecked(false);

        addStats();
      
        handleOnClick();
      }
      
    }

    const handleOnClick = () => {
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

    return (
      <div style={{ height: '100vh' }}>
        <div className='container border rounded' style={{ marginTop: 20 }}>
          <p className='text-muted fw-light'>Velden met sterren zijn<strong className='text-decoration-underline fw-bold pl-2'> Verplicht</strong></p>
          <h3 className='text-center pb-2'>Een nieuw kind toevoegen</h3>
          <form onSubmit={handleSubmit}>
            <div className='row mt-3'>
              <div className='col-md-4'>
                <label className='position-relative' htmlFor='surname'>Achtenaam <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <input
                  id='surname'
                  type='text'
                  onChange={(event) => setUsername(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label className='position-relative' htmlFor='name'>Voornaam <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <input
                  id='name'
                  type='text'
                  onChange={(event) => setName(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label className='position-relative' htmlFor='dateOfBirth'>Kind Geboortedatum</label>
                <input
                  id='dateOfBirth'
                  type='text'
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-2'>
                <label className='position-relative' htmlFor='balance'>Saldo <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <input
                  id='balance'
                  type='number'
                  onChange={(event) => setBalance(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-5'>
                <label className='position-relative' htmlFor='presence'>Aanwezigheid <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <select
                  id='presence'
                  type='text'
                  onChange={(event) => setPresence(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option value='afwezig'>Afwezig</option>
                </select>
              </div>
              <div className='col-md-5'>
                <label className='position-relative' htmlFor='social'>Sociaal <i className="fa-solid fa-star text-warning star position-absolute"></i></label>
                <select
                  id='social'
                  type='text'
                  onChange={(event) => setSocial(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='geen sociaal'>Geen Sociaal Tarief</option>
                  <option value='sociaal tarief'>Sociaal Tarief</option>
                </select>
              </div>
            </div>
            <div className='row mt-3 border py-2'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='week1'>Week 1</label>
                <select
                  id='week1'
                  type='text'
                  onChange={(event) => setWeek1(event.target.value)}
                  className='form-control'
                >
                  <option selected value='abscent'>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option selected value='afwezig'>Afwezig</option>
                </select>
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='week2'>Week 2</label>
                <select
                  id='week2'
                  type='text'
                  onChange={(event) => setWeek2(event.target.value)}
                  className='form-control'
                >
                  <option selected value='abscent'>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option selected value='afwezig'>Afwezig</option>
                </select>
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='week3'>Week 3</label>
                <select
                  id='week3'
                  type='text'
                  onChange={(event) => setWeek3(event.target.value)}
                  className='form-control'
                >
                  <option selected value='abscent'>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option selected value='afwezig'>Afwezig</option>
                </select>
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='week4'>Week 4</label>
                <select
                  id='week4'
                  type='text'
                  onChange={(event) => setWeek4(event.target.value)}
                  className='form-control'
                >
                  <option selected value='abscent'>
                    kies een optie
                  </option>
                  <option value='aanwezig'>Aanwezig</option>
                  <option selected value='afwezig'>Afwezig</option>
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
                <label htmlFor='level'>Groep</label>
                <select
                  id='level'
                  type='text'
                  onChange={(event) => setLevel(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    kies een optie
                  </option>
                  <option value='Kleuters'>Kleuters</option>
                  <option value='lagere'>Lagere</option>
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
                <label className='' htmlFor='street'>Straatnaam en huisnummer</label>
                <input
                  id='street'
                  type='text'
                  onChange={(event) => setStreet(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3'>
                <label className='' htmlFor='postalCode'>Post Code</label>
                <input
                  id='postalCode'
                  type='text'
                  onChange={(event) => setPostalCode(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label className='' htmlFor='city'>Gemeente</label>
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
                <label htmlFor='pssn'>Ouder RN</label>
                <input
                  id='pssn'
                  type='text'
                  onChange={(event) => setParentSSN(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='pdob'>Ouder Geboortedatum</label>
                <input
                  id='pdob'
                  type='text'
                  onChange={(event) => setParentDOB(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='cssn'>Kind RN</label>
                <input
                  id='cssn'
                  type='text'
                  onChange={(event) => setChildSSN(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>

            </div>
            <div className='row mt-3 d-flex align-items-center'>
              <div className='col-md-8'>
                <label htmlFor='allergies'>Allergieës</label>
                <input
                  id='allergies'
                  type='text'
                  onChange={(event) => setAllergies(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col form-check d-flex align-items-center'>
                <input class="form-check-input checkbox" type="checkbox" value="" id="medical" name="medical" onChange={handleChecked} />
                <label className='check__label' htmlFor='medical'>Medische Fiche</label>
              </div>
            </div><div className='row mt-3'>
              <div className='col-md-6'>
                <label htmlFor='parentRemarks'>Opmerkingen ouders</label>
                <input
                  id='parentRemarks'
                  type='text'
                  onChange={(event) => setParentRemarks(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='teamRemarks'>Opmerkingen pleinleiding</label>
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
                value='Nieuwe inschrijving'
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
