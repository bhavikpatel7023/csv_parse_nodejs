const csv = require('csv-parser');
const fs = require('fs');
var rows_member = []
var rows_offer = []
var rows_offer_header = []
fs.createReadStream('members.csv')
    .pipe(csv())
    .on('data', (row) => {
        rows_member.push(row)
    })
    .on('end', () => {
        fs.createReadStream('offers1.csv')
            .pipe(csv())
            .on('headers', (headers) => {
                rows_offer_header = headers
              })
            .on('data', (row) => {
                rows_offer.push(row)
            })
            .on('end', () => {
                // console.log(rows_member)
                // console.log(rows_offer)
                writeFile(calculateId(rows_member,rows_offer))
            });

    });

function calculateId(row1,row2){
    // console.log(row1[0])
    // console.log(row2[0]);
    for(let row of row2){

        let filteredRow = row1.filter(element => element['name'] === row['Offer Recipient']);
        if(filteredRow.length >0){
            console.log('called');
            row['ID'] = filteredRow[0]['ID']
        }
        //console.log(row);
    }

    return row2
    

}


function writeFile( data) {
     console.log(data);
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: rows_offer_header
    });
    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}