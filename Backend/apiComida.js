import axios from 'axios'
import https from 'https'

//PARA SABER SI ES APTO PARA CELIACOS O INTOLERANTES A LA LACTOSA:
//traces_tags Línea 1925

const URL="https://world.openfoodfacts.org/api/v0/product/"

function getNutritionalInfo(barcode){

    //ES MOMENTANEO EL REJECT UNAUTHORIZED
    let url_final = URL + barcode + '.json' 
    axios.get(url_final, { 
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

        //PARA SABER SI ES APTO CELIACOS:

        var length_labels = producto.product.labels_hierarchy.length
        var aptoCeliacos = false;

        for (let i = 0; i < length_labels; i++) {    
            if (producto.product.labels_hierarchy[i] == 'es:sin-tacc' || producto.product.labels_hierarchy[i] == 'en:no-gluten') {
                aptoCeliacos = true;
            }     
        }

        console.log("¿Es apto para celíacos? " + aptoCeliacos)
       
        //PARA SABER SI ES APTO INTOLERANTES A LA LACTOSA:

        var length_labels_lactose = producto.product.labels_hierarchy.length
        var aptoIntLactosa = false;

        for (let i = 0; i < length_labels_lactose; i++) {    
            if (producto.product.labels_hierarchy[i] == 'en:no-lactose') {
                aptoIntLactosa = true;
            }     
        }

        console.log("¿Es apto para intolerantes a la lactosa? " + aptoIntLactosa)

        //PARA SABER SI ES APTO DIABÉTICOS:

        var aptoDiabetes='No es apto, tiene más de 15g de carbohidratos por cada 100g';
        var aptoDiabetes = false;

        if(producto.product.nutriments.carbohydrates_100g < 12)
        {
            aptoDiabetes = 'Es apto para diabéticos'
            aptoDiabetes = true;
        }
        else if (producto.product.nutriments.carbohydrates_100g > 12 && producto.product.nutriments.carbohydrates_100g < 15)
        {
            aptoDiabetes = 'Es apto para diabéticos, aunque la cantidad de carbohidratos es un poco elevada'
            aptoDiabetes = true;
        }

        console.log("¿Es apto para diabéticos? " + aptoDiabetes)
        

    })
    .catch((error) => {
        console.log(error);
    });
}

export default getNutritionalInfo