let data = JSON.stringify({});
let respuesta = '';


async function obtenerTemplates() {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://zjj9v6.api.infobip.com/whatsapp/2/senders/573232326930/templates',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Basic TUFHSU5FLkNYOmdDUEouOUhyNDNZaiN2Rw=='
      },
      data: data
    };

    const response = await axios.request(config);
    respuesta  =  await response.data.templates;
    // window.ress = respuesta
  } catch (error) {
    console.log(error);
  }

  return respuesta
}

// ---------------------- CREATE TEMPLATES ----------------------------- // 


async function crearTemplate() {

     const name = document.getElementById("nombrePlantilla").value;
     const nombre = name.toLowerCase()
     const nameTemplate = nombre.replace(/\s+/g, '_');
     const select = document.getElementById("tipoCategoria");
     const category = select.value;
     const Selectlanguage = document.getElementById("language");
     const language = Selectlanguage.value;
     const text = document.getElementById('miTextarea').value


  console.log('first')
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://zjj9v6.api.infobip.com/whatsapp/2/senders/573232326930/templates',
      headers: { 
        // 'Content-Type': 'application/json', 
        'Authorization': 'Basic TUFHSU5FLkNYOmdDUEouOUhyNDNZaiN2Rw=='
      },
      data: {
        name:nameTemplate,
        language,
        category,
        structure: {
        header: null,
        body: {
        text,
                },
        footer: null
          }
        }
    };

    const response = await axios.request(config);
    Swal.fire(
      'Plantilla Creada Exitosamente!',
      'You clicked the button!',
      'success'
    ).then(res => {
      if(res.isConfirmed){
        window.location.reload()
      }
    })
    return (response.data); // Retorna los datos de respuesta si es necesario
  } catch (error) {
    console.log(error);
    // Manejar el error adecuadamente, puedes lanzar una excepción o realizar alguna otra acción
  }
}


async function eliminarTemplate(name) {

  
  const eleccion = Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      return true
    } else if (result.isDenied) {
      return false
    }
  })

  const ele = eleccion()

  if(eleccion){
    const nombre = name.id

    try {
      const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `https://zjj9v6.api.infobip.com/whatsapp/2/senders/573232326930/templates/${nombre}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Basic TUFHSU5FLkNYOmdDUEouOUhyNDNZaiN2Rw=='
        },
        data: data
      };

      const response = await axios.request(config);
      Swal.fire(
        'Plantilla Eliminada Exitosamente!',
        'You clicked the button!',
        'success'
      ).then(res => {
        if(res.isConfirmed){
          window.location.reload()
        }
      })
    } catch (error) {
      console.log(error);
    }
  }else{
    Swal.fire('Eliminación Cancelada', '', 'info')    
  }
  
}
