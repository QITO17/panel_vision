// import { questionDelete, confirmDelete, confirmUpdate, confirmCreate } from './alerts.js'





// import obtenerTemplates from '../js/dataTemplate'
const $tableAsesor = $("#tableAsesores");
const $tableHorarios = $("#tableHorarios");
const $tableLineas = $("#tableLineas");
const $tablePlantillas = $("#tablePlantillas");



/** Estado de activo o inactivo */
function estadosRow(value, row, index) {
  let colorCircle;

  if (
    row.estadoAse > 0 || 
    // row.estadoHorari > 0 || 
    // row.estadoCelular > 0 || 
    row.estadoTemplate  === "APPROVED" ||
     row.estadoLinea > 0
    ) {
    colorCircle = "success";
  } else if(
    row.estadoAse > 0 || 
    row.estadoTemplate  === "PENDING" ||
    row.estadoLinea > 0) {
    colorCircle = "warning";
  }else{
    colorCircle ="danger";
  }

  return `<i class="fas fa-circle text-${colorCircle}"></i>`;
}

/** ------------ ASESORES ----------------- */

/** Listar Asesores */
(async () => {
  let dataAsesores = await fetch("/config/asesores");
  dataAsesores = JSON.parse(await dataAsesores.text());

  const arrayAsesores = dataAsesores.map((objeto) => {
    return {
      id_asesor: objeto.id_asesor,
      nameAse: objeto.nombre_asesor,
      IdZohoAse: objeto.id_zoho,
      estadoAse: objeto.estado_asesor,
    };
  });

  $tableAsesor.bootstrapTable({
    data: arrayAsesores,
  });
})();

/** Acciones editar y eliminar el asesor */
function accionesAsesor(value, row, index) {
  return `
    <a style="color:#00a884;" class="editAsesor" href="javascript:void(0)" title="editAsesor" data-toggle="modal" data-target="#nuevo">
    <i class="bi bi-pencil-square"></i>
    </a>
    &nbsp;&nbsp;&nbsp;
    <a style="color:#00a884;" class="deleteAsesor" href="javascript:void(0)" title="deleteAsesor">
    <i class="bi bi-trash3"></i>
    </a>`;
}

/** ------------ HORARIOS ----------------- */

/** Listar Horarios */
(async () => {
  let dataHorarios = await fetch("/config/horarios");
  dataHorarios = JSON.parse(await dataHorarios.text());

  const arrayHorarios = dataHorarios.map((objeto) => {
    return {
      idHorari: objeto.id_horas,
      estadoHorari: objeto.wpp_estado,
      diaHorari: objeto.dia,
      inicioHorari: objeto.wpp_inicio,
      finHorari: objeto.wpp_fin,
      descansoIniHorari: objeto.wpp_hora_descanso_inicio,
      descandofinHorari: objeto.wpp_hora_descanso_fin,
    };
  });

  $tableHorarios.bootstrapTable({
    data: arrayHorarios,
  });
})();

/** Acciones editar y eliminar el asesor */
function accionesHorario(value, row, index) {
  return `
      <a style="color:#00a884;" class="editHorario" href="javascript:void(0)" title="editHorario" data-toggle="modal" data-target="#editarTabla">
      <i class="bi bi-pencil-square"></i>
      </a>`;
}


/** ------------ CelularS ----------------- */

/** Listar Celulars */
$("#Lineas-tab").click(async () => {
  if ($tableLineas.bootstrapTable("getData").length <= 1) {
    console.log("arooo");

    let dataLineas = await fetch("/config/lineas");
    dataLineas = JSON.parse(await dataLineas.text());
    console.log(dataLineas);

    const arrayLineas = dataLineas.map((objeto) => {
      return {
        idCelular: objeto.id_celular,
        estadoLinea: objeto.estado_celular,
        nameLinea: objeto.nombre_celular,
        numeroLinea: objeto.numero_celular,
        idLinea: objeto.id_numero_celular,
      };
    });

    $tableLineas.bootstrapTable({
      data: arrayLineas,
    });




  } else {
    console.log("tabla llena");
  }


  




});

/** Acciones editar y eliminar el asesor */
function accionesLinea(value, row, index) {
  return `
      <a style="color:#00a884;" class="editCelular" href="javascript:void(0)" title="editCelular" data-toggle="modal" data-target="#celular">
      <i class="bi bi-pencil-square" ></i>
      </a>
      &nbsp;&nbsp;&nbsp;
      <a style="color:#00a884;" class="deleteCelular" href="javascript:void(0)" title="deleteCelular">
      <i class="bi bi-trash3"></i>
      </a>`;
}


/** ------------ PLANTILLAS ----------------- */

