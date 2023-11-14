import React from 'react'
import '../app.css'

function InvoiceReports() {
  return (
        <div className='app'>
          <form>
          <h1>Invoice Reports</h1>
          <div className='formInput'>
          <label>Enter the start date</label><input type="date" name="start_date"/>
          <label>Enter the end date</label><input type="date" name="end_date"/>
          </div>
          </form>
        </div>
  )
}

export default InvoiceReports