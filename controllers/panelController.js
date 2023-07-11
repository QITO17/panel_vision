import conexion from '../config/db.config.js';
import {mysqlRequest, getToken, getUsersZoho} from '../helpers/herpers.js';
import moment from "moment";


// const controller = {

//     index: (req, res) => {
//         conexion.query('SELECT * FROM tbl_usuarios', (err, results) => {
//             unirest.post('https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.2d5ae8ce1f1463bc9e95beb8d17e9eef.3678562ea2402690b8448ad17a538fb9&client_id=1000.KFTCVDXZL31H82EEPWV0ADZIWX8PXG&client_secret=6af44d5f7cc914e876b6a308b0cd3344a63120e005&redirect_uri=https://demoya2.com&grant_type=refresh_token')
//                 .header('Accept', 'application/json')
//                 .end(function (response) {
//                     access_token = response.body.access_token;
//                     unirest.get('https://www.zohoapis.com/crm/v2/users?type=AllUsers')
//                         .header('Accept', 'application/json')
//                         .header('Authorization', 'Zoho-oauthtoken ' + access_token)
//                         .end(function (response) {
//                             let users = response.body.users;
//                             res.render('index', { results: results, users: users, page: 'index' })
//                         });
//                 })
//         })
//     },

//     mensajes: (req, res) => {
//         let usuario = req.body.usuario;
//         console.log(usuario);
//         res.render('mensajes')
//     },

//     asesoria: (req, res) => {
//         const variables = conexion.query('SELECT * FROM tbl_variables JOIN tbl_horas JOIN tbl_usuarios', (err, variable, horario, results) => {
//             unirest.post('https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.2d5ae8ce1f1463bc9e95beb8d17e9eef.3678562ea2402690b8448ad17a538fb9&client_id=1000.KFTCVDXZL31H82EEPWV0ADZIWX8PXG&client_secret=6af44d5f7cc914e876b6a308b0cd3344a63120e005&redirect_uri=https://demoya2.com&grant_type=refresh_token')
//                 .header('Accept', 'application/json')
//                 .end(function (response) {
//                     access_token = response.body.access_token;
//                     unirest.get('https://www.zohoapis.com/crm/v2/users?type=AllUsers')
//                         .header('Accept', 'application/json')
//                         .header('Authorization', 'Zoho-oauthtoken ' + access_token)
//                         .end(function (response) {
//                             let users = response.body.users;
//                             res.render('asesoria', { results: results, variable: variable, users: users, page: 'asesoria' })
//                         });
//                 })

//             /*  if (err) {
//                  console.log(err);
//              } else {
//                  let users = response.body.users;
//                  res.render('asesoria', { variable: variable, users: users, page: 'asesoria' })
//              } */
//         });
//     },

//     info: (req, res) => {
//         conexion.query('SELECT * FROM tbl_usuarios ORDER BY wpp_fecha_hora DESC', (err, results) => {
//             unirest.post('https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.2d5ae8ce1f1463bc9e95beb8d17e9eef.3678562ea2402690b8448ad17a538fb9&client_id=1000.KFTCVDXZL31H82EEPWV0ADZIWX8PXG&client_secret=6af44d5f7cc914e876b6a308b0cd3344a63120e005&redirect_uri=https://demoya2.com&grant_type=refresh_token')
//                 .header('Accept', 'application/json')
//                 .end(function (response) {
//                     access_token = response.body.access_token;
//                     unirest.get('https://www.zohoapis.com/crm/v2/users?type=AllUsers')
//                         .header('Accept', 'application/json')
//                         .header('Authorization', 'Zoho-oauthtoken ' + access_token)
//                         .end(function (response) {
//                             let users = response.body.users;
//                             res.render('info', { results: results, users: users, page: 'info' })
//                         });
//                 })
//             /* if (err) {
//                 console.log(err);
//             } else {
//                 res.render('info', { results: results, page: 'info' })
//             } */
//         })
//     }

// }

