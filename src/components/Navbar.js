import React from 'react'

const Navbar = () => {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary sticky-top'>
        <div className='container-fluid'>
          <a href='/' className='navbar-brand'>
            SpeelPlein Raccoon
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a href='/' className='nav-link active' aria-current='page'>
                  Dashboard
                </a>
              </li>
              <li className='nav-item'>
                <a href='/kinderList' className='nav-link' aria-current='page'>
                  Kinderlist
                </a>
              </li>
              <li className='nav-item'>
                <a href='/create' className='nav-link'>
                  kind toevoegen
                </a>
              </li>
              {/* <li className='nav-item'>
                <a href='/qrGenerator' className='nav-link'>
                  Generate QR Code
                </a>
              </li> */}
              {/* <li className='nav-item'>
                <a href='/excelFile' className='nav-link'>
                  View Excel File
                </a>
              </li> */}
              <li className='nav-item'>
                <a href='/dailyR' className='nav-link'>
                  Dagelijkse Registraties
                </a>
              </li>
              <li className='nav-item'>
                <a href='/legalS' className='nav-link'>
                  statistieken bekijken
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar
