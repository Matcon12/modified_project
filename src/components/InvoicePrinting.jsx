import React, { useEffect, useState } from 'react';
import axios from 'axios';
import matlogo from '../images/matlogo.png';

function InvoicePrinting() {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const backendURL = 'http://localhost:5000/invoice-printing/';

    const data = {
        'gcn_no' : '082/2023-24'
    }

  axios.get(backendURL, { params: { data: data } })
  .then(response => {
    console.log(response.data)
    setInvoiceData(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}, []);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }
  console.log(invoiceData);
  return (
    <div>
          <img src={matlogo} alt="MatconLogo"  className="logo"/>
            {invoiceData && (
                <div
                    dangerouslySetInnerHTML={{ __html: invoiceData }}
                />
            )}
        </div>

  );
}
export default InvoicePrinting