import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { DatePipe } from '../../node_modules/@angular/common';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private datePipe: DatePipe) { }

  generateExcel(datos: any, cabeza: any){

    // console.log();


    
    // const title = 'Car Sell Report';
    // const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
    // const data = [
    //   [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
    //   [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
    //   [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
    //   [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
    //   [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4]
    // ];
    const title = 'Material Salida';
    const header = cabeza;
    const data = datos;


    //Create workbook and worksheet 
    let workbook = new Workbook();
    // let worksheet = workbook.addWorksheet('Car Data');
    let worksheet = workbook.addWorksheet('Material Salida');



    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])


    //Add Header Row
    let headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });



    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      // let qty = row.getCell(5);
      let qty = row.getCell(3);

      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999'
      }
      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }
    }
    );

    // worksheet.getColumn(3).width = 30;
    // worksheet.getColumn(4).width = 30;

    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(5).width = 30;
    worksheet.addRow([]);
    //Footer Row
    // let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    let footerRow = worksheet.addRow(['This is the last rolls for the last 30 days.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }





    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CarData.xlsx');
    })

  }
  generateExcel2(datos: any, cabeza: any){

    // console.log();


    
    // const title = 'Car Sell Report';
    // const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
    // const data = [
    //   [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
    //   [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
    //   [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
    //   [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
    //   [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4]
    // ];
    const title = 'Material Salida';
    const header = cabeza;
    const data = datos;


    //Create workbook and worksheet 
    let workbook = new Workbook();
    // let worksheet = workbook.addWorksheet('Car Data');
    let worksheet = workbook.addWorksheet('Material Salida');



    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])


    //Add Header Row
    let headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });



    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      // let qty = row.getCell(5);
      let qty = row.getCell(3);

      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999'
      }
      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }
    }
    );

    // worksheet.getColumn(3).width = 30;
    // worksheet.getColumn(4).width = 30;

    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(5).width = 30;
    worksheet.addRow([]);
    //Footer Row
    // let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    let footerRow = worksheet.addRow(['This is the last rolls for the last 30 days.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }





    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CarData.xlsx');
    })

  }

}
