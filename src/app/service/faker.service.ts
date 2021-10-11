import { Injectable } from '@angular/core';

const faker = require('faker');

@Injectable({
    providedIn: 'root'
  })
export class FakerService {

    constructor(){

    }

    public generateNumber(minValue : number, maxValue : number) : number {
        return faker.datatype.number({
            'min': minValue,
            'max': maxValue
        });
    }
}