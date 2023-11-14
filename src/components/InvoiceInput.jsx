import React from 'react'
import '../app.css'
import { useNavigate } from 'react-router-dom';

function InvoiceInput() {

    const navigate = useNavigate();
    const handleSubmit =(e)=> {
        e.preventDefault();
        var gcn = document.getElementsByName('gcn_no')[0]?.value;
        navigate(`/invoice-printing?gcn_no=${gcn}`)

    }
  return (
    <div className='app'>
        <form>
        <h1>Invoice Printing</h1>
            <label>Outward Dc No</label><input type='text' name = 'gcn_no'/>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default InvoiceInput