import config from '../../dbconfig.js';
import sql from 'mssql';
import axios from 'axios';
import https from 'https'

const URL="https://world.openfoodfacts.org/api/v0/product/"

export default class LimitacionesXProductoService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: limitacionesXProductoService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM LimitacionXProducto')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        console.log("ACA:")
        return returnAll;
    }

    getByIdProducto = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXProductoService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pIdProducto', sql.Int, id)
                                    .query('SELECT * FROM LimitacionXProducto WHERE idProducto = @pIdProducto');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        console.log('Estoy en: limitacionesXProductoService.GetById(id) FIN');
        console.log(returnEntity);
        return returnEntity;
    }


    insertCeliaquia = async (idProducto, barcode) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXProductoService.insert')

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
                    var length_labels = producto.product.labels_hierarchy.length
                    var aptoCeliacos = false;

                    for (let i = 0; i < length_labels; i++) {    
                        if (producto.product.labels_hierarchy[i] == 'es:sin-tacc' || producto.product.labels_hierarchy[i] == 'en:no-gluten') {
                            aptoCeliacos = true;
                        }     
                    }

                    if(aptoCeliacos == false){
                        try {
                            let pool = await sql.connect(config);
                            let result = await pool.request()
                            .input('pIdProducto', sql.Int, idProducto)
                            .input('pIdLimitacion', sql.Int, 1)
                            .query('INSERT INTO LimitacionXProducto (idProducto, idLimitacion) VALUES(@pIdProducto, @pIdLimitacion)');
                            returnEntity = result.rowsAffected;
                        } catch (error){
                            console.log(error);
                        }
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
        
        return returnEntity;
    }
    }

    insertDiabetes = async (idProducto, barcode) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXProductoService.insert')

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
                    var aptoDiabetes = false;

                    if(producto.product.nutriments.carbohydrates_100g < 12)
                    {
                        aptoDiabetes = true;
                    }

                    if(aptoDiabetes == false){
                        try {
                            let pool = await sql.connect(config);
                            let result = await pool.request()
                            .input('pIdProducto', sql.Int, idProducto)
                            .input('pIdLimitacion', sql.Int, 2)
                            .query('INSERT INTO LimitacionXProducto (idProducto, idLimitacion) VALUES(@pIdProducto, @pIdLimitacion)');
                            returnEntity = result.rowsAffected;
                        } catch (error){
                            console.log(error);
                        }
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
        
        return returnEntity;
    }
    }

    insertIntLactosa = async (idProducto, barcode) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXProductoService.insert')

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
                    var length_labels_lactose = producto.product.labels_hierarchy.length
                    var aptoIntLactosa = false;

                    for (let i = 0; i < length_labels_lactose; i++) {    
                        if (producto.product.labels_hierarchy[i] == 'en:no-lactose' || producto.product.labels_hierarchy[i] == '') {
                            aptoIntLactosa = true;
                        }
                    }

                    if(aptoIntLactosa == false){
                        try {
                            let pool = await sql.connect(config);
                            let result = await pool.request()
                            .input('pIdProducto', sql.Int, idProducto)
                            .input('pIdLimitacion', sql.Int, 3)
                            .query('INSERT INTO LimitacionXProducto (idProducto, idLimitacion) VALUES(@pIdProducto, @pIdLimitacion)');
                            returnEntity = result.rowsAffected;
                        } catch (error){
                            console.log(error);
                        }
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
        
        return returnEntity;
    }
    }


    update = async (id, limitacionXProducto) => {
        let updateReturn = null;
        console.log('Estoy en: limitacionesXProductoService.update');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pIdLimitacionXProducto', sql.Int, id)
            .input('pIdProducto', sql.Int, limitacionXProducto.idProducto)
            .input('pIdLimitacion', sql.Int, limitacionXProducto.idLimitacion)
            .query('UPDATE LimitacionXProducto set idProducto = @pIdProducto, idLimitacion = @pIdLimitacion  WHERE idLimitacionXProducto = @pIdLimitacionXProducto');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }


    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: limitacionesXProductoService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdLimitacionXProducto', sql.Int, id)
                .query('DELETE FROM LimitacionXProducto WHERE idLimitacionXProducto = @pIdLimitacionXProducto');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    deleteByIdProducto= async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: limitacionesXProductoService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdProducto', sql.Int, id)
                .query('DELETE FROM LimitacionXProducto WHERE pIdProducto = @pIdProducto');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
