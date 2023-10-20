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
