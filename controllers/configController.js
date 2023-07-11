import {mysqlRequest, getToken, getUsersZoho} from '../helpers/herpers.js';
import axios from "axios";

const cargarConfig = async (req, res) => {

    const queryAndParams =
    {
      query: `SELECT * FROM tbl_variables LIMIT 1`,
      params: [],
    }

    const queryAndParams2 =
    {
      query: `SELECT * FROM tbl_horas`,
      params: [],
    }

    try {

        const dataCierreBot = await mysqlRequest(queryAndParams.query);
        const dataHorario = await mysqlRequest(queryAndParams2.query);
        const dataUsersZoho = await getUsersZoho();

        res.render('asesoria', { dataCierreBot, dataHorario, users: dataUsersZoho, page: 'asesoria' })
        
    } catch (error) {

        res.status(404)
        
    }

}

export {

    cargarConfig

}