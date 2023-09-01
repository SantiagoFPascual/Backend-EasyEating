import axios from 'axios'
import https from 'https'

//PARA SABER SI ES APTO PARA CELIACOS O INTOLERANTES A LA LACTOSA:
//traces_tags Línea 1925

const URL="https://world.openfoodfacts.org/api/v0/product/"

export default function getNutritionalInfo(barcode){
    var aptoDiabetesEsp

    //ES MOMENTANEO EL REJECT UNAUTHORIZED
    let url_final = URL + barcode + '.json' 
    axios.get(url_final, { 
    httpsAgent: new https.Agent({ rejectUnauthorized: false }) 
    })
    .then((result) => {

        var aptoCeliacos, aptoDiabetes, aptoIntLactosa;

        var producto = result.data;
        //console.log(producto);
        if (producto != null) {
            console.log('BarCode: ' + producto.product._id);
            console.log('Nombre del producto: ' + producto.product.product_name + ' - ' + producto.product.brands);
            console.log('INFO NUTRICIONAL:');
            //EN LA LINEA 1536 DEL POSTMAN 
            console.log('Calorías por 100g: ' + producto.product.nutriments.energy_value + producto.product.nutriments.energy_unit);
            console.log('Carbohidratos: ' + producto.product.nutriments.carbohydrates_100g + producto.product.nutriments.carbohydrates_unit);
            console.log('Grasas: ' + producto.product.nutriments.fat_100g + producto.product.nutriments.fat_unit);
            console.log('Grasas saturadas: ' + producto.product.nutriments.saturated-fat_100g + producto.product.nutriments.saturated-fat_unit);
            console.log('Porteínas: ' + producto.product.nutriments.proteins_100g + producto.product.nutriments.proteins_unit);
        } else {
            console.log('La propiedad _id no está definida en el producto');
        }

        //CREAMOS EL OBJETO PRODUCTO

        const productoEscaneado{
            barCode=producto.product._id,

        }

        //PARA SABER SI ES APTO CELIACOS:
        aptoCeliacos = AptoCeliacos(producto)
        console.log("¿Es apto para celíacos? " + aptoCeliacos)

        //PARA SABER SI ES APTO INTOLERANTES A LA LACTOSA:
        aptoIntLactosa = AptoIntLactosa(producto)
        console.log("¿Es apto para intolerantes a la lactosa? " + aptoIntLactosa)

        //PARA SABER SI ES APTO DIABÉTICOS:
        aptoDiabetes = AptoDiabetes(producto)

        switch (aptoDiabetes) {
            case 1:
                aptoDiabetesEsp = 'No es apto, tiene más de 15g de carbohidratos por cada 100g';
                aptoDiabetes = false;
                
                break;
            case 2:
                aptoDiabetesEsp = 'Es apto para diabéticos'
                aptoDiabetes = true;
                    
                break;
            case 3:
                aptoDiabetesEsp = 'Es apto para diabéticos, aunque la cantidad de carbohidratos es un poco elevada'
                aptoDiabetes = true;
                        
                break;
        
            default:
                break;
        }
        
        console.log('¿Es apto para diabéticos? ' + aptoDiabetes + '. ' +  aptoDiabetesEsp)
        

    })
    .catch((error) => {
        console.log(error);
    });

    return productoEscaneado;
}

function AptoCeliacos(producto){
    var length_labels = producto.product.labels_hierarchy.length
    var aptoCeliacos = false;

    for (let i = 0; i < length_labels; i++) {    
        if (producto.product.labels_hierarchy[i] == 'es:sin-tacc' || producto.product.labels_hierarchy[i] == 'en:no-gluten') {
            aptoCeliacos = true;
        }     
    }

    return aptoCeliacos;
}

function AptoIntLactosa(producto){
    var length_labels_lactose = producto.product.labels_hierarchy.length
    var aptoIntLactosa = false;

    for (let i = 0; i < length_labels_lactose; i++) {    
        if (producto.product.labels_hierarchy[i] == 'en:no-lactose') {
            aptoIntLactosa = true;
        }     
    }

    return aptoIntLactosa
}

function AptoDiabetes(producto){
    //NO es apto para diabéticos
    var aptoDiabetes = 1;

    if(producto.product.nutriments.carbohydrates_100g < 12)
    {
        //ES apto para diabéticos
        aptoDiabetes = 2;
    }
    else if (producto.product.nutriments.carbohydrates_100g > 12 && producto.product.nutriments.carbohydrates_100g < 15)
    {
        //Es apto para diabéticos, aunque la cantidad de carbohidratos es un poco elevada
        aptoDiabetes = 3;
    }

    return aptoDiabetes
}