import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InvoicePrinting() {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const backendURL = 'http://localhost:5000/invoice-printing/';

    const data = {
        'gcn_no' : '099/2023-24'
    }

  axios.get(backendURL, { params: { data: data } })
  .then(response => {
    // console.log(response.data)
    setInvoiceData(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}, []);

  if (!invoiceData) {
  return <div>Loading...</div>;
  }
  return (
    <div>{invoiceData && (
                <div
                    dangerouslySetInnerHTML={{ __html: invoiceData }}
                />
            )}
        </div>

  );
}
export default InvoicePrinting