import { mysqlRequest } from '../helpers/herpers.js';

const createHorarios = async (req, res) => {

    const {users} = req.body;

    // const queryAndParams =
    // {
    //   query: `INSERT INTO tbl_Horarios (nombre_asesor,id_zoho,estado_asesor) VALUES (?, ?, ?)`,
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

const editHorarios = async (req, res) => {

    const {users} = req.body;

    // const queryAndParams =
    // {
    //   query: `INSERT INTO tbl_Horarios (nombre_asesor,id_zoho,estado_asesor) VALUES (?, ?, ?)`,
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

const deleteHorarios = async (req, res) => {

    const {users} = req.body;

    // const queryAndParams =
    // {
    //   query: `INSERT INTO tbl_Horarios (nombre_asesor,id_zoho,estado_asesor) VALUES (?, ?, ?)`,
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

const listarHorarios = async (req, res) => {

    const queryAndParams =
    {
      query: `select * FROM tbl_horas`
    }

    try {

        const dataHorarios = await mysqlRequest(queryAndParams.query);

        res.json(dataHorarios);

        
        
    } catch (error) {

        console.log(error)

        res.status(400)
        
    }

};

const listarHorario = async (req, res) => {

    const {users} = req.body;

    // const queryAndParams =
    // {
    //   query: `INSERT INTO tbl_Horarios (nombre_asesor,id_zoho,estado_asesor) VALUES (?, ?, ?)`,
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

    createHorarios,
    editHorarios,
    deleteHorarios,
    listarHorarios,
    listarHorario

}