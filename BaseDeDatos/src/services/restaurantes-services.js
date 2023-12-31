import config from '../../dbconfig.js';
import sql from 'mssql';

export default class RestauranteService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: restauranteService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM Restaurante')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnAll;
    }

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: restauranteService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Restaurante WHERE idRestaurante = @pId');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    getCoordsAll = async () => {
        let returnAll = null;
        console.log("Estoy en: restauranteService.getCoordsAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select latitud, longitud FROM Restaurante')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnAll;
    }

    getCoordsById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: restauranteService.GetCoordsById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT latitud, longitud FROM Restaurante WHERE idRestaurante = @pId');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        console.log('Estoy en: restauranteService.GetById(id) FIN');
        console.log(returnEntity);
        return returnEntity;
    }


    insert = async (restaurante) => {
        let returnEntity = null;
        console.log('Estoy en: restauranteService.insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pNombre', sql.NChar, restaurante.nombre)
            .input('pDireccion', sql.NChar, restaurante.direccion)
            .input('pLatitud', sql.Float, restaurante.latitud)
            .input('pLongitud', sql.Float, restaurante.longitud)
            .input('pHorario', sql.NChar, restaurante.horario)
            .input('pTelefono', sql.Int, restaurante.telefono)
            .input('pFoto', sql.NChar, restaurante.foto)
            .query('INSERT INTO Restaurante (nombre, direccion, latitud, longitud, horario, telefono, foto) VALUES(@pNombre, @pDireccion, @pLatitud, @pLongitud, @pHorario, @pTelefono, @pFoto)');
            returnEntity = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    update = async (id, restaurante) => {
        let updateReturn = null;
        console.log('Estoy en: restauranteService.update');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pId', sql.Int, id)
            .input('pNombre', sql.NChar, restaurante.nombre)
            .input('pDireccion', sql.NChar, restaurante.direccion)
            .input('pLatitud', sql.Float, restaurante.latitud)
            .input('pLongitud', sql.Float, restaurante.longitud)
            .input('pHorario', sql.NChar, restaurante.horario)
            .input('pTelefono', sql.Int, restaurante.telefono)
            .input('pFoto', sql.NChar, restaurante.foto)
            .query('UPDATE Restaurante set nombre = @pNombre, direccion = @pDireccion, latitud = @pLatitud, longitud = @pLongitud, horario = @pHorario, telefono = @pTelefono, foto = @pFoto WHERE idRestaurante = @pId;');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }

    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: restauranteService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Restaurante WHERE idRestaurante = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}