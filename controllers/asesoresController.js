import { mysqlRequest } from '../helpers/herpers.js';



const createAsesores = async (req, res) => {

    const {nombreAsesor, idZohoAsesor, estadoAsesor} = req.body;

    const queryAndParams =
    {
      query: `INSERT INTO tbl_asesores (nombre_asesor,id_zoho,estado_asesor) VALUES (?,?,?)`,
      params: [nombreAsesor, idZohoAsesor, estadoAsesor],
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

const editAsesores = async (req, res) => {

    const {nombreAsesor, idZohoAsesor, estadoAsesor, idAsesor} = req.body;

    const queryAndParams =
    {
      query: `UPDATE tbl_asesores SET nombre_asesor = ?, id_zoho = ?, estado_asesor = ? WHERE id_asesor = ?`,
      params: [nombreAsesor, idZohoAsesor, estadoAsesor, idAsesor],
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

const deleteAsesores = async (req, res) => {

    const {idAsesor} = req.body;

    const queryAndParams =
    {
      query: `DELETE FROM tbl_asesores WHERE id_asesor = ?`,
      params: [idAsesor],
    }

    try {

        const deleteAsesor = await mysqlRequest(queryAndParams.query, queryAndParams.params);

        console.log("******************");
        // console.log(idAsesor);
        console.log(deleteAsesor);

        res.json({
            ok: true,
            data: deleteAsesor
        });

        
        
    } catch (error) {

        console.log(error)

        res.json({
            ok:false,
            error: error
        })
        
    }

};

const listarAsesores = async (req, res) => {

    const queryAndParams =
    {
      query: `select * FROM tbl_asesores ORDER BY id_asesor DESC`
    }

    try {

        const dataAsesores = await mysqlRequest(queryAndParams.query);

        res.json(dataAsesores);

        
        
    } catch (error) {

        console.log(error)

        res.status(400)
        
    }

};

const listarAsesor = async (req, res) => {

    const {users} = req.body;

    // const queryAndParams =
    // {
    //   query: `INSERT INTO tbl_asesores (nombre_asesor,id_zoho,estado_asesor) VALUES (?, ?, ?)`,
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

    createAsesores,
    editAsesores,
    deleteAsesores,
    listarAsesores,
    listarAsesor

}