/**
 * Trae las lineas para listarlas en el select
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const listarLineas = async (req, res) => {

    const ruta = (req !== undefined) ? req.params.ruta : 0;

    const queryAndParams =
    {
      query: `SELECT * FROM tbl_celulares`,
      params: [],
    }

    try {

        const dataLineas = await mysqlRequest(queryAndParams.query);

        if (ruta > 0) {
            res.json(dataLineas)
        }

        return {
            ok:true,
            lineas: dataLineas
        }
        
    } catch (error) {

        return {
            ok: false,
            error
        }
        
    }

}

const getChats = async (idLinea) => {


    const queryAndParams =
    {
      query: `SELECT ch.id_chat, c.wpp_nombre, c.wpp_numero, m.wpp_mensajes, m.wpp_fecha, m.whpp_type
      FROM tbl_chats ch
      JOIN tbl_clientes c ON c.wpp_id_cliente = ch.id_cliente_fk
      JOIN tbl_mensajes m ON m.whpp_id_chat = ch.id_chat
      WHERE ch.id_celular_fk = ?
      AND m.wpp_clave_int = (SELECT MAX(wpp_clave_int) 
                             FROM tbl_mensajes 
                             WHERE whpp_id_chat = m.whpp_id_chat)
      ORDER BY m.wpp_fecha DESC`,
      params: [idLinea]
    }

    try {

        const dataChats = await mysqlRequest(queryAndParams.query,queryAndParams.params);

        // console.log(dataChats)

        return {
            ok:true,
            chats: dataChats
        }

    }catch(error) {

        return {
            ok:false,
            error
        }

    }




}


const changeChat = async (req, res) => {

    const {idLinea} = req.params;
   
    const queryAndParams =
    {
      query: `SELECT ch.id_chat, c.wpp_nombre, c.wpp_numero, m.wpp_mensajes, m.wpp_fecha, m.whpp_type
      FROM tbl_chats ch
      JOIN tbl_clientes c ON c.wpp_id_cliente = ch.id_cliente_fk
      JOIN tbl_mensajes m ON m.whpp_id_chat = ch.id_chat
      WHERE ch.id_celular_fk = ?
      AND m.wpp_clave_int = (SELECT MAX(wpp_clave_int) 
                             FROM tbl_mensajes 
                             WHERE whpp_id_chat = m.whpp_id_chat)
      ORDER BY m.wpp_fecha DESC`,
      params: [idLinea]
    }

    try {

        const dataChats = await mysqlRequest(queryAndParams.query,queryAndParams.params);

        dataChats.forEach(obj => {
            const fecha = moment(obj.wpp_fecha);
            obj.wpp_fecha = fecha.format('DD-MM-YYYY');
            obj.wpp_hora = fecha.format('HH:mm');
            
        });

        res.json(dataChats)

    }catch(error) {

        return {
            ok:false,
            error
        }

    }

}

const cargarPanel = async (req, res) => {

    const dataLineas = await listarLineas();

    if (dataLineas.ok) {
        
        const {lineas} = dataLineas;

        const idLinea = lineas[0].id_celular;
    
        const dataChats = await getChats(idLinea);

        if (dataChats.ok && dataChats.chats.length > 0) {

            const {chats} = dataChats;

            chats.forEach(obj => {
                const fecha = moment(obj.wpp_fecha);
                obj.wpp_fecha = fecha.format('DD-MM-YYYY');
                obj.wpp_hora = fecha.format('HH:mm');
                
            });
              

            const dataUsersZoho = await getUsersZoho();


            res.render('../src/views/index', { results: chats, users: dataUsersZoho, page: 'index' })


            
        }   

    }else{
        res.status(400);
    }

    




}

const getMessages = async (idChat) => {

    const queryAndParams =
    {
      query: `SELECT ch.id_chat, c.wpp_id_cliente, c.wpp_nombre, c.wpp_numero, m.wpp_mensajes, m.wpp_fecha, m.whpp_type, m.wpp_id_asesor, m.whpp_name_file
      FROM tbl_chats ch
      JOIN tbl_mensajes m ON ch.id_chat = m.whpp_id_chat
      JOIN tbl_clientes c ON ch.id_cliente_fk = c.wpp_id_cliente
      WHERE ch.id_chat = ?`,
      params: [idChat]
    }

    try {

        const dataMessages = await mysqlRequest(queryAndParams.query,queryAndParams.params);

        return {
            ok:true,
            Messages: dataMessages
        }

    }catch(error) {

        return {
            ok:false,
            error
        }

    }

}

const cargarMensajes = async (req, res) => {

    console.log("======== aro ===========")

    const {idChat} = req.params;

    const dataMessages = await getMessages(idChat);

    if (dataMessages.ok) {

        let {Messages} = dataMessages;

        const emojiRegex = /&#(\d+);/g;

        Messages.forEach(obj => {
            const fecha = moment(obj.wpp_fecha);
            const mensaje = obj.wpp_mensajes;
            obj.wpp_fecha = fecha.format('DD-MM-YYYY');
            obj.wpp_hora = fecha.format('HH:mm'); 
            obj.wpp_mensajes = mensaje.replace(emojiRegex, (match, p1) => String.fromCodePoint(p1));
            obj.wpp_mensajes = obj.wpp_mensajes.replace(/^\n+|\n+$/g, '');

        });

        res.render('../src/views/mensajes', { Messages })
        
    }

}

export {

    listarLineas,
    cargarPanel,
    cargarMensajes,
    changeChat

}