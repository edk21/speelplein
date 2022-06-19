import React,{useState} from 'react'
import  { Link } from "react-router-dom"
import QRCode  from "qrcode"
import Footer from './Footer';

const GenerateQR = () => {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const generateQRCode = async () => {
        try{
            const response = await QRCode.toDataURL(text);
            setImageUrl(response);
        }catch(err){
            console.log(err)
        }
    }
    return (
      <div>
        <div className='container'>
          <div className='card'>
            <h2 className='text-center'>Generate QR Code</h2>
            <div className='card-body'>
              <div className='row'>
                <div className=''>
                  <input
                    type='text'
                    className='form-control'
                    style={{ width: '50%' }}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className='d-flex justify-content-between mt-4'>
                    <button
                      className='btn btn-primary'
                      onClick={() => generateQRCode()}
                    >
                      Generate
                    </button>
                    <div>
                      <Link to='/'>
                        <button className='btn btn-info mx-3'>Back Home</button>
                      </Link>
                    </div>
                  </div>
                  {/* <br />
                            <br />
                            <br /> */}
                  {imageUrl ? (
                    <a href={imageUrl} download>
                      <img src={imageUrl} alt='qr code generated' />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default GenerateQR
