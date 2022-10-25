import {readFileSync} from "fs";

const strArochem =  readFileSync("arochem.json").toString();
const assortedProducts = JSON.parse(strArochem);

let products = [];

for(let product of assortedProducts) {
    const key = Object.keys(product).find(f=> f != 'id');
    if(typeof product[key] == 'object' && Array.from(product[key]).length && product[key].length > 0) {

    }
    if(product) {

    }
}

assortedProducts.forEach(element => {
    if(element){

    }
});


console.log(assortedProducts);