/** Listar templates */
$("#plantillas-tab").click(async () => {
  if ($tablePlantillas.bootstrapTable("getData").length <= 1) {
    console.log("arooo");

    let dataTemplates = await fetch("/config/template");
    dataTemplates = JSON.parse(await dataTemplates.text());
    console.log(dataTemplates);
    const plantillas = await obtenerTemplates()
    console.log(plantillas)

    const arrayTemplate = plantillas.map((plantilla) => {
      return {
        idTemplate: plantilla.id,
        estadoTemplate: plantilla.status,
        nameTemplate: plantilla.name,
        textTemplate: plantilla.structure.body.text,
        tipoTemplate: plantilla.category,
        

      };
    });

    $tablePlantillas.bootstrapTable({
      data: arrayTemplate,
    });

    window.showPages(window.currentPage2)


  } else {
    console.log("tabla llena");
  }
});

/**  */
  function accionesPlantilla(value, row, index) {
    return row.textTemplate;
  }

  

  function trash(value, row, index) {
    return `<span onclick="eliminarTemplate(${row.nameTemplate})" id=${row.nameTemplate} class="item_delete" ><i class='bx bx-trash'></i></span>`
  }

  //! CATEGORIA USUARIO PLANTILLA

function categoriaUsuario (value, row, index){
  // return '<select> <option value="A">A</option> <option value="B">B</option> <option value="C">C</option> </select>'
}

/**  */


function tipoTemplate(value, row, index) {

  let type = "approved";
  
  switch (row.tipoTemplate) {

    case "MARKETING":

      type = "MARKETING";
      
    break;

    case "UTILITY":

      type = "UTILITY";
      
    break;

    case "Authentication"
    :

      type = "authentication";
      
    break;

  }

  return `${type}`;
}




/** ------------- Funciones de editar y eliminar Asesores, Celulars y Plantillas ------------- */

window.operateEvents = {

  /** ---- ASESORES ----- */
  "click .editAsesor": async (e, value, row, index) => {

    console.log(row);

    $("#titleAsesores").text("Editar usuario")
    $("#btnAsesor").text("Editar")
    $("#btnAsesor").val("Editar")
    $("#aseNombre").val(row.nameAse)
    $("#aseIdZoho").val(row.IdZohoAse)
    $("#aseEstado").selectpicker('val', row.estadoAse);

    $("#btnAsesor").off("click").click(async () => {

      console.log("Editar");

      const nombreAsesor = $("#aseNombre").val();
      const idZohoAsesor = $("#aseIdZoho").val();
      const estadoAsesor = $("#aseEstado").val();
      const idAsesor = row.id_asesor;

      // console.log(nombreAsesor);
      // console.log(idZohoAsesor);
      // console.log(estadoAsesor);

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombreAsesor,
          idZohoAsesor,
          estadoAsesor,
          idAsesor
        })
      };
      
      let dataDelete = await fetch("/config/asesores", requestOptions);
      dataDelete = JSON.parse(await dataDelete.text());
      console.log(dataDelete);

      if (dataDelete.ok) {



        confirmUpdate()
        $('#nuevo').modal('hide')
        
        const newData = {
          nameAse: nombreAsesor,
          IdZohoAse: idZohoAsesor,
          estadoAse: estadoAsesor,
        };
  
        const index = $tableAsesor.bootstrapTable('getData').findIndex(row => row.id_asesor === idAsesor);
  
        $tableAsesor.bootstrapTable('updateRow', {index: index, row: newData});

      }else{

        swalError()
        

      }



    });

  },
  "click .deleteAsesor": async function (e, value, row, index) {

    const swalDelete = await questionDelete();

    if (swalDelete) {

      const idAsesor = row.id_asesor;

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idAsesor
        })
      };
      
      let dataDelete = await fetch("/config/asesores", requestOptions);
      dataDelete = JSON.parse(await dataDelete.text());
      console.log(dataDelete);

      if (dataDelete.ok) {

        confirmDelete()
        
        $tableAsesor.bootstrapTable("remove", {
          field: "id_asesor",
          values: [idAsesor],
        });

      }

    }

  },

  /** ---- HORARIO ----- */

  "click .editHorario": async (e, value, row, index) => {

    console.log(row);



    
  },

  /** ---- CelularS ----- */

  "click .editCelular": async (e, value, row, index) => {
    
    console.log(row);

    $("#titlecelulares").text("Editar usuario")
    $("#btnCelular").text("Editar")
    $("#btnCelular").val("Editar")
    $("#nameCel").val(row.nameLinea)
    $("#idNumCel").val(row.idLinea)
    $("#numCel").val(row.numeroLinea)
    $("#estadoCel").selectpicker('val', row.estadoLinea)


    $("#btnCelular").off("click").click(async () => {

      console.log("Editar");

      const nombreCelular = $("#nameCel").val();
      const idNumeroCelular = $("#idNumCel").val();
      const estadoCelular = $("#estadoCel").val();
      const numeroCelular = $("#numCel").val();
      const {idCelular} = row;

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombreCelular,
          idNumeroCelular,
          estadoCelular,
          numeroCelular,
          idCelular
  
        })
      };
      
      let dataDelete = await fetch("/config/lineas", requestOptions);
      dataDelete = JSON.parse(await dataDelete.text());
      console.log(dataDelete);

      if (dataDelete.ok) {



        confirmUpdate()
        // $('#nuevo').modal('hide')
        
        const newData = {
          idCelular,
          nameLinea: nombreCelular,
          idLinea: idNumeroCelular,
          estadoLinea: estadoCelular,
          numeroLinea: numeroCelular
        };
  
        const index = $tableLineas.bootstrapTable('getData').findIndex(row => row.idCelular === idCelular);
  
        $tableLineas.bootstrapTable('updateRow', {index: index, row: newData});

      }else{

        swalError()
        

      }



    });
  },
  "click .deleteCelular": async function (e, value, row, index) {

    console.log(row);

    const swalDelete = await questionDelete();

    if (swalDelete) {

      const {idCelular} = row;

      console.log(idCelular);

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idCelular
        })
      };
      
      let dataDelete = await fetch("/config/lineas", requestOptions);
      dataDelete = JSON.parse(await dataDelete.text());
      console.log(dataDelete);

      if (dataDelete.ok) {

        confirmDelete()
        
        $tableLineas.bootstrapTable("remove", {
          field: "idCelular",
          values: [idCelular],
        });

      }

    }



  },

  /** ---- DELETE ----- */

  "click .editPlantilla": async (e, value, row, index) => {
    console.log(row);
  },
  "click .deletePlantilla": function (e, value, row, index) {
    $tableAsesor.bootstrapTable("remove", {
      field: "IdZohoAse",
      values: [row.IdZohoAse],
    });
  },


};



