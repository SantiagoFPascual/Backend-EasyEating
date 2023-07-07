import config from '../../dbconfig.js';
import sql from 'mssql';

export default class UsuariosService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: usuariosService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM Usuario')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnAll;
    }


    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: usuariosService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Usuario WHERE idUsuario = @pId');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        console.log('Estoy en: usuariosService.GetById(id) FIN');
        console.log(returnEntity);
        return returnEntity;
    }

    insert = async (usuarios) => {
        let returnEntity = null;
        console.log('Estoy en: usuariosService.insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pNombre', sql.NChar, usuarios.nombre)
            .input('pApellido', sql.NChar, usuarios.apellido)
            .input('pCorreo', sql.NChar, usuarios.correo)
            .input('pContrasena', sql.NChar, usuarios.contrasena)
            .input('pFechaNacimiento', sql.NChar, usuarios.fechaNacimiento)
            .input('pIdLimitacion', sql.Int, usuarios.idLimitacion)
            .query('INSERT INTO Usuario (nombre, apellido, correo, contrasena, fechaNacimiento, idLimitacion) VALUES(@pNombre, @pApellido, @pCorreo, @pContrasena, @pFechaNacimiento, @pIdLimitacion)');
            returnEntity = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return returnEntity;
    }


    update = async (id, usuarios) => {
        let updateReturn = null;
        console.log('Estoy en: usuariosService.update');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
               .input('pId', sql.Int, id)
               .input('pNombre', sql.NChar, usuarios.nombre)
               .input('pApellido', sql.NChar, usuarios.apellido)
               .input('pCorreo', sql.NChar, usuarios.correo)
               .input('pContrasena', sql.NChar, usuarios.contrasena)
               .input('pFechaNacimiento', sql.NChar, usuarios.fechaNacimiento)
               .input('pIdLimitacion', sql.Int, usuarios.idLimitacion)
               .query('UPDATE Usuario set nombre = @pNombre, apellido = @pApellido, correo = @pCorreo, contrasena = @pContrasena, fechaNacimiento = @pFechaNacimiento, idLimitacion = @pIdLimitacion WHERE idUsuario = @pId;');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }



    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: usuariosService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Usuario WHERE idUsuario = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}




