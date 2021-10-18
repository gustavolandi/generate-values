import { Injectable } from '@angular/core';

const keypair = require('keypair');

@Injectable({
    providedIn: 'root'
  })
export class RsaKeyService {

    constructor(){
    
    }

    generateKeyPairRSA(bitsSelect : number = 2048){
        const pair = keypair({
            bits : bitsSelect
        });
        return pair;
    }


}

