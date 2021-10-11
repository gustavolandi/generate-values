import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportExcel } from 'src/app/service/export-excel.service';
import { ExportExcelModel } from 'src/app/service/model/ExportExcelModel';
import { FileParams } from 'src/app/service/model/FileParams';
import { Clipboard } from '@angular/cdk/clipboard'
import { DocumentDigits } from '../DocumentDigits';
import { CnpjPipe } from 'src/app/shared/pipes/cnpj.pipe';
import { FakerService } from 'src/app/service/faker.service';

const DIGITS_CNPJ = '0001';

@Component({
    selector: 'cnpj-generator',
    templateUrl: './cnpj-generator.component.html',
    styleUrls: ['./cnpj-generator.component.css']
  })
  export class CNPJGeneratorComponent implements OnInit {
    
    cnpjGenerated = '';
    errorCnpj = '';
    cnpjValid = '';
    cnpjToValidate = '';
    formatCnpj = 1;
    formats = [{text: 'Formatado', id : 1 }, {text: 'Apenas Números', id: 2}];

    constructor(private clipboard: Clipboard,
      private _snackBar: MatSnackBar,
      private exportExcel: ExportExcel,
      private cnpjPipe : CnpjPipe,
      private fakerService : FakerService){
    }
    
    ngOnInit(): void {
       this.generateCnpj();
    }

    copyValue(format : boolean){
      if (format) {
        this.clipboard.copy(this.cnpjPipe.transform(this.cnpjGenerated));
      } else {
        this.clipboard.copy(this.cnpjGenerated);
      }
      this._snackBar.open('Copiado!','',{
          duration: 750
        });
    }

    generateCnpj() {
      let cnpjRandom = '';
      while (this.validateDigitsEquals(cnpjRandom)) {
        cnpjRandom = '';
        for (let i=0;i<8;i++) {
          cnpjRandom += this.fakerService.generateNumber(0,9);
        }
      }
      cnpjRandom += DIGITS_CNPJ;
      const cnpj = this.calculateDigitsCnpj(cnpjRandom);
      this.cnpjGenerated = cnpjRandom + cnpj.firstDigit.toString() + cnpj.secondDigit.toString();
      return this.cnpjGenerated;
    }

    calculateDigitsCnpj(cnpj : string) : DocumentDigits {
      const cnpjArray = cnpj.split('');
      let sumFirstDigit = 0, sumSecondDigit = 0;
      for (let i=0;i<12;i++) {
        if (i<4) {
          sumFirstDigit += parseInt(cnpjArray[i])*(5-i);
        } else {
          sumFirstDigit += parseInt(cnpjArray[i])*(13-i);
        }
        if (i < 5) {
          sumSecondDigit += parseInt(cnpjArray[i])*(6-i);
        } else {
          sumSecondDigit += parseInt(cnpjArray[i])*(14-i);
        }
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

    validateCnpj() {
      const cnpj = this.cnpjToValidate.replace(/[^0-9]/g,'');
      this.errorCnpj = '';
      this.cnpjValid = '';
      if (cnpj.length == 14) {
        if (this.validateDigitsEquals(cnpj)){
          this.errorCnpj = 'CNPJ Inválido';
        } else {
          const cpfDigits = this.calculateDigitsCnpj(cnpj);
          if (cnpj.substring(12,13) === cpfDigits.firstDigit.toString() && cnpj.substring(13,14) === cpfDigits.secondDigit.toString()){
            this.cnpjValid = 'CNPJ Válido';
          } else {
            this.errorCnpj = 'CNPJ Inválido';
          }
        }
      }
    }

    validateDigitsEquals(cnpj: string) : boolean {
        return cnpj.split('').every(char => char === cnpj[0]);
    }

    exportCnpj(fileParams: FileParams){
      const exportCnpj : ExportExcelModel[] = [];
      if (this.formatCnpj === 1) {
        for (let i=0;i<fileParams.exportItens;i++) {
          exportCnpj.push({
                firstColumn : this.cnpjPipe.transform(this.generateCnpj())
            });
        }
      } else {
        for (let i=0;i<fileParams.exportItens;i++) {
          exportCnpj.push({
                firstColumn : this.generateCnpj()
            });
        }
      }
      fileParams.fileName = 'CNPJ-generate';
      fileParams.worksheetName = 'CNPJ';
      fileParams.firstColumnSize = 14;
      this.exportExcel.exportFile(exportCnpj,fileParams);
    }

  }