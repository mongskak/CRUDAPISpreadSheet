# CRUDAPISpreadSheet
melakukan crud dengan spreadsheet seolah olah menjadi database atau sumber datanya dengan melakukan request API


+ Langkah Langkah
1. bUAT Google Spreadsheet dan masukan nama atau atribute apa saja di kolom spreadsheet
NOTES! WAJIB MENYERTAKAN "id" (huruf kecil) di awal kolom sebelum menambah attribute name yg di inginkan
karena id sudah generate otomatis dengan UUID
2.  lalu buka tab extensi dan pilih Google Script
3.  paste code nya
4.  deploy sebagai web app


+ Melakukan Request API

PARAMETER :
[link deploy spreadsheet]?action={method}

1.  [link deploy] nya ganti dengan link yang di hasilkan ketika deploy bagian web app
2.  METHOD POST ?action=insert
    penanda bahwa permintaan sebagai insert data dengan request data di body sesuai kolom spreadsheet
3.  METHOD POST?action=update
    penanda bahwa permintaan sebagai update data dengan request data di body berdasarkan id nya 
4.  METHOD POST?action=delete
    penanda bahwa permintaan sebagai delete data dengan request data di body delete berdasarkan id
5.  METHOD POST?action=getbyid
    penanda bahwa permintaan sebagai get single data dengan request data di body , data yang akan di tampilkan berdasarkan request id 
2.  METHOD GET tanpa parameter action
    untuk mengembalikan semua list data
3.  selesai :)


SEMOGA BERMANFAAT
