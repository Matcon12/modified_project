import pandas as pd
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
    WHERE STR_TO_DATE(otw.gcn_date, '%d-%m-%Y') >= '2023-04-01' AND STR_TO_DATE(otw.gcn_date, '%d-%m-%Y') <= '2023-10-13'
    ORDER BY STR_TO_DATE(otw.gcn_date, '%d-%m-%Y');
""")
result = mycursor.fetchall()

df = pd.DataFrame(result, columns=['gcn_no', 'gcn_date', 'qty', 'taxable_amt', 'cgst_price', 'sgst_price', 'igst_price', 'cust_name', 'cust_gst_id'])
df = df[['cust_name', 'cust_gst_id', 'gcn_no', 'gcn_date', 'qty', 'taxable_amt', 'cgst_price', 'sgst_price', 'igst_price']]
df.insert(0, 'Sl No', range(1, len(df) + 1))
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
df1= df[['Customer Name', 'Customer GST Num']].copy()

grouped = df.groupby(['Invoice Number','Invoice Date']).agg({
    'Quantity': 'sum',
    'Ass.Value': 'sum',
    'CGST Price (9%)': 'sum',
    'SGST Price (9%)': 'sum',
    'IGST Price (18%)': 'sum'
}).reset_index()

df1 = df[['Invoice Number', 'Customer Name', 'Customer GST Num']].drop_duplicates()
df1['HSN/SSC'] = 9988
combined_df = pd.merge(df1, grouped, on='Invoice Number', how='left')
combined_df['Sl No'] = range(1, len(combined_df) + 1)

total_taxable_amt = grouped['Ass.Value'].sum()
total_cgst_price = grouped['CGST Price (9%)'].sum()
total_sgst_price = grouped['SGST Price (9%)'].sum()
total_igst_price = grouped['IGST Price (18%)'].sum()

total_row = pd.DataFrame({
    'Sl No': 'Total',
    'Customer Name': '',
    'Customer GST Num': '',
    'Ass.Value': total_taxable_amt,
    'CGST Price (9%)': total_cgst_price,
    'SGST Price (9%)': total_sgst_price,
    'IGST Price (18%)': total_igst_price,
    'HSN/SSC': '',
}, index=[0])

combined_df = pd.concat([combined_df, total_row], ignore_index=True)
print(combined_df)
combined_df['HSN/SSC'] = combined_df['HSN/SSC'].iloc[:-1].where(combined_df['Sl No'] != len(combined_df), 9988)

combined_df['Invoice Value'] = combined_df['Ass.Value'] + combined_df['IGST Price (18%)'] + combined_df['CGST Price (9%)'] + combined_df['SGST Price (9%)']
combined_df['Invoice Value'] = pd.to_numeric(combined_df['Invoice Value']).round()
combined_df[['Ass.Value', 'IGST Price (18%)', 'CGST Price (9%)', 'SGST Price (9%)']] = combined_df[['Ass.Value', 'IGST Price (18%)', 'CGST Price (9%)', 'SGST Price (9%)']].apply(lambda x: x.astype(float))
combined_df['Round Off'] = combined_df.apply(lambda row: row['Invoice Value'] - (row['Ass.Value'] + row['IGST Price (18%)'] + row['CGST Price (9%)'] + row['SGST Price (9%)']) if row['Sl No'] != 'Total' else None, axis=1)

column_order = ['Sl No', 'Customer Name', 'Customer GST Num', 'Invoice Number', 'Invoice Date', 'Quantity',
                 'Ass.Value', 'IGST Price (18%)', 'CGST Price (9%)', 'SGST Price (9%)', 'Invoice Value','Round Off','HSN/SSC']
combined_df = combined_df[column_order]

writer = pd.ExcelWriter('report.xlsx', engine='xlsxwriter')
combined_df.to_excel(writer, sheet_name='Sheet1', index=False)

workbook = writer.book
worksheet = writer.sheets['Sheet1']

# right_aligned_columns = ['Invoice Value','Ass.Value', 'CGST Price (9%)', 'SGST Price (9%)', 'IGST Price (18%)']

# for col in right_aligned_columns:
#     format = workbook.add_format({'align': 'right'})
#     col_idx = combined_df.columns.get_loc(col)
#     worksheet.set_column(col_idx, col_idx, None, format)

right_aligned_columns = ['Ass.Value', 'CGST Price (9%)', 'SGST Price (9%)', 'IGST Price (18%)', 'Invoice Value']
right_aligned_format = workbook.add_format({'align': 'right'})

for col in right_aligned_columns:
    col_idx = combined_df.columns.get_loc(col)
    worksheet.set_column(col_idx, col_idx, None, right_aligned_format)


for col in combined_df.columns:
    column_length = max(combined_df[col].astype(str).map(len).max(), len(col)) + 1
    col_idx = combined_df.columns.get_loc(col)
    worksheet.set_column(col_idx, col_idx, column_length)
    
# bold_format = workbook.add_format({'bold': True, 'align': 'right'})
# for col in ['Sl No','Ass.Value', 'CGST Price (9%)', 'SGST Price (9%)', 'IGST Price (18%)']:
#     col_idx = combined_df.columns.get_loc(col)
#     worksheet.write(len(df), col_idx, total_row.iloc[0][col], bold_format)  
bold_format = workbook.add_format({'bold': True, 'align': 'right'})

for col in combined_df.columns:
    col_idx = combined_df.columns.get_loc(col)
    cell_value = combined_df.iloc[-1][col]

    if pd.isna(cell_value):
        cell_value = ''  

    worksheet.write(len(combined_df), col_idx, cell_value, bold_format)




# for col_num, value in enumerate(df.columns.values):
#     column_len = max(df[value].astype(str).str.len().max(), len(value)) + 2  # Add extra width
#     worksheet.set_column(col_num, col_num, column_len)
    
writer.close()



