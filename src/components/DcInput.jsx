import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../app.css'

function DcInput() {

    const navigate = useNavigate();
    const handleSubmit =(e)=> {
        e.preventDefault();
        var gcn = document.getElementsByName('gcn_no')[0]?.value;
        navigate(`/dc-printing?dc_no=${gcn}`)

    }

    return (
        <div className='app'>
            <form>
            <h1>DC Printing</h1>
                <label>Outward DC No</label><input type='text' name = 'gcn_no'/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
      )
}

export default DcInput