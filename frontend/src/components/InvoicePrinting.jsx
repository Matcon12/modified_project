import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InvoicePrinting() {
  const [invoiceData, setInvoiceData] = useState({});

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
    <>
  {"{"}% load humanize %{"}"}
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>INVOICE</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossOrigin="anonymous"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n      .table,th,td {\n        border: 1px solid black;\n        table-layout: fixed;\n        width: 100%;\n      }\n     *{overflow: hidden;}\n\n      th[colspan], td[colspan] {\n        border-right: 1px solid black; \n      }\n      .camount,.samount,.iamount{\n        width:120%;\n      }\n      .dos {\n        width: 500%; \n        word-wrap: break-word; \n      }\n      .crate,.srate,.irate,.qty,.sac,.poslno,.uom{\n        width:70%;\n      }\n      .total,.rate{\n        width:130%;\n      }\n      .rate{\n        width:110%;\n      }\n      .slno{\n        width: 50%;\n      }\n\n      body {\n        margin: 0;\n        padding:0px;\n        font-size: 12px;\n        margin-top: 130px;\n        border:1px solid black;\n        \n    }\n      .a{\n        text-align: center;\n      }\n      footer {\n        position: fixed;\n        bottom: 10;\n        left: 0;\n        width: 100%;\n        text-align: left;\n        padding: 10px;\n      }\n    \n    "
    }}
  />
  <div id="invoice">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h5 style={{ textAlign: "center" }}>TAX INVOICE</h5>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div className="row">
      <div className="col-md-6 col-sm-6 text-left inv">
        <ul style={{ listStyleType: "none" }}>
          <li>
            <h6>
              <strong>Invoice details</strong>
            </h6>
          </li>
          <li>
            <strong>GST No     :</strong>{" "}
            <b><div>Loading...</div>
              {
              JSON.stringify(invoiceData)['r']}              
            </b>
          </li>
          <li>
            <strong>Reverse charge&nbsp;&nbsp; :</strong> N.A
          </li>
          <li>
            <strong>Invoice Number&nbsp;:</strong>{" "}
            <b>
              {"{"}
              {"{"}odc1.gcn_no{"}"}
              {"}"}
            </b>
          </li>
          <li>
            <strong>Invoice Date  :</strong>{" "}
            <b>
              {"{"}
              {"{"}odc1.gcn_date{"}"}
              {"}"}
            </b>
          </li>
        </ul>
      </div>
      <div className="col-md-6 col-sm-6 text-right transport">
        <ul style={{ listStyleType: "none" }}>
          <li>
            {" "}
            <h6>
              <strong>Transportation Mode</strong> : Road
            </h6>
          </li>
          <li>
            <strong>PO No    &nbsp;&nbsp;&nbsp;:</strong> {"{"}
            {"{"}odc1.po_no{"}"}
            {"}"}
          </li>
          <li>
            <strong>PO Date    :</strong> {"{"}
            {"{"}odc1.po_date{"}"}
            {"}"}
          </li>
          <li>
            <strong>Inward DC No  :</strong> {"{"}
            {"{"}odc1.grn_no{"}"}
            {"}"}
          </li>
          <li>
            <strong>Inward DC Date &nbsp;:</strong> {"{"}
            {"{"}odc1.grn_date{"}"}
            {"}"}
          </li>
          <li>
            <strong>Date of Supply :</strong> {"{"}
            {"{"}odc1.gcn_date{"}"}
            {"}"}
          </li>
          <li>
            <strong>Place of Supply&nbsp;&nbsp; :</strong> Ex-works,Banglore
          </li>
        </ul>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-6 text-left r">
        <ul style={{ listStyleType: "none" }}>
          <li>
            <h6>
              <strong>Details of Receiver(Billed to)</strong>
            </h6>
          </li>
          <li>
            <strong>Name    : </strong>
            {"{"}
            {"{"}r.cust_name{"}"}
            {"}"}
          </li>
          <li>
            <strong>Address   : </strong>
            {"{"}
            {"{"}r.cust_addr1{"}"}
            {"}"} <br />
                 &nbsp;&nbsp;&nbsp;{"{"}
            {"{"}r.cust_addr2{"}"}
            {"}"}
          </li>
          <li>
            &nbsp;&nbsp;&nbsp;{"{"}
            {"{"}r.cust_city{"}"}
            {"}"} - {"{"}
            {"{"}r.cust_pin{"}"}
            {"}"}
          </li>
          <li>
            <strong>State   &nbsp;&nbsp; : </strong>
            {"{"}
            {"{"}r.cust_st_name{"}"}
            {"}"}
          </li>
          <li>
            <strong>State Code : </strong>
            {"{"}
            {"{"}r.cust_st_code{"}"}
            {"}"}
          </li>
          <li>
            <strong>GST No  &nbsp;&nbsp;: </strong>{" "}
            <b>
              {"{"}
              {"{"}r.cust_gst_id{"}"}
              {"}"}
            </b>
          </li>
        </ul>
      </div>
      <div className="col-md-6 col-sm-6 text-right c">
        <ul style={{ listStyleType: "none" }}>
          <li>
            {" "}
            <h6>
              <strong>Details of Consignee(Shipped to)</strong>
            </h6>
          </li>
          <li>
            <strong>Name    : </strong>
            {"{"}
            {"{"}invoiceData.c.cust_name{"}"}
            {"}"}
          </li>
          <li>
            <strong>Address   : </strong>
            {"{"}
            {"{"}invoiceData.c.cust_addr1{"}"}
            {"}"}
          </li>
          <li>
            {"{"}
            {"{"}invoiceData.c.cust_addr2{"}"}
            {"}"}
          </li>
          <li>
            &nbsp;&nbsp;&nbsp;&nbsp;{"{"}
            {"{"}invoiceData.c.cust_city{"}"}
            {"}"} - {"{"}
            {"{"}invoiceData.c.cust_pin{"}"}
            {"}"}
          </li>
          <li>
            <strong>State   &nbsp;&nbsp; : </strong>
            {"{"}
            {"{"}invoiceData.c.cust_st_name{"}"}
            {"}"}
          </li>
          <li>
            <strong>State Code : </strong>
            {"{"}
            {"{"}invoiceData.c.cust_st_code{"}"}
            {"}"}
          </li>
          <li>
            <strong>GST No  &nbsp;&nbsp;: </strong>{" "}
            <b>
              {"{"}
              {"{"}invoiceData.c.cust_gst_id{"}"}
              {"}"}
            </b>
          </li>
        </ul>
      </div>
    </div>
    <div className="container-fluid main">
      <div>
        {"{"}% for record in odc %{"}"}
      </div>
      {"{"}% endfor %{"}"}
      <table className="table table-hover border border-secondary ">
        <tbody>
          <tr className="a">
            <th className="slno">
              <label>Sl No</label>
            </th>
            <th className="dos" style={{ wordWrap: "break-word" }}>
              Description of Services
            </th>
            <th className="poslno">PO Item Sl.No</th>
            <th className="sac">SAC Code</th>
            <th className="qty">QTY</th>
            <th className="uom">UOM</th>
            <th className="rate">Rate</th>
            <th className="total">Total</th>
            <th className="crate">CGST Rate (%)</th>
            <th className="camount">CGST Amount (Rs)</th>
            <th className="srate">SGST Rate (%)</th>
            <th className="samount">SGST Amount (Rs)</th>
            <th className="irate">IGST Rate (%)</th>
            <th className="iamount">IGST Amount (Rs)</th>
          </tr>
          <tr>
            <td />
            <td>Exterior painting of :</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td className="slno">
              {"{"}
              {"{"}forloop.counter{"}"}
              {"}"}
            </td>
            <td className="dos">
              {"{"}
              {"{"}record.part_name{"}"}
              {"}"} - ({"{"}
              {"{"}record.part_id{"}"}
              {"}"})
            </td>
            <td className="poslno">
              {"{"}
              {"{"}record.po_sl_no{"}"}
              {"}"}
            </td>
            <td className="sac">9988</td>
            <td className="qty" style={{ textAlign: "right" }}>
              {"{"}
              {"{"}record.qty_delivered{"}"}
              {"}"}
            </td>
            <td className="uom">
              {"{"}
              {"{"}record.uom{"}"}
              {"}"}
            </td>
            <td className="rate" style={{ textAlign: "right" }}>
              {"{"}
              {"{"}record.unit_price|floatformat:2{"}"}
              {"}"}
            </td>
            <td className="total" style={{ textAlign: "right" }}>
              {"{"}
              {"{"}record.taxable_amt|floatformat:2{"}"}
              {"}"}
            </td>
            <td className="crate" style={{ textAlign: "center" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}
              {"{"} gr.cgst_rate {"}"}
              {"}"}
              {"{"}% else %{"}"}
              {"{"}% endif %{"}"}
            </td>
            <td className="camount" style={{ textAlign: "right" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}
              {"{"} record.cgst_price|floatformat:2 {"}"}
              {"}"}
              {"{"}% else %{"}"}
              {"{"}% endif %{"}"}
            </td>
            <td className="srate" style={{ textAlign: "center" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}
              {"{"} gr.sgst_rate {"}"}
              {"}"}
              {"{"}% else %{"}"}
              {"{"}% endif %{"}"}
            </td>
            <td className="samount" style={{ textAlign: "right" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}
              {"{"} record.sgst_price|floatformat:2{"}"}
              {"}"}
              {"{"}% else %{"}"}
              {"{"}% endif %{"}"}
            </td>
            <td className="irate" style={{ textAlign: "center" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}% else %{"}"}
              {"{"}
              {"{"} gr.igst_rate {"}"}
              {"}"}
              {"{"}% endif %{"}"}
            </td>
            <td className="iamount" style={{ textAlign: "right" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}% else %{"}"}
              {"{"}
              {"{"} record.igst_price{"}"}
              {"}"}
              {"{"}% endif %{"}"}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td colSpan={2}> Total:</td>
            <td style={{ textAlign: "right" }}>
              {"{"}
              {"{"}total_qty{"}"}
              {"}"}
            </td>
            <td>Nos</td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              {"{"}
              {"{"}total_taxable_value{"}"}
              {"}"}
            </td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}
              {"{"} total_cgst|floatformat:2 {"}"}
              {"}"}
              {"{"}% else %{"}"}
              {"{"}% endif %{"}"}
            </td>
            <td></td>
            <td style={{ textAlign: "right" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}
              {"{"} total_sgst|floatformat:2 {"}"}
              {"}"}
              {"{"}% else %{"}"}
              {"{"}% endif %{"}"}
            </td>
            <td> </td>
            <td style={{ textAlign: "right" }}>
              {"{"}% if invoiceData.c.cust_st_code == 29 %{"}"}
              {"{"}% else %{"}"}
              {"{"}
              {"{"}total_igst{"}"}
              {"}"}
              {"{"}% endif %{"}"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="container-fluid">
      <table className="table table-striped ">
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }} colSpan={10}>
              INVOICE VALUE(in Words) <br />
              <strong>
                {"{"}
                {"{"}amount{"}"}
                {"}"}
              </strong>
            </td>
            <td style={{ textAlign: "center" }} colSpan={5}>
              Total : {"{"}
              {"{"}gt{"}"}
              {"}"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="col-12">
      <h6 style={{ textAlign: "center" }}>
        Certified that the Particulars given above are correct
      </h6>
    </div>
    <div className="container-fluid">
      <table className="table">
        <tbody>
          <tr>
            <td colSpan={2} className="text-center">
              <h6>
                TERMS AND CONDITIONS OF SALE <br />{" "}
              </h6>
              AS PER PO TERMS
              <hr />
              <strong>Our Bankers (NEFT/RTGS details):</strong>
              <ul className="list-unstyled">
                <li>
                  {"{"}
                  {"{"}invoiceData.m.bank_name{"}"}
                  {"}"}, {"{"}
                  {"{"}invoiceData.m.bank_address{"}"}
                  {"}"}
                </li>
                <li>
                  A/c N. {"{"}
                  {"{"}invoiceData.m.bank_acc_no{"}"}
                  {"}"}
                </li>
                <li>
                  IFSC Code: {"{"}
                  {"{"}invoiceData.m.ifsc_code{"}"}
                  {"}"}
                </li>
              </ul>
            </td>
            <td>
              {" "}
              <h6 className="text-center">
                {" "}
                FOR MATCON ENGINEERING ENTERPRISES
              </h6>
              <hr />
              <ul className="list-unstyled">
                <li>
                  <form>
                    <label htmlFor="signature">
                      <strong>Signature:</strong>
                    </label>
                    <textarea
                      id="signature"
                      className="form-control"
                      rows={2}
                      cols={50}
                      defaultValue={""}
                    />
                  </form>
                </li>
                <li style={{ textAlign: "center" }}>
                  <strong>For Authorized Signatory</strong>
                </li>
                <li>
                  <strong>Name:</strong> K V Sivaramkrishnan
                </li>
                <li>
                  <strong>Designation:</strong> GENERAL MANAGER (FINANCE)
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <br />
  <br />
  <footer>
    <strong>MATCON/FORMS/021/00</strong>
  </footer>
</>

  );
}
export default InvoicePrinting