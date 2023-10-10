import axios from 'axios'
import https from 'https'
import ProductoService from '../services/producto-services.js';

//PARA SABER SI ES APTO PARA CELIACOS O INTOLERANTES A LA LACTOSA:
//traces_tags Línea 1925

const URL="https://world.openfoodfacts.org/api/v0/product/"

export default class NutritionalInfo{
 getNutritionalInfo = async (barcode) => {
    console.log("ENTRA A GET_NUTRITIONAL_INFO")
    var aptoDiabetesEsp
    //ES MOMENTANEO EL REJECT UNAUTHORIZED
    let url_final = URL + barcode + '.json' 
    try {
        const response = await axios.get(url_final, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });
        if (response.status === 200) {
            console.log("Entra al response.status === 200")
            const producto = response.data;
            if (producto.status === 1) {
            /*console.log('-------------------------------');
            console.log(producto);
            console.log('-------------------------------');*/         
            /*

            var aptoCeliacos, aptoIntLactosa, aptoDiabetes

            console.log('BarCode: ' + producto.code);
            console.log('Nombre del producto: ' + producto.product.product_name + ' - ' + producto.product.brands);
            console.log('INFO NUTRICIONAL:');
            //EN LA LINEA 1536 DEL POSTMAN 
            console.log('Porteínas: ' + producto.product.nutriments.proteins_100g + producto.product.nutriments.proteins_unit);
            console.log('Carbohidratos: ' + producto.product.nutriments.carbohydrates_100g + producto.product.nutriments.carbohydrates_unit);
            console.log('Grasas: ' + producto.product.nutriments.fat_100g + producto.product.nutriments.fat_unit);
            //console.log('Grasas saturadas: ' + producto.product.nutriments.saturated-fat_100g + producto.product.nutriments.saturated-fat_unit);
            console.log('Calorías por 100g: ' + producto.product.nutriments.energy_value + producto.product.nutriments.energy_unit);
            
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
            */

            const registrosAfectados = await productoService.insert(info);
            var productoEscaneado = GetScannedProduct(producto)
            //console.log("PorducEscanedo: ");
            //console.log(producto);
            //resolve(productoEscaneado);
            return productoEscaneado
            
        } else {
            console.log('Status = 0. El barcode no existe');
            return null
            
        }
    } else {
        console.log('Error en la respuesta de la API');
        
    }
} catch (error) {
    console.log(error);

}
};
}

function GetScannedProduct(producto){
    //CREAMOS EL OBJETO PRODUCTO
    var productoEscaneado;

    if(producto.status != 0)
    {
        productoEscaneado = {
            barCode: producto.product._id,
            nombre: producto.product.product_name + ' - ' + producto.product.brands,
            proteinas: producto.product.nutriments.proteins_100g,
            carbohidratos: producto.product.nutriments.carbohydrates_100g,
            grasas: producto.product.nutriments.fat_100g,
            //grasasSaturadas: producto.product.nutriments.saturated-fat_100g,
            grasasSaturadas: 1.5,
            calorias: producto.product.nutriments.energy_value
        }
    }else{
        productoEscaneado=null
    }

    

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

    return aptoDiabetes
}