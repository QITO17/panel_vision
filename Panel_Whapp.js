// ************ Require's ************
import path from 'path';
import express from 'express';
import http from 'http';
import { fileURLToPath } from 'url';
import cors from 'cors';
// import dbConn from './config/db.config.js';
import { Server as WebSocketServer } from "socket.io";
import moment from 'moment';
// import { Request } from 'express';
// import dbConn, {WHPP_KEY} from './config/db.config.js'
import routerApi from './routes/index.js';
import { createToken } from './helpers/herpers.js'




const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server);
const port = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

var nombre_imagen = "";
var controladorsoke = "";

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

routerApi(app)

createToken()

server.listen(port, () => console.log(`Server running on port ${port}`));

// ------------------- Variables de Meta -------------------
var url_api = 'https://graph.facebook.com/v14.0/100332239564462/messages';
var whpp_key = 'Bearer EAALcs8ukVs0BAOZC4TWfTnKJodPE0zlgHcIc2WFwBYBtZAXAAHZC0ZBQR2ZCeOLnHvJ1mW2wxbS081UmIflChIwVZC3gvwnWMZBZA6aZBKOscCEw4wRNhLXbYRXXOU0M1WooHLsQulZBXcIqF9Q10XVjDSWO3g3wBZBVGzuapjtMEc7e677cpBDzs4b';

app.use(express.static(path.join(__dirname, 'src')));


/*
unirest.post('https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.2d5ae8ce1f1463bc9e95beb8d17e9eef.3678562ea2402690b8448ad17a538fb9&client_id=1000.KFTCVDXZL31H82EEPWV0ADZIWX8PXG&client_secret=6af44d5f7cc914e876b6a308b0cd3344a63120e005&redirect_uri=https://demoya2.com&grant_type=refresh_token')
    .header('Accept', 'application/json')
    .end(function (response) {

        access_token = response.body.access_token;

        io.on('connection', (socket) => {

            console.log("hola si hago conexion |");

            socket.on("message", (data) => {

                var fechHO2 = moment().format('YYYY-MM-DD HH:mm:ss');
                //fechHO2 = fechHO2+"+05:00"
                var momento2 = moment(fechHO2);
                var fechaYHora = momento2.format('YYYY-MM-DD HH:mm:ss');

                console.log("fecha moment: -> " + fechaYHora);

                io.sockets.emit('message', data);

                let msj = data.send_Message;
                let numero = data.numclien;
                let num_cel = '+' + numero;
                var nombre_asesor = data.nombre_asesor;

                console.log("====== + =======");
                console.log(nombre_asesor);

                console.log(msj, numero);


                var options = {
        
                    'method': 'POST',
                    'url': url_api,
                    'headers': {
                        'Authorization': whpp_key,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "messaging_product": "whatsapp",
                        "recipient_type": "individual",
                        "to": numero,
                        "type": "text",
                        "text": {
                        "preview_url": false,
                        "body": msj
                        }
                    })
            
                };
                request(options, function (error, response) {
                    if (error) throw new Error(error);
                    
                    var data_msj_env = JSON.parse(response.body)
                    console.log(fechaYHora)
                    var id_mensaje_env = data_msj_env.messages[0].id
                    console.log("id msj ---> " + id_mensaje_env);
            
                    
                    dbConn.query("INSERT INTO tbl_WhatsApp (wpp_respuesta, wpp_numero, wpp_asesor,wpp_fecha,wpp_plantilla1,wpp_id_mensaje) values('" + msj + "', '" + numero + "', '1', '" + fechaYHora + "','1','" + id_mensaje_env + "')");

                });

                console.log("vamos vamos")

                dbConn.query("SELECT * FROM tbl_usuarios WHERE wpp_numero = '" + numero + "' and wpp_reinicio >= 1 LIMIT 1 ", function (err, res) {

                    console.log("*****************")
                    console.log(res.length)

                    if (res.length > 0) {

                        function diff_minutes(fechaYHora, fecha_msm) {

                            console.log("fecha de ya: " + fechaYHora)
                            console.log("fecha de msj usuario: " + fecha_msm )
                            
                            const fecha_base_datos2 = moment(fecha_msm, 'YYYY-MM-DD hh:mm:ss'); 
                            const fechaYHora2 = moment(fechaYHora, 'YYYY-MM-DD hh:mm:ss'); 
                            const differenceInMinutes = moment(fechaYHora2).diff(fecha_base_datos2, 'minutes');
    
                            console.log("Pasaron: -> ", differenceInMinutes ," minutes")
                            return differenceInMinutes;
    
                        }
    
                        var fecha_msm = res[0].wpp_fecha_hora;
                        fecha_msm = moment(fecha_msm).format('YYYY-MM-DD HH:mm:ss');

                        var diferencia_min = diff_minutes(fechaYHora, fecha_msm);


                        diferencia_min = (diferencia_min + " min");
                        console.log(diferencia_min);

                        dbConn.query("UPDATE tbl_usuarios SET tiempo_wpp = '" + diferencia_min + "' ,wpp_ascesor = '" + nombre_asesor + "', wpp_estado = 'Atendido' , wpp_reinicio = 0 WHERE wpp_numero = '" + numero + "'", function (err, res) {
                            if (res.length > 0) {
                                console.log("Lo hiceeeeeee")
                            } else {
                                console.log("nooooooo ya existo")
                            }
        
                        });
                        

                    }else{

                        console.log("solo actualice el atendidoo")

                        dbConn.query("UPDATE tbl_usuarios SET wpp_estado = 'Atendido',wpp_ascesor = '" + nombre_asesor + "' , wpp_reinicio = 0 WHERE wpp_numero = '" + numero + "'", function (err, res) {
                            if (res.length > 0) {
                                console.log("Lo hiceeeeeee")
                            } else {
                                console.log("nooooooo ya existo")
                            }
        
                        });

                    }

                });

                
                console.log("---------->", num_cel)
                let param = encodeURIComponent(num_cel);
                unirest.get('https://www.zohoapis.com/crm/v2/Leads/search?criteria=((Mobile:equals:' + param + '))')
                .header('Accept', 'application/json')
                .header('Authorization', 'Zoho-oauthtoken ' + access_token)
                .end(function (response) {

                    //console.log(response)

                    console.log("vamos pssssssssss")

                    dbConn.query("SELECT * FROM tbl_usuarios WHERE wpp_numero = '" + numero + "' ", function (err, res) {

                        console.log("mesnaje zoho", msj)

                        unirest.post('https://www.zohoapis.com/crm/v2/mensajes_wpp')
                        .header('Accept', 'application/json')
                        .header('Authorization', 'Zoho-oauthtoken ' + access_token)
                        .send('{"data": [{"mensaje":"' + msj + '","numero_cliente":"' + num_cel + '","responde":true,"Posible_Cliente":"' + res[0].wpp_zoho_id + '","fecha_hora_wpp":"' + fechaYHora + '"}]}')
                        .end(function (response) {
                            //console.log(response);
                        });

                    });
                });
                

            });

        });
    });

*/
    






// ************ exports app ************
