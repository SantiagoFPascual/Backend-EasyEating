import config from '../../dbconfig.js';
import sql from 'mssql';

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

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXProductoService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pIdLimitacionXProducto', sql.Int, id)
                                    .query('SELECT * FROM LimitacionXProducto WHERE idLimitacionXProducto = @pIdLimitacionXProducto');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        console.log('Estoy en: limitacionesXProductoService.GetById(id) FIN');
        console.log(returnEntity);
        return returnEntity;
    }


    insert = async (limitacionXProducto) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesXProductoService.insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pIdProducto', sql.Int, limitacionXProducto.idProducto)
            .input('pIdLimitacion', sql.Int, limitacionXProducto.idLimitacion)
            .query('INSERT INTO LimitacionXProducto (idProducto, idLimitacion) VALUES(@pIdProducto, @pIdLimitacion)');
            returnEntity = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return returnEntity;
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
}