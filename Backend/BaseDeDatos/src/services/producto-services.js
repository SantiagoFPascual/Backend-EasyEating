import config from '../../dbconfig.js';
import sql from 'mssql';

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

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: ProductoService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pIdProducto', sql.Int, id)
                                    .query('SELECT * FROM Producto WHERE barCode = @pBarCode');
            returnEntity = result.recordsets[0][0];

        } catch (error) {
            console.log(error);
        }
        console.log('Estoy en: ProductoService.GetById(id) FIN');
        console.log(returnEntity);
        return returnEntity;
    }

    insert = async (Producto) => {
        let returnEntity = null;
        console.log('Estoy en: ProductoService.insert')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pBarCode', sql.Int, Producto.barCode)
            .input('pNombre', sql.NChar, Producto.nombre)
            .input('pProteinas', sql.Float, Producto.proteinas)
            .input('pCarbohidratos', sql.Float, Producto.carbohidratos)
            .input('pGrasas', sql.Float, Producto.grasas)
            .input('pGrasasSaturadas', sql.Float, Producto.grasasSaturadas)
            .query('INSERT INTO Producto (barCode, nombre, proteinas, carbohidratos, grasas, grasasSaturadas) VALUES(@pBarCode, @pNombre, @pProteinas, @pCarbohidratos, @pGrasas, @pGrasasSaturadas)');
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
               .input('pBarCode', sql.Int, Producto.barCode)
               .input('pNombre', sql.NChar, Producto.nombre)
               .input('pProteinas', sql.Float, Producto.proteinas)
               .input('pCarbohidratos', sql.Float, Producto.carbohidratos)
               .input('pGrasas', sql.Float, Producto.grasas)
               .input('pGrasasSaturadas', sql.Float, Producto.grasasSaturadas)
               .query('UPDATE Producto set barcode = @pBarCode, nombre = @pNombre, proteinas = @pProteinas, carbohidratos = @pCarbohidratos, grasas = @pGrasas, grasasSaturadas = @pGrasasSaturadas WHERE idProducto = @pId;');
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
                .input('pId', sql.Int, id)
                .query('DELETE FROM Producto WHERE idProducto = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}