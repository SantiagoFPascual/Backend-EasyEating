import getNutritionalInfo from './apiComida.js'

console.log("llega")

var url = 'https://world.openfoodfacts.org/api/v0/product/7790045824893.json';

getNutritionalInfo(url)