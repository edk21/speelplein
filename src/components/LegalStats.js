import React, {useEffect, useState} from 'react'
import LegalStatsTable from './LegalStatsTable'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const LegalStats = () => {
  const { id } = useParams();
  
  //console.log("child: ", id)

  const [certificationAutorisation, setCertificationAutorisation ] = useState("")
  const [beginDate1, setBeginDate1] = useState("")
  const [endDate1, setEndDate1] = useState("")
  const [totalControl, setTotalControl] = useState("")
  const [amount1, setAmount1] = useState("")
  const [amount2, setAmount2] = useState("")
  const [amount3, setAmount3] = useState("")
  const [amount4, setAmount4] = useState("")
  const [totalAmount, setTotalAmount] = useState("")
  const [beginDate2, setBeginDate2] = useState("")
  const [certifyPostalCode, setCertifyPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [childName, setChildName] = useState("")
  const [childFirstName, setChildFirstName] = useState("")
  const [BCENumber, setBCENumber] = useState("")
  const [numberOfDay1, setNumberOfDay1] = useState("")
  const [dailyTarif1, setDailyTarif1] = useState("")
  const [numberOfDay2, setNumberOfDay2] = useState("")
  const [dailyTarif2, setDailyTarif2] = useState("")
  const [numberOfDay3, setNumberOfDay3] = useState("")
  const [dailyTarif3, setDailyTarif3] = useState("")
  const [numberOfDay4, setNumberOfDay4] = useState("")
  const [dailyTarif4, setDailyTarif4] = useState("")
  const [childPostalCode, setChildPostalCode] = useState("")
  const [childMunicipality, setChildMunicipality] = useState("")
  const [endDate2, setEndDate2] = useState("")
  const [nnChild, setNnChild] = useState("")
  const [certifierMunicipality, setCertifierMunicipality] = useState("")
  const [certifierName, setCertifierName] = useState("")
  const [certifierAddress, setCertifierAddress] = useState("")
  const [beginDate3, setBeginDate3] = useState("")
  const [endDate3, setEndDate3] = useState("")
  const [beginDate4, setBeginDate4] = useState("")
  const [endDate4, setEndDate4] = useState("")
  const [childBirthDate, setChildBirthDate] = useState("")
  const [beginValidatyCertification, setBeginValidatyCertification] = useState("")
  const [endValidatyCertification, setEndValidatyCertification] = useState("")

  useEffect(() => {
    axios
      .get(`https://speelpleinapi.herokuapp.com/record/${id}`)
      .then((response) => {
        // console.log('response: ', response);
        setChildFirstName(response.data.surname);
        setChildName(response.data.name);
        setChildBirthDate(response.data.dateOfBirth);
        setAddress(response.data.street);
        setChildPostalCode(response.data.postalCode);
        setChildMunicipality(response.data.city);
        setNnChild(response.data.childSSN);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/';
  }


  return (
    <div className=''>
      <div className="">
        <h3 className='text-center py-3 '>Children Statistics</h3>
        <button className='btn btn-danger position-absolute end-0 top-10' onClick={()=> handleLogout()}>LogOut</button>
      </div>
        <div className='mb-5 py-5'>
            <div className='row mt-5'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='certificationAutorisation'>Certification Autorisation</label>
                <select
                  id='certificationAutorisation'
                  type='text'
                  onChange={(event) => setCertificationAutorisation(event.target.value)}
                  className='form-control'
                >
                  <option selected value=''>
                    Select an option
                  </option>
                  <option value='0'>0</option>
                  <option value='2'>1</option>
                  <option value='1'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'></option>
                </select>
              </div>
              <div className='col-md-3 col-sm-6'>
                <label  htmlFor='beginDate1'>Begin Date 1</label>
                <input
                  id='beginDate1'
                  type='date'
                  onChange={(event) => setBeginDate1(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='endDate1'>End Date 1</label>
                <input
                  id='endDate1'
                  type='date'
                  onChange={(event) => setEndDate1(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='totalControl'>Total Control</label>
                <input
                  id='totalControl'
                  type='text'
                  onChange={(event) => setTotalControl(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-sm-6 col-md-2'>
                <label htmlFor='amount1'>Amount 1</label>
                <input
                  id='amount1'
                  type='text'
                  onChange={(event) => setAmount1(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-sm-6 col-md-2'>
                <label htmlFor='amount2'>Amount 2</label>
                <input
                  id='amount2'
                  type='text'
                  onChange={(event) => setAmount2(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-sm-6 col-md-2'>
                <label htmlFor='amount3'>Amount 3 </label>
                <input
                  id='amount3'
                  type='text'
                  onChange={(event) => setAmount3(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-sm-6 col-md-2'>
                <label htmlFor='amount4'>Amount 4</label>
                <input
                  id='amount4'
                  type='text'
                  onChange={(event) => setAmount4(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-sm-6 col-md-4'>
                <label htmlFor='totalAmount'>Total Amount</label>
                <input
                  id='totalAmount'
                  type='text'
                  onChange={(event) => setTotalAmount(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='beginDate2'>Begin Date 2</label>
                <input
                  id='beginDate2'
                  type='date'
                  onChange={(event) => setBeginDate2(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-2 col-sm-6'>
                <label htmlFor='certifyPostalCode'>Certifier Post Nb</label>
                <input
                  id='certifyPostalCode'
                  type='text'
                  onChange={(event) => setCertifyPostalCode(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='country'>Country </label>
                <input
                  id='country'
                  type='text'
                  onChange={(event) => setCountry(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4 col-sm-6'>
                <label htmlFor='address'>Address</label>
                <input
                  id='address'
                  type='text'
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-5 col-sm-6'>
                <label htmlFor='name'>Child Name</label>
                <input
                  id='name'
                  type='text'
                  value={childName}
                  onChange={(event) => setChildName(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4 col-sm-6'>
                <label htmlFor='firstName'>Child First Name </label>
                <input
                  id='firstName'
                  type='text'
                  value={childFirstName}
                  onChange={(event) => setChildFirstName(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='bcenumber'>BCE Number</label>
                <input
                  id='bcenumber'
                  type='text'
                  onChange={(event) => setBCENumber(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='numberOfDay1'>Number Of Day 1</label>
                <input
                  id='numberOfDay1'
                  type='text'
                  onChange={(event) => setNumberOfDay1(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='dailyTarif1'>Daily Tarif 1</label>
                <input
                  id='dailyTarif1'
                  type='text'
                  onChange={(event) => setDailyTarif1(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='numberOfDay2'>Number Of Day 2</label>
                <input
                  id='numberOfDay2'
                  type='text'
                  onChange={(event) => setNumberOfDay2(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='dailyTarif2'>Daily Tarif 2</label>
                <input
                  id='dailyTarif2'
                  type='text'
                  onChange={(event) => setDailyTarif2(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='numberOfDay3'>Number Of Day 3</label>
                <input
                  id='numberOfDay3'
                  type='text'
                  onChange={(event) => setNumberOfDay3(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='dailyTarif3'>Daily Tarif 3</label>
                <input
                  id='dailyTarif3'
                  type='text'
                  onChange={(event) => setDailyTarif3(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='numberOfDay4'>Number Of Day 4</label>
                <input
                  id='numberOfDay4'
                  type='text'
                  onChange={(event) => setNumberOfDay4(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='dailyTarif4'>Daily Tarif 4</label>
                <input
                  id='dailyTarif4'
                  type='text'
                  onChange={(event) => setDailyTarif4(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='childPostalCode'>Child Postal Code</label>
                <input
                  id='childPostalCode'
                  type='text'
                  value={childPostalCode}
                  onChange={(event) => setChildPostalCode(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='childMunicipality'>Child Municipality</label>
                <input
                  id='childMunicipality'
                  type='text'
                  value={childMunicipality}
                  onChange={(event) => setChildMunicipality(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='endDate2'>End Date 2</label>
                <input
                  id='endDate2'
                  type='date'
                  onChange={(event) => setEndDate2(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='childNNnumber'>Child NN Number</label>
                <input
                  id='childNNnumber'
                  type='text'
                  value={nnChild}
                  onChange={(event) => setNnChild(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-4 col-sm-6'>
                <label htmlFor='cMunicipality'>Certifier Municipality</label>
                <input
                  id='cMunicipality'
                  type='text'
                  onChange={(event) => setCertifierMunicipality(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4 col-sm-6'>
                <label htmlFor='certifierName'>Certifier Name</label>
                <input
                  id='certifierName'
                  type='text'
                  onChange={(event) => setCertifierName(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4 col-sm-6'>
                <label htmlFor='certifierAddress'>Certifier Address</label>
                <input
                  id='certifierAddress'
                  type='text'
                  onChange={(event) => setCertifierAddress(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='beginDate3'>Begin Date 3</label>
                <input
                  id='beginDate3'
                  type='date'
                  onChange={(event) => setBeginDate3(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='endDate3'>End Date 3</label>
                <input
                  id='endDate3'
                  type='date'
                  onChange={(event) => setEndDate3(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='beginDate4'>Begin Date 4</label>
                <input
                  id='beginDate4'
                  type='date'
                  onChange={(event) => setBeginDate4(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-3 col-sm-6'>
                <label htmlFor='endDate4'>End Date 4</label>
                <input
                  id='endDate4'
                  type='date'
                  onChange={(event) => setEndDate4(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-4 col-sm-6'>
                <label htmlFor='childBirthDate'>Child Birth Date</label>
                <input
                  id='childBirthDate'
                  type='date'
                  value={childBirthDate}
                  onChange={(event) => setChildBirthDate(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4 col-sm-6'>
                <label htmlFor='bcertif'>Begin Validaty Certification</label>
                <input
                  id='bcertif'
                  type='date'
                  onChange={(event) => setBeginValidatyCertification(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-4 col-sm-6'>
                <label htmlFor='endValidCertif'>end Validaty Certification</label>
                <input
                  id='endValidCertif'
                  type='date'
                  onChange={(event) => setEndValidatyCertification(event.target.value)}
                  className='form-control'
                  autoComplete='off'
                />
              </div>
            </div>
        </div> 
    </div>
  )
}

export default LegalStats