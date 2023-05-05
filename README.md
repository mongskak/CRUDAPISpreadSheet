# CRUDAPISpreadSheet
melakukan crud dengan spreadsheet seolah olah menjadi database atau sumber datanya dengan melakukan request API


Langkah Langkah
1. Buka Google Spreadsheet dan masukan nama atau atribute apa saja di kolom spreadsheet
NOTES! WAJIB MENYERTAKAN "id" (huruf kecil) di awal kolom sebelum menambah attribute name yg di inginkan
karena id sudah generate otomatis dengan UUID
2. lalu buka tab alat dan pilih Google Script
3. paste code nya
4. jangan lupa mengganti nama sheet nya dengan sheet yang baru di buat
5. deploy sebagai web app


Melakukan Request API

1. untuk melakukan insert data 
[link deploy spreadsheet]?action={method}

a. [link deploy] nya ganti dengan link yang di hasilkan ketika deploy bagian web app
b. dengan menggunakan parameter "?action=" bisa di isikan sebagai
    - ?action=insert    :  penanda bahwa permintaan sebagai insert data dengan request data di body sesuai kolom spreadsheet
    - ?action=update    :  penanda bahwa permintaan sebagai update data dengan request data di body berdasarkan id nya 
    - ?action=delete    :  penanda bahwa permintaan sebagai delete data dengan request data di body delete berdasarkan id
    - ?action=getbyid   :  penanda bahwa permintaan sebagai get single data dengan request data di body , data yang akan di tampilkan berdasarkan request id 
c. selesai :)


SEMOGA BERMANFAAT
