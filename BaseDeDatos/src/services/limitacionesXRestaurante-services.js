import config from '../../dbconfig.js';
import sql from 'mssql';
import axios from 'axios';
import https from 'https'

const URL="https://world.openfoodfacts.org/api/v0/product/"

export default class LimitacionesXResauranteService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: limitacionesXRestauranteService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM LimitacionXRestaurante')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        console.log("ACA:")
        return returnAll;
    }

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXRestauranteService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pIdLimitacionXRestaurante', sql.Int, id)
                                    .query('SELECT * FROM LimitacionXRestaurante WHERE idLimitacionXRestaurante = @pIdLimitacionXRestaurante');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        console.log('Estoy en: limitacionesXRestauranteService.GetById(id) FIN');
        console.log(returnEntity);
        return returnEntity;
    }


    insertCeliaquia = async (idRestaurante, barcode) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXRestauranteService.insert')

        //ES MOMENTANEO EL REJECT UNAUTHORIZED
        let url_final = URL + barcode + '.json' 
        try {
            const response = await axios.get(url_final, {
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            });
            if (response.status === 200) {
                console.log("Entra al response.status === 200")
                const restaurante = response.data;
                if (restaurante.status === 1) {
                    var length_labels = Restaurante.product.labels_hierarchy.length
                    var aptoCeliacos = false;

                    for (let i = 0; i < length_labels; i++) {    
                        if (restaurante.product.labels_hierarchy[i] == 'es:sin-tacc' || restaurante.product.labels_hierarchy[i] == 'en:no-gluten') {
                            aptoCeliacos = true;
                        }     
                    }

                    if(aptoCeliacos == false){
                        try {
                            let pool = await sql.connect(config);
                            let result = await pool.request()
                            .input('pIdRestaurante', sql.Int, idRestaurante)
                            .input('pIdLimitacion', sql.Int, 1)
                            .query('INSERT INTO LimitacionXRestaurante (idRestaurante, idLimitacion) VALUES(@pIdRestaurante, @pIdLimitacion)');
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

    insertDiabetes = async (idRestaurante, barcode) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXRestauranteService.insert')

        //ES MOMENTANEO EL REJECT UNAUTHORIZED
        let url_final = URL + barcode + '.json' 
        try {
            const response = await axios.get(url_final, {
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            });
            if (response.status === 200) {
                console.log("Entra al response.status === 200")
                const restaurante = response.data;
                if (restaurante.status === 1) {
                    var aptoDiabetes = false;

                    if(restaurante.product.nutriments.carbohydrates_100g < 12)
                    {
                        aptoDiabetes = true;
                    }

                    if(aptoDiabetes == false){
                        try {
                            let pool = await sql.connect(config);
                            let result = await pool.request()
                            .input('pIdRestaurante', sql.Int, idRestaurante)
                            .input('pIdLimitacion', sql.Int, 2)
                            .query('INSERT INTO LimitacionXRestaurante (idRestaurante, idLimitacion) VALUES(@pIdRestaurante, @pIdLimitacion)');
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

    insertIntLactosa = async (idRestaurante, barcode) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXRestauranteService.insert')

        //ES MOMENTANEO EL REJECT UNAUTHORIZED
        let url_final = URL + barcode + '.json' 
        try {
            const response = await axios.get(url_final, {
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            });
            if (response.status === 200) {
                console.log("Entra al response.status === 200")
                const restaurante = response.data;
                if (restaurante.status === 1) {
                    var length_labels_lactose = restaurante.product.labels_hierarchy.length
                    var aptoIntLactosa = false;

                    for (let i = 0; i < length_labels_lactose; i++) {    
                        if (restaurante.product.labels_hierarchy[i] == 'en:no-lactose') {
                            aptoIntLactosa = true;
                        }     
                    }

                    if(aptoIntLactosa == false){
                        try {
                            let pool = await sql.connect(config);
                            let result = await pool.request()
                            .input('pIdRestaurante', sql.Int, idRestaurante)
                            .input('pIdLimitacion', sql.Int, 3)
                            .query('INSERT INTO LimitacionXRestaurante (idRestaurante, idLimitacion) VALUES(@pIdRestaurante, @pIdLimitacion)');
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


    update = async (id, limitacionXRestaurante) => {
        let updateReturn = null;
        console.log('Estoy en: limitacionesXRestauranteService.update');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pIdLimitacionXRestaurante', sql.Int, id)
            .input('pIdRestaurante', sql.Int, limitacionXRestaurante.idRestaurante)
            .input('pIdLimitacion', sql.Int, limitacionXRestaurante.idLimitacion)
            .query('UPDATE LimitacionXRestaurante set idRestaurante = @pIdRestaurante, idLimitacion = @pIdLimitacion  WHERE idLimitacionXRestaurante = @pIdLimitacionXRestaurante');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }


    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: limitacionesXRestauranteService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdLimitacionXRestaurante', sql.Int, id)
                .query('DELETE FROM LimitacionXRestaurante WHERE idLimitacionXRestaurante = @pIdLimitacionXRestaurante');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    deleteByIdRestaurante= async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: limitacionesXRestauranteService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdRestaurante', sql.Int, id)
                .query('DELETE FROM LimitacionXRestaurante WHERE pIdRestaurante = @pIdRestaurante');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
