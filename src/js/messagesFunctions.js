// // Declaración de elementos del DOM
// const activar = document.getElementById("microphone");
// const desactiva = document.getElementById("pause");
// const duracion = document.getElementById("duracion");
// const input = document.getElementById('input');
// const send = document.getElementById('send');
// const btnadjuntar = document.getElementById("btnadjuntar");
// const adjuntar = document.getElementById("adjuntar");
// const enviarArchivo = document.getElementById("enviarArchivo");
// const btnEnviar = document.getElementById('btnEnviar');
// const startBtn = document.getElementById('microphone');
// const stopBtn = document.getElementById('pause');

// const tarjeta = document.querySelector(".card");
// const archivos = document.querySelector('#files');
// const audio = document.querySelector('#audio');
// //const startBtn = document.querySelector('#microphone');
// //const stopBtn = document.querySelector('#pause');
// const enviar = document.querySelector('#send');
// const fileInput = document.querySelector('#adjuntar');

// // Declaración de elementos globales
// let tiempoTranscurrido = 0;
// let temporizador;
// let recorder, stream, chunks = [];

// function checkFileSelected(inputElement) {
//     return new Promise((resolve, reject) => {
//         if (inputElement.files && inputElement.files.length > 0) {
//             resolve(inputElement.files[0]);
//         } else {
//             reject(new Error('No se ha seleccionado ningún archivo'));
//         }
//     });
// }

// btnadjuntar.addEventListener('click', function(){
//     adjuntar.click();
//     archivos.classList.remove("d-none");
//     checkFileSelected(fileInput)
//      .then(file => {
//         console.log(`Se seleccionó el archivo "${file.name}"`);

//      })
//      .catch(error => {
//         console.error(error.message);
//      });
// });

// btnEnviar.addEventListener("click", function() {
//     enviarArchivo.click();
//     archivos.classList.add("d-none");
//  });

// checkFileSelected(fileInput)
//  .then(file => {
//     console.log(`Se seleccionó el archivo "${file.name}"`);
//  })

//  .catch(error => {
//     console.error(error.message);
//  });

// /* Cambiar el microfono al escribir */
// input.addEventListener('input', () => {
//     const inputValue = input.value;
//     if (inputValue != '') {
//         document.getElementById('enviar').style.display = "block";
//         document.getElementById('microphone').style.display = "none";
        
//     } else {
//         document.getElementById('microphone').style.display = "block";
//         document.getElementById('enviar').style.display = "none";
//     }
// });


// function startTime() {
//     temporizador = setInterval(actualizarTiempo, 1000);
    
// }

// function stopTime() {
//     tiempoTranscurrido = 0;
//     clearInterval(temporizador);
// }

// /* Activar y desactivar */
// activar.addEventListener("click", function() {
//     tarjeta.classList.remove("d-none");
//     //document.getElementById("microphone").addEventListener("click", startTimer);
// });

// desactiva.addEventListener("click", function() {
//     tarjeta.classList.add("d-none");
//     //document.getElementById("pause").addEventListener("click", startTimer); 
// });

// send.addEventListener("click", function(){
//     enviarArchivo.click();
//     tarjeta.classList.add("d-none");
// });

// const segundosATiempo = numeroDeSegundos => {
//     let horas = Math.floor(numeroDeSegundos / 60 / 60);
//     numeroDeSegundos -= horas * 60 * 60;
//     let minutos = Math.floor(numeroDeSegundos / 60);
//     numeroDeSegundos -= minutos * 60;
//     numeroDeSegundos = parseInt(numeroDeSegundos);

//     if (horas < 10) {
//         horas ="0" + horas;
//     }

//     if (minutos < 10) {
//         minutos = "0" + minutos;
//     }

//     if (numeroDeSegundos < 10) {
//         numeroDeSegundos = "0" + numeroDeSegundos;
//     }

//     return `${horas}:${minutos}:${numeroDeSegundos}`

// }

// function actualizarTiempo() {
//     tiempoTranscurrido++;
//     document.getElementById("duracion").innerHTML = segundosATiempo(tiempoTranscurrido) ;
// }

// /************************************** AUDIO *******************************************************/

// /* const enviarAudio = async (archivo) => {
//     const formData = new FormData();
//     formData.append('audio', archivo, 'grabacion.mp3');

