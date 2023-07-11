import mysqlConnection, {TOKEN_ZOHO} from "../config/db.config.js";
import axios from "axios";

/**
 * Funcion encargada de hacer las peticiones a la base de datos
 * @param {*} query
 * @param {*} params
 * @returns
 */
export const mysqlRequest = async (query, params = []) => {
  const queryStructure = {
    query,
    params,
  };
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      queryStructure.query,
      queryStructure.params,
      (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

export const createToken = async () => {

  setInterval( async () => {

    var config = {
      method: "post",
      url: TOKEN_ZOHO
    };
  
    let Token = await axios(config);
    const {access_token} = Token.data;

    console.log("...............");
    console.log(access_token)

    const queryAndParams =
    {
      query: `UPDATE tbl_token SET token_zoho = ? WHERE id_token = 1`,
      params: [access_token],
    }
    
    try {

      await mysqlRequest(queryAndParams.query, queryAndParams.params);

      console.log("actualice el token")
      
    } catch (error) {

      console.log(error);
      
    }
    
  }, 3480000
  );

  // cada 58 minutos = 3480000 
  // cada 1 minutos = 600000
  // cada 1 minutos = 10000

}

/**
 * 
 * @returns 
 */
export const getToken = async () => {

  const queryAndParams =
  {
    query: `SELECT * FROM tbl_token LIMIT 1`
  }
  
  try {

    const tokenZoho = (await mysqlRequest(queryAndParams.query))[0].token_zoho;

    return tokenZoho;
    
  } catch (error) {

    console.log(error);
    
  }
  

};


/**
 * 
 * @returns 
 */
export const getUsersZoho = async () => {

  const tokenZoho = await getToken();

  var config = {
      method: 'get',
      url: 'https://www.zohoapis.com/crm/v2/users?type=AllUsers',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Zoho-oauthtoken ' + tokenZoho
      }
  };

  
  const arrayUsers = (await axios(config)).data.users;

  return arrayUsers;


}



// const headers = new Headers({ "Content-Type": "application/json" });

// let requestOptions = {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify({ NumeroTelefonoZoho })
// };
