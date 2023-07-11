import {mysqlRequest, getToken, getUsersZoho} from '../helpers/herpers.js';
import axios from "axios";


const listarTabla = async (req, res) => {

    const queryAndParams =
    {
      query: `SELECT * FROM tbl_clientes ORDER BY wpp_fecha_hora_creacion DESC`,
      params: [],
    }

    try {

        const dataClientes = await mysqlRequest(queryAndParams.query);
        const dataUsersZoho = await getUsersZoho();

        res.render('info.ejs', { clientes: dataClientes, users: dataUsersZoho, page: 'info' })
        
    } catch (error) {

        res.status(404)
        
    }

}



export {

    listarTabla
}