//     try {
//         const response = await fetch('/update', {
//             method: 'POST',
//             body: formData
//         });

//         console.log('Archivo de audio subido con éxito');
//     } catch (error) {
//         console.error('Error al subir archivo de audio', error);
//     }
// };

// startBtn.addEventListener('click', async () => {
//     try {
//         stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         const options = { mimeType: 'audio/mp3'};
//         recorder = new MediaRecorder(stream, options);
//         recorder.start();
//         recorder.addEventListener('datavailable', (event) => {
//             chunks.push(event.data);
//         });

//         console.log('Grabación iniciada');
//     }catch (error) {
//         console.error('Error al iniciar la grabación de audio', error);
//     }
// });

// stopBtn.addEventListener('click', async () => {
//     try {
//         recorder.stop();
//         console.log('Grabación detenida');
//     } catch (error) {
//         console.error('Error al detener la grabación de audio', error);
//     }
// });

// recorder.addEventListener('stop', async () => {
//     const blob = new Blob(chunks, { type: 'audio/mp3'});

//     try {
//         await enviarArchivo(blob);
//     }catch (error) {
//         console.error('Error al enviar archivo de audio', error);
//     }
// }); */

// /* startBtn.addEventListener('click', () => {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//      .then((stream) => {
//         const option = { mimeType: 'audio/mp3' };
//         const mediaRecorder = new MediaRecorder(stream, option);
//         mediaRecorder.start();

//         mediaRecorder.addEventListener('dataavaible', (evento) => {
//             chunks.push(evento.data);
//         });


//         stopBtn.addEventListener('click', () =>{
//            mediaRecorder.addEventListener('stop', () => {
//                const blob = new Blob(grabacion, {type: 'audio/mp3'});
//                const formData = new FormData();
//                formData.append('audio', blob, 'audio/mp3');

//                fetch('/update', {
//                    method: 'POST',
//                    body: formData
//                })
//                 .then((response) => {
//                    console.log('Archivo de audio subido con éxito');
//                 })
//                  .catch((error) => {
//                    console.error('Error al subir archivo de audio', error);
//                  })
//            })
//         })
//          .catch((error) => {
            
//          })
//      });

// }); */

// startBtn.addEventListener('click', async () => {
//     stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     recorder = new MediaRecorder(stream);
//     recorder.start();
    
    
// });

// stopBtn.addEventListener('click', () => {
//     recorder.stop();
//     stream.getAudioTracks()[0].stop();

    
// });

// enviar.addEventListener('click', () => {
//     recorder.stop();
//     stream.getAudioTracks()[0].stop();

//    // Creamos una función para manejar los datos grabados
//    recorder.ondataavailable = function(e) {
//     // Creamos un objeto Blob a partir de los datos grabados
//     const blob = new Blob([e.data], {type: 'audio/mp3'});
//     //grega el objeto Blob de la grabación como parte de la solicitud POST
//     /* const formData = new FormData();
//     //Agregar datos para el form
//     formData.append('audio', blob, 'grabacion.mp3');
//     //Enviar el dato por post
//     fetch('/update',{
//         method: 'POST',
//         body: formData
//     })
//      .then((response) => {
//         console.log('Archivo de audio subido con éxito');
//      })
//       .catch((error) => {
//         console.error('Error al subir archivo de audio', error);
//       }) */
//     // Creamos una URL para el archivo Blob
    
//     const url = window.URL.createObjectURL(blob);
    
//     // Creamos un elemento de enlace para descargar el archivo
//     const enlaceDescarga = document.createElement('a');
//     enlaceDescarga.href = url;
//     enlaceDescarga.download = 'grabacion';
//     console.log(blob);
    
//     // Agregamos el enlace de descarga al DOM y hacemos clic en él
//     //document.body.appendChild(enlaceDescarga);
//     enlaceDescarga.click();
    
//     // Limpiamos la URL creada para el archivo Blob
//     //window.URL.revokeObjectURL(url);

//    }
//     /* startBtn.classList.remove('is-danger');
//     startBtn.innerText = 'Comenzar grabación'; */

//     /* const audioBlob = new Blob(chunks);
//     const audioURL = URL.createObjectURL(audioBlob);
//     const link = document.createElement('a');
//     document.body.appendChild(link);
//     link.href = audioURL;
//     link.download = 'grabacion.mp4';
//     link.click(); */
// });

    
