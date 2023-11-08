import pandas as pd
import openpyxl
# writer = pd.ExcelWriter('report.xlsx', engine='xlsxwriter')
# df = pd.DataFrame({'Sl No': ['A', 'B', 'C', 'D'], 'Age': [10, 0, 30, 50]})
# writer = pd.ExcelWriter('demo.xlsx', engine='xlsxwriter')
# df.to_excel(writer, sheet_name='Sheet1', index=False)
# writer.close()

import mysql.connector 
mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Matcon545@@',
    database='mydatabase'
)
mycursor = mydb.cursor(buffered=True)
mycursor.execute("""
    SELECT otw.gcn_no, otw.gcn_date,otw.qty_delivered ,otw.taxable_amt, otw.cgst_price, otw.sgst_price, otw.igst_price, cm.cust_name, cm.cust_gst_id
    FROM otw_dc otw
    JOIN customer_master cm ON otw.receiver_id = cm.cust_id
    WHERE STR_TO_DATE(otw.gcn_date, '%d-%m-%Y') >= '2023-05-01' AND STR_TO_DATE(otw.gcn_date, '%d-%m-%Y') < '2023-06-01'
    ORDER BY STR_TO_DATE(otw.gcn_date, '%d-%m-%Y');
""")

result = mycursor.fetchall()

df = pd.DataFrame(result, columns=['gcn_no', 'gcn_date', 'qty', 'taxable_amt', 'cgst_price', 'sgst_price', 'igst_price', 'cust_name', 'cust_gst_id'])
df = df[['cust_name', 'cust_gst_id', 'gcn_no', 'gcn_date', 'qty', 'taxable_amt', 'cgst_price', 'sgst_price', 'igst_price']]
df.insert(0, 'Sl No', range(1, len(df) + 1))

df['Invoice Value'] = df['taxable_amt'] + df['cgst_price'] + df['sgst_price'] + df['igst_price']

df['HSN/SSC'] = 9988

df = df.rename(columns={
    'gcn_no': 'Invoice Number',
    'gcn_date': 'Invoice Date',
    'qty': 'Quantity',
    'taxable_amt': 'Ass.Value',
    'cgst_price': 'CGST Price (9%)',
    'sgst_price': 'SGST Price (9%)',
    'igst_price': 'IGST Price (18%)',
    'cust_name': 'Customer Name',
    'cust_gst_id': 'Customer GST Num',
})

total_taxable_amt = df['Ass.Value'].sum()
total_cgst_price = df['CGST Price (9%)'].sum()
total_sgst_price = df['SGST Price (9%)'].sum()
total_igst_price = df['IGST Price (18%)'].sum()

total_row = pd.DataFrame({
    'Sl No': 'Total',
    'Customer Name': '',
    'Customer GST Num': '',
    'Ass.Value': total_taxable_amt,
    'CGST Price (9%)': total_cgst_price,
    'SGST Price (9%)': total_sgst_price,
    'IGST Price (18%)': total_igst_price,
    'Invoice Value': df['Invoice Value'].sum(),
    'HSN/SSC': '',
}, index=[0])

df = pd.concat([df, total_row], ignore_index=True)

writer = pd.ExcelWriter('report.xlsx', engine='xlsxwriter')
df.to_excel(writer, sheet_name='Sheet1', index=False)

workbook = writer.book
worksheet = writer.sheets['Sheet1']

right_aligned_columns = ['Ass.Value', 'CGST Price (9%)', 'SGST Price (9%)', 'IGST Price (18%)', 'Invoice Value']

for col in right_aligned_columns:
    format = workbook.add_format({'align': 'right'})
    col_idx = df.columns.get_loc(col)
    worksheet.set_column(col_idx, col_idx, None, format)

bold_format = workbook.add_format({'bold': True, 'align': 'right'})
for col in ['Sl No','Ass.Value', 'CGST Price (9%)', 'SGST Price (9%)', 'IGST Price (18%)','Invoice Value']:
    col_idx = df.columns.get_loc(col)
    worksheet.write(len(df), col_idx, total_row.iloc[0][col], bold_format)


# for column in df:
#     column_length = max(df[column].astype(str).map(len).max(), len(column))+1
#     col_idx = df.columns.get_loc(column)
#     writer.sheets['Sheet1'].set_column(col_idx, col_idx, column_length)
for col_num, value in enumerate(df.columns.values):
    column_len = max(df[value].astype(str).str.len().max(), len(value)) + 2  # Add extra width
    worksheet.set_column(col_num, col_num, column_len)
    
writer.close()
print(df)


