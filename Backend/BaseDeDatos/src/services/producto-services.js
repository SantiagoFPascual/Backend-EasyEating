import config from '../../dbconfig.js';
import sql from 'mssql';
import axios from 'axios';
import https from 'https'

const URL="https://world.openfoodfacts.org/api/v0/product/"

export default class ProductoService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: ProductoService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM Producto')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnAll;
    }

    getNutritionalInfo = async (barcode) => {
        console.log("ENTRA A GET_NUTRITIONAL_INFO")
        let returnEntity = null;
        var productoEscaneado

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
                    console.log("Entra al status=1")
                    console.log(producto.product._id)
                    /*console.log("BAR CODE:")
                    console.log(producto.product._id)*/

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
                
                    try {
                        let pool = await sql.connect(config);
                        let result = await pool.request()
                        .input('pBarCode', sql.NChar, productoEscaneado.barCode)
                        .input('pNombre', sql.NChar, productoEscaneado.nombre)
                        .input('pProteinas', sql.Float, productoEscaneado.proteinas)
                        .input('pCarbohidratos', sql.Float, productoEscaneado.carbohidratos)
                        .input('pGrasas', sql.Float, productoEscaneado.grasas)
                        .input('pGrasasSaturadas', sql.Float, productoEscaneado.grasasSaturadas)
                        .input('pCalorias', sql.Int, productoEscaneado.calorias)
                        .query('INSERT INTO Producto (barCode, nombre, proteinas, carbohidratos, grasas, grasasSaturadas, calorias) VALUES(@pBarCode, @pNombre, @pProteinas, @pCarbohidratos, @pGrasas, @pGrasasSaturadas, @pCalorias)');
                        returnEntity = result.rowsAffected;
                    } catch (error){
                        console.log(error);
                    }
                
            } else {
                console.log('Status = 0. El barcode no existe');
                returnEntity = null
                
            }
        } else {
            console.log('Error en la respuesta de la API');
            
        }
    } catch (error) {
        console.log(error);
    
    }
    return returnEntity
    }
    

    getById = async (barCode) => {
        let returnEntity = null;
        console.log('Estoy en: ProductoService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pBarCode', sql.NChar, barCode)
                                    .query('SELECT * FROM Producto WHERE barCode = @pBarCode');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        console.log('Estoy en: ProductoService.GetById(id) FIN');
        console.log("ReturnEntity " + returnEntity);

        return returnEntity;
    }

    insert = async (Producto) => {
        let returnEntity = null;
        console.log('Estoy en: ProductoService.insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pBarCode', sql.NChar, Producto.barCode)
            .input('pNombre', sql.NChar, Producto.nombre)
            .input('pProteinas', sql.Float, Producto.proteinas)
            .input('pCarbohidratos', sql.Float, Producto.carbohidratos)
            .input('pGrasas', sql.Float, Producto.grasas)
            .input('pGrasasSaturadas', sql.Float, Producto.grasasSaturadas)
            .input('pCalorias', sql.Int, Producto.calorias)
            .query('INSERT INTO Producto (barCode, nombre, proteinas, carbohidratos, grasas, grasasSaturadas, calorias) VALUES(@pBarCode, @pNombre, @pProteinas, @pCarbohidratos, @pGrasas, @pGrasasSaturadas, @pCalorias)');
            returnEntity = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    update = async (id, Producto) => {
        let updateReturn = null;
        console.log('Estoy en: ProductoService.update');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pIdProducto', sql.Int, id)
            .input('pBarCode', sql.NChar, Producto.barCode)
            .input('pNombre', sql.NChar, Producto.nombre)
            .input('pProteinas', sql.Float, Producto.proteinas)
            .input('pCarbohidratos', sql.Float, Producto.carbohidratos)
            .input('pGrasas', sql.Float, Producto.grasas)
            .input('pGrasasSaturadas', sql.Float, Producto.grasasSaturadas)
            .input('pCalorias', sql.Int, Producto.calorias)
            .query('UPDATE Producto set barcode = @pBarCode, nombre = @pNombre, proteinas = @pProteinas, carbohidratos = @pCarbohidratos, grasas = @pGrasas, grasasSaturadas = @pGrasasSaturadas, calorias = @pCalorias WHERE idProducto = @pId;');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }

    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: ProductoService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdProducto', sql.Int, id)
                .query('DELETE FROM Producto WHERE idProducto = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
