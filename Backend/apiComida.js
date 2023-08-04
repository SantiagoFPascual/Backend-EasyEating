import axios from 'axios'
import https from 'https'

//PARA SABER SI ES APTO PARA CELIACOS O INTOLERANTES A LA LACTOSA:
//traces_tags Línea 1925

function getNutritionalInfo(url){

    //ES MOMENTANEO EL REJECT UNAUTHORIZED

    axios.get(url, { 
    httpsAgent: new https.Agent({ rejectUnauthorized: false }) 
    })
    .then((result) => {
        var producto = result.data;
        //console.log(producto);
        if (producto != null) {
            console.log('BarCode: ' + producto.product._id);
            console.log('INFO NUTRICIONAL:');
            //EN LA LINEA 1536 DEL POSTMAN
            console.log('Calorías por 100g: ' + producto.product.nutriments.energy_value + producto.product.nutriments.energy_unit);
            console.log('Carbohidratos: ' + producto.product.nutriments.carbohydrates_100g + producto.product.nutriments.carbohydrates_unit);
            console.log('Grasas: ' + producto.product.nutriments.fat_100g + producto.product.nutriments.fat_unit);
            console.log('Porteínas: ' + producto.product.nutriments.proteins_100g + producto.product.nutriments.proteins_unit);
        } else {
            console.log('La propiedad _id no está definida en el producto');
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export default getNutritionalInfo