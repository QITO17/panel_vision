import { mysqlRequest } from '../helpers/herpers.js';

const createCelulares = async (req, res) => {

    const {nombreCelular, numeroCelular,idNumeroCelular, estadoCelular} = req.body;

    const queryAndParams =
    {
      query: `INSERT INTO tbl_celulares (nombre_celular,numero_celular,id_numero_celular,estado_celular) VALUES (?,?,?,?)`,
      params: [nombreCelular,numeroCelular, idNumeroCelular, estadoCelular],
    }

    try {

        const userUpdate = await mysqlRequest(queryAndParams.query, queryAndParams.params);

        console.log("******************");
        console.log(userUpdate);

        res.json({
            ok: true,
            data: userUpdate
        });

        
        
    } catch (error) {

        res.json({
            ok:false,
            error: error
        })
        
        
    }
};

const editCelulares = async (req, res) => {

    const {nombreCelular, numeroCelular,idNumeroCelular, estadoCelular,idCelular} = req.body;

    const queryAndParams =
    {
      query: `UPDATE tbl_celulares SET nombre_celular = ?, numero_celular = ?, id_numero_celular=?, estado_celular= ? WHERE id_celular= ?`,
      params: [nombreCelular,numeroCelular, idNumeroCelular, estadoCelular, idCelular],
    }

    try {

        const userUpdate = await mysqlRequest(queryAndParams.query, queryAndParams.params);

        console.log("******************");
        console.log(userUpdate);

        res.json({
            ok: true,
            data: userUpdate
        });

        
        
    } catch (error) {

        res.json({
            ok:false,
            error: error
        })
        
        
    }


};

const deleteCelulares = async (req, res) => {

    const {idCelular} = req.body;

    console.log(idCelular);

    const queryAndParams =
    {
      query: `DELETE FROM tbl_celulares WHERE id_celular = ?`,
      params: [idCelular],
    }

    try {

        const deleteCelular = await mysqlRequest(queryAndParams.query, queryAndParams.params);

        console.log("******************");
        // console.log(idCelular);
        console.log(deleteCelular);

        res.json({
            ok: true,
            data: deleteCelular
        });

        
        
    } catch (error) {

        console.log(error)

        res.json({
            ok:false,
            error: error
        })
        
    }

};

const listarCelulares = async (req, res) => {

    const queryAndParams =
    {
      query: `select * FROM tbl_celulares ORDER BY id_celular DESC`
    }

    try {

        const dataCelulares = await mysqlRequest(queryAndParams.query);

        res.json(dataCelulares);

        
        
    } catch (error) {

        console.log(error)

        res.status(400)
        
    }

};

const listarCelular = async (req, res) => {

    const {users} = req.body;

    // const queryAndParams =
    // {
    //   query: `INSERT INTO tbl_Celulares (nombre_Celular,id_zoho,estado_Celular) VALUES (?, ?, ?)`,
    //   params: [nameUser, idZoho, 1],
    // }

    // try {

    //     const userCreate = await mysqlRequest(queryAndParams.query, queryAndParams.params);

    //     console.log("******************");
    //     console.log(userCreate);

        
        
    // } catch (error) {

    //     console.log(error)

    //     res.status(400)
        
    // }

    res.sendStatus(200);

};



export {

    createCelulares,
    editCelulares,
    deleteCelulares,
    listarCelulares,
    listarCelular

}