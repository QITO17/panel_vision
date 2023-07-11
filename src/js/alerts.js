const questionDelete = async () => {

    const dataSwal = await Swal.fire({
        title: '¿Desea eliminar el registro?',
        text: "Luego de eliminarlo no se podra recuperar",
        icon: 'question',
        width: '30%',
        padding: '1rem',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#00a884',
        cancelButtonColor: '#bebebe',
        confirmButtonText: 'Eliminar'
    })

    return dataSwal.isConfirmed;

};

const confirmDelete = async () => {

    Swal.fire({
        icon: 'success',
        title: 'Registro eliminado correctamente.',
    })

};

const confirmUpdate = async () => {

    Swal.fire({
        icon: 'success',
        title: 'Registro actualizado correctamente.',
    })

};

const confirmCreate = async () => {

    Swal.fire({
        icon: 'success',
        title: 'Registro creado correctamente.',
        
    })
   

};

const swalError = async () => {

    Swal.fire({
        icon: 'error',
        title: 'Error comunicate con el encargado.',
    })

};