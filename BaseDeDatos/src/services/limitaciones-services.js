import config from '../../dbconfig.js';
import sql from 'mssql';

export default class LimitacionesService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: limitacionesService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM Limitacion')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnAll;
    }

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Limitacion WHERE idLimitacion = @pId');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        console.log('Estoy en: limitacionesService.GetById(id) FIN');
        console.log(returnEntity);
        return returnEntity;
    }


    insert = async (limitaciones) => {
        let returnEntity = null;
        console.log('Estoy en: limitacionesService.insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pLimitacion', sql.NChar, limitaciones.limitacion)
            .query('INSERT INTO Limitacion (limitacion) VALUES(@pLimitacion)');
            returnEntity = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return returnEntity;
    }


    update = async (id, limitaciones) => {
        let updateReturn = null;
        console.log('Estoy en: limitacionesService.update');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
               .input('pId', sql.Int, id)
               .input('pLimitacion', sql.NChar, limitaciones.limitacion)
               .query('UPDATE Limitacion set limitacion = @pLimitacion WHERE idLimitacion = @pId');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }


    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: limitacionesService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Limitacion WHERE idLimitacion = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

