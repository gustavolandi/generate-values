import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportExcel } from 'src/app/service/export-excel.service';
import { Clipboard } from '@angular/cdk/clipboard'
import { ExportExcelModel } from 'src/app/service/model/ExportExcelModel';
import { FileParams } from 'src/app/service/model/FileParams';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';
import { DocumentDigits } from '../DocumentDigits';

const faker = require('faker');

@Component({
    selector: 'cpf-generator',
    templateUrl: './cpf-generator.component.html',
    styleUrls: ['./cpf-generator.component.css']
  })
  export class CPFGeneratorComponent implements OnInit {
    
    cpfGenerated = '';
    errorCpf = '';
    cpfValid = '';
    formatCpf = 1;
    cpfToValidate = '';
    formats = [{text: 'Formatado', id : 1 }, {text: 'Apenas Números', id: 2}];

    constructor(private clipboard: Clipboard,
      private _snackBar: MatSnackBar,
      private exportExcel: ExportExcel,
      private cpfPipe : CpfPipe){
    }
    
    ngOnInit(): void {
       this.generateCpf();
    }

    copyValue(format : boolean){
      if (format) {
        this.clipboard.copy(this.cpfPipe.transform(this.cpfGenerated));
      } else {
        this.clipboard.copy(this.cpfGenerated);
      }
      this._snackBar.open('Copiado!','',{
          duration: 750
        });
    }

    generateCpf() {
      let cpfRandom = '';
      while (this.validateDigitsEquals(cpfRandom)) {
        cpfRandom = '';
        for (let i=0;i<9;i++) {
          cpfRandom += faker.datatype.number({
            'min': 0,
            'max': 9
        }).toString();
      }
    }
      const cpfDigits = this.calculateDigitsCpf(cpfRandom);
      this.cpfGenerated = cpfRandom + cpfDigits.firstDigit.toString() + cpfDigits.secondDigit.toString();
      return this.cpfGenerated;
    }

    calculateDigitsCpf(cpf : string) : DocumentDigits {
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

    validateCpf() {
      const cpf = this.cpfToValidate.replace(/[^0-9]/g,'');
      this.errorCpf = '';
      this.cpfValid = '';
      if (cpf.length == 11) {
        if (this.validateDigitsEquals(cpf)){
          this.errorCpf = 'CPF Inválido';
        } else {
          const cpfDigits = this.calculateDigitsCpf(cpf);
          if (cpf.substring(9,10) === cpfDigits.firstDigit.toString() && cpf.substring(10,11) === cpfDigits.secondDigit.toString()){
            this.cpfValid = 'CPF Válido';
          } else {
            this.errorCpf = 'CPF Inválido';
          }
        }
      }
    }

    validateDigitsEquals(cpf: string) : boolean {
        return cpf.split('').every(char => char === cpf[0]);
    }

    exportCpf(fileParams: FileParams){
      const exportCpf : ExportExcelModel[] = [];
      if (this.formatCpf === 1) {
        for (let i=0;i<fileParams.exportItens;i++) {
          exportCpf.push({
                firstColumn : this.cpfPipe.transform(this.generateCpf())
            });
        }
      } else {
        for (let i=0;i<fileParams.exportItens;i++) {
          exportCpf.push({
                firstColumn : this.generateCpf()
            });
        }
      }
      fileParams.fileName = 'CPF-generate';
      fileParams.worksheetName = 'CPF';
      fileParams.firstColumnSize = 14;
      this.exportExcel.exportFile(exportCpf,fileParams);
    }
      

  }