/** ------------- Funcione de crear asesor ------------- */
$("#btnNuevoAsesor").click(async () => {

  $("#titleAsesores").text("Crear asesor")
  $("#btnAsesor").text("Crear")
  $("#btnAsesor").val("Crear")
  $("#aseNombre").val("")
  $("#aseIdZoho").val("")
  $("#aseEstado").selectpicker('val', 1)

  $("#btnAsesor").off("click").click(async () => {

    console.log("Crear");

    const nombreAsesor = $("#aseNombre").val();
    const idZohoAsesor = $("#aseIdZoho").val();
    const estadoAsesor = $("#aseEstado").val();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombreAsesor,
        idZohoAsesor,
        estadoAsesor
      })
    };
    
    let dataInsert = await fetch("/config/asesores", requestOptions);
    dataInsert = JSON.parse(await dataInsert.text());
    console.log(dataInsert);

    if (dataInsert.ok) {

      confirmCreate()
      $('#nuevo').modal('hide')
      
      const newData = {
        id_asesor: dataInsert.data.insertId,
        nameAse: nombreAsesor,
        IdZohoAse: idZohoAsesor,
        estadoAse: estadoAsesor,
      };

      $tableAsesor.bootstrapTable('insertRow', {index: 0, row: newData});

    }else{

      swalError()
      

    }

  })

})
/** ------------- Funcione de crear celular ------------- */
$("#btnNuevoCelular").click(async () => {

  console.log("Aroo");

  $("#titlecelulares").text("Agregar celular")
  $("#btnCelular").text("Crear")
  $("#btnCelular").val("Crear")
  $("#nameCel").val("")
  $("#idNumCel").val("")
  $("#numCel").val("")
  $("#estadoCel").selectpicker('val', 1)

  $("#btnCelular").off("click").click(async () => {

    console.log("Crear");

    const nombreCelular = $("#nameCel").val();
    const idNumeroCelular = $("#idNumCel").val();
    const estadoCelular = $("#estadoCel").val();
    const numeroCelular = $("#numCel").val();
   
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombreCelular,
        idNumeroCelular,
        estadoCelular,
        numeroCelular

      })
    };
    
    let dataInsert = await fetch("/config/lineas", requestOptions);
    dataInsert = JSON.parse(await dataInsert.text());
    console.log(dataInsert);

    if (dataInsert.ok) {

      confirmCreate()
      
      // $('#nuevo').modal('hide')
      
      const newData = {
        idCelular: dataInsert.data.insertId,
        nameLinea: nombreCelular,
        idLinea: idNumeroCelular,
        estadoLinea: estadoCelular,
        numeroLinea: numeroCelular
      };

      $tableLineas.bootstrapTable('insertRow', {index: 0, row: newData});


    }else{

      swalError()
      

    }

  })

})