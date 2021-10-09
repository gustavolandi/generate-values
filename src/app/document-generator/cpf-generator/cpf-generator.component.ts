import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportExcel } from 'src/app/service/export-excel.service';
import { Clipboard } from "@angular/cdk/clipboard"
import { ExportExcelModel } from 'src/app/service/model/ExportExcelModel';
import { ExportFilesType } from 'src/app/service/model/ExportFilesType';

const faker = require('faker');

export interface CpfDigits {
  firstDigit : string;
  secondDigit : string;
}

@Component({
    selector: 'cpf-generator',
    templateUrl: './cpf-generator.component.html',
    styleUrls: ['./cpf-generator.component.css']
  })
  export class CPFGeneratorComponent implements OnInit {
    
    cpfGenerated = '';
    errorCpf = '';
    cpfValid = '';

    exportValue: number = 100;
    typeFile = 'xlsx';
    errorMessage = '';

    typesFiles : ExportFilesType[] = [
        { type : 'xlsx'},
        { type : 'csv' },
        { type : 'txt' }
    ];

    constructor(private clipboard: Clipboard,
      private _snackBar: MatSnackBar,
      private exportExcel: ExportExcel){
    }
    
    ngOnInit(): void {
       this.generateCpf();
    }

    copyValue(){
      this.clipboard.copy(this.cpfGenerated);
      this._snackBar.open('Copied!','',{
          duration: 500
        });
    }

    generateCpf() {
      let cpfRandom = '';
      for (let i=0;i<9;i++) {
          cpfRandom += faker.datatype.number({
            'min': 0,
            'max': 9
        }).toString();
      }
      const cpfDigits = this.calculateDigitsCpf(cpfRandom);
      this.cpfGenerated = cpfRandom + cpfDigits.firstDigit.toString() + cpfDigits.secondDigit.toString();
      return this.cpfGenerated;
    }

    calculateDigitsCpf(cpf : string) : CpfDigits {
      const cpfArray = cpf.split('');
      let sumFirstDigit = 0, sumSecondDigit = 0;
      for (let i=0;i<9;i++) {
        sumFirstDigit += parseInt(cpfArray[i])*(10-i);
        sumSecondDigit += parseInt(cpfArray[i])*(11-i);
      }
      let firstDigit = sumFirstDigit*10 % 11;
      if (firstDigit >= 10) {
        firstDigit = 0;
      }
      sumSecondDigit += firstDigit*2;
      let secondDigit = sumSecondDigit*10 % 11;
      if (secondDigit >= 10) {
        secondDigit = 0;
      }
      return {
        firstDigit : firstDigit.toString(),
        secondDigit : secondDigit.toString()
      };
    }

    validateCpf(event : any) {
      const cpf = event != null && event != undefined ? event.target.value : '';
      this.errorCpf = '';
      this.cpfValid = '';
      if (cpf.length == 11) {
        const cpfDigits = this.calculateDigitsCpf(cpf);
        if (cpf.substring(9,10) === cpfDigits.firstDigit.toString() && cpf.substring(10,11) === cpfDigits.secondDigit.toString()){
          this.cpfValid = 'CPF Válido';
        } else {
          this.errorCpf = 'CPF Inválido';
        }
      }
    }

    exportCpf(event: any){
      console.log('exporting cpf...');
      const exportCpf : ExportExcelModel[] = [];
      for (let i=0;i<event.exportItens;i++) {
        exportCpf.push({
              firstColumn : this.generateCpf()
          });
      }
      this.exportExcel.exportFile(exportCpf,'CPF-generate',event.fileType,'CPF');
    }
      

  }