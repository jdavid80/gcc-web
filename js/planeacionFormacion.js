
/* Configuraciones de Modla */


var Frm_Planeacion = new bootstrap.Modal(document.getElementById('Frm_Planeacion'), {
    keyboard: false
});

var Frm_Topicos = new bootstrap.Modal(document.getElementById('Frm_Topicos'), {
    keyboard: false
});

var Frm_Hilos = new bootstrap.Modal(document.getElementById('Frm_Hilos'), {
    keyboard: false
});

var Frm_Criterios = new bootstrap.Modal(document.getElementById('Frm_Criterios'), {
    keyboard: false
});

var Frm_grados = new bootstrap.Modal(document.getElementById('Frm_grados'), {
    keyboard: false
});


var Frm_recursos = new bootstrap.Modal(document.getElementById('Frm_recursos'), {
    keyboard: false
});


var Frm_desempenios = new bootstrap.Modal(document.getElementById('Frm_desempenios'), {
    keyboard: false
});







const Mensaje = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });


  /* Fin de configuraiones  */


function Frm_listar_Grados(){
    Listar_Cursos_Unidad_Planeacion();
    Frm_grados.show();
}





function Frm_Desempenio(){

    listar_Metas_Planeacion_select5();
    Frm_desempenios.show();

}


function listar_Desempenios_Planacion(){

    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Desempenios_Planacion/${id_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html='';
        data.forEach(element => { 
            console.log(data);
            html+=`<tr><td>${data[0].nombre_meta}</td>`;      
            html+=`<td>${data[0].fase}</td>`;     
            html+=`<td>${data[0].nombre_desempenio}</td>`;     
            html+=`<td>${data[0].recurso}</td>`;  
            html+=`<td><a title="Agregar Recurso" href="javascript:Frm_Listar_recursos(${data[0].id_desempenio})"><i class="fa-sharp fa-solid fa-flask fa-1xl"></i></a></td>`;
            html+=`</tr>`;     
        });
        document.getElementById('tabla_desempenios').innerHTML = html;  
    });




}


function listar_Metas_Planeacion_select5(){
    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Metas_Planeacion/${id_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_planeacion_metas}'>${element.nombre_meta}</<option>`;         
        });
        document.getElementById('select_Metas5').innerHTML = html;  
    });
}


function Registrar_Desempenio_Planeacion(){

    let id_meta=document.getElementById('select_Metas5').value;
    let id_planeacion=document.getElementById('id_planeacion').value;
    let desempenio=document.getElementById('desempenio').value;

    
    let datos= new URLSearchParams();
    datos.append('id_meta', id_meta);
    datos.append('desempenio', desempenio);
    datos.append('id_planeacion', id_planeacion);
   
    fetch(`/Registrar_Desempenio_Planeacion`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {

            Frm_desempenios.hide();
            listar_Desempenios_Planacion();
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })
         
           
           
                
           });   

    
}


function listar_Metas_Planeacion_Criterios(){
    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Metas_Planeacion/${id_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
       let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_meta_comprension}'>${element.nombre_meta}</<option>`;         
        });
        document.getElementById('Lista_Metas2').innerHTML = html;  
    });


}


function Frm_Listar_Criterios(){
    listar_Metas_Planeacion_Criterios();
    
 Frm_Criterios.show();
}


function Frm_Listar_recursos(id){
    document.getElementById('id_sempenio').value=id;
   Listar_Recursos();
    Frm_recursos.show();
}











/*
function listar_Recursos_Planeacion(){

    
    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Recursos_Planeacion/${id_planeacion}`, {
     method:'get'    
 }).then(res => res.json())
 .then(data => {
    let html='';  

     data.forEach(element => { 
         html+=`<li>${element.nombre_recurso} - <a title='Eliminar' href="javascript:Eliminar_Recurso_Planeacion(${element.id_recurso_Planeacion});"><i class="fa-sharp fa-solid fa-trash"></i></a></li>`;         
     });

     document.getElementById('Recursos_Planeacion').innerHTML = html;  
 });


    
}

*/


function Eliminar_Recurso_Planeacion(id_recurso){

    fetch(`/Eliminar_Recurso_Planeacion/${id_recurso}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => { 
            Frm_recursos.hide();
           // listar_Recursos_Planeacion();
    });

   // listar_Recursos_Planeacion();
    

}

function Registrar_Recursos_Planeacion(){


    let id_recurso=  document.getElementById('Lista_Recursos').value; 
   let id_desempenio= document.getElementById('id_sempenio').value;
  
    
    let datos= new URLSearchParams();
    datos.append('id_recurso', id_recurso);
    datos.append('id_desempenio', id_desempenio);
   
    fetch(`/Registrar_Recursos_Planeacion`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {
                Frm_recursos.hide();
                listar_Desempenios_Planacion();
                
           });   



}


function Listar_Recursos(){

    fetch(`/Listar_Recursos`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</option>`;         
      
        data.forEach(element => { 
            html+=`<option value='${element.id_tipo_recurso}'>${element.nombre_recurso}</<option>`;         
        });
    
   // console.log(html);
        document.getElementById('Lista_Recursos').innerHTML = html;  
    });


}





function listar_Grados_Planeacion(){

    
    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Grados_Planeacion/${id_planeacion}`, {
     method:'get'    
 }).then(res => res.json())
 .then(data => {
    let html='';  

     data.forEach(element => { 
         html+=`<li>${element.nombre_curso} - <a title='Eliminar' href="javascript:Eliminar_Grado_Planeacion(${element.id_grupal});"><i class="fa-sharp fa-solid fa-trash"></i></a></li>`;         
     });

     document.getElementById('Grados_Planeacion').innerHTML = html;  
 });


    
}





function Eliminar_Grado_Planeacion(id_grupo){
    
    fetch(`/Eliminar_Grado_Planeacion/${id_grupo}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => { 
        Frm_grados.hide();
        listar_Grados_Planeacion(); 
    });

}

function Registrar_Grados_Planeacion(){
    
    let id_grado=  document.getElementById('Lista_Grados').value; 
    let id_planeacion=  document.getElementById('id_planeacion').value; 
    
    let datos= new URLSearchParams();
    datos.append('id_grado', id_grado);
    datos.append('id_planeacion', id_planeacion);
   
    fetch(`/Registrar_Grados_Planeacion`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {
                Frm_grados.hide();
                listar_Grados_Planeacion();
                
           });   



}



function Listar_Cursos_Unidad_Planeacion(){
   
    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/Listar_Cursos_Unidad_Planeacion/${id_planeacion}`, {
     method:'get'    
 }).then(res => res.json())
 .then(data => {
  
    let html=`<option value='0'>Seleccione una opción</<option>`;      
   
     data.forEach(element => { 
         html+=`<option value='${element.id_asiganacion}'>${element.nombre_curso}</<option>`;         
     });
 
 
     document.getElementById('Lista_Grados').innerHTML = html;  
 });



}


function Eliminar_Criterio_Planeacion(id_criterio_planeacion){
    fetch(`/Eliminar_Criterio_Planeacion/${id_criterio_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => { 
        Frm_Criterios.hide();
        listar_Criterios_Planeacion(); 
    });
}




function listar_Criterios_Planeacion(id_criterio_planeacion){

    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Criterios_Planeacion/${id_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
       let html='';
        data.forEach(element => { 
                html+=`<tr>`;
                html+=`<td>${element.nombre_actividad}</td>`;
                html+=`<td>${element.nombre_criterio}</td>`;
                html+=`<td><a title='Eliminar' href='javascript:Eliminar_Criterio_Planeacion(${element.id_planeacion_criterio})'><i class="fa-sharp fa-solid fa-trash"></i></a></td>`;
                html+=`</tr>`;
    });
        document.getElementById('tabla_criterios').innerHTML = html;  
    });


}


function Registrar_Criterio_Planeacion(){

    let id_criterio=  document.getElementById('Lista_Criterios').value; 
    let id_planeacion=  document.getElementById('id_planeacion').value; 
    
    let datos= new URLSearchParams();
    datos.append('id_criterio', id_criterio);
    datos.append('id_planeacion', id_planeacion);
   
    fetch(`/Registrar_Criterio_Planeacion`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {
                Frm_Criterios.hide();
                listar_Criterios_Planeacion();
                
           });   



}



function Listar_Criterios(){

    let id_actividad =document.getElementById('Lista_Actividades').value;  

    fetch(`/Listar_Criterio_Actividad/${id_actividad}`, {
     method:'get'    
 }).then(res => res.json())
 .then(data => {
    let html=`<option value='0'>Seleccione una opción</<option>`;
     data.forEach(element => { 
         html+=`<option value='${element.id_criterio}'>${element.nombre_criterio}</<option>`;         
     });
 
 
     document.getElementById('Lista_Criterios').innerHTML = html;  
 });
 



}



function Listar_Activiades_Metas(){
   let id_meta =document.getElementById('Lista_Metas2').value;  

   fetch(`/Listar_Activiades_Metas/${id_meta}`, {
    method:'get'    
}).then(res => res.json())
.then(data => {
    let html=`<option value='0'>Seleccione una opción</<option>`;
    data.forEach(element => { 
        html+=`<option value='${element.id_actividad}'>${element.nombre_actividad}</<option>`;         
    });


    document.getElementById('Lista_Actividades').innerHTML = html;  
});



}

// se listan las fase de las metas de comprensión


function listar_fases(){
    fetch(`/listar_fases`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_fase}'>${element.nombre_fase}</<option>`;         
        });
        document.getElementById('Lista_Fases').innerHTML = html;  
    });
}







// Se listan las metas agregadas a la planeación para mostrar en el select "Lista_Metas4"  
function listar_Metas_Planeacion_select(){
    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Metas_Planeacion/${id_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_meta_comprension}'>${element.nombre_meta}</<option>`;         
        });
        document.getElementById('select_Metas4').innerHTML = html;  
    });
}






function Eliminar_Hilo_Planeacion(id_hilo_planacion){

    fetch(`/Eliminar_Hilo_Planeacion/${id_hilo_planacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        
        Frm_Hilos.hide();
        listar_Hilos_Planeacion();
       
    });

}

// se listan los hilos registrados en la planeación 
function listar_Hilos_Planeacion(){
    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Hilos_Planeacion/${id_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
       let html='';
       data.forEach(element => {   
        html+=`<li>${element.nombre_hilo} - <a title='Eliminar' href='javascript:Eliminar_Hilo_Planeacion(${element.id_planecion_hilos})'><i class="fa-sharp fa-solid fa-trash"></i></a></li>`;
        });   
        document.getElementById('hilos_planeacion').innerHTML = html;  
    });




}




// Se registran los hilos a la planeación
function Registrar_Hilo_Planeacion(){

    let id_hilo=  document.getElementById('Lista_Hilos').value; 
    let id_planeacion=  document.getElementById('id_planeacion').value; 
    
    let datos= new URLSearchParams();
    datos.append('id_hilo', id_hilo);
    datos.append('id_planeacion', id_planeacion);
   
    fetch(`/Registrar_Hilo_Planeacion`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {
                Frm_Hilos.hide();
               listar_Hilos_Planeacion();
                
           });   


}


// se listan los hilos que pertenecen a la leta id
function Listar_Hilos_Metas(){
let id_meta= document.getElementById("select_Metas4").value;

    fetch(`/listar_Hilos_Meta/${id_meta}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
       let html=`<option value='0'>Seleccione una opción</option>`;
       data.forEach(element => {   
        html+=`<option value='${element.id_hilos}'>${element.nombre_hilo}</option>`;
        });   
        document.getElementById('Lista_Hilos').innerHTML = html; 
       
        
    });


}


function Listar_Hilos_Conductores(){
  
   listar_Metas_Planeacion_select();
   Frm_Hilos.show(); 
   



    

   
}

// Se eliminan las metas registradas en la planeación
function Eliminar_Meta_Planeacion(id_meta_plan){

        fetch(`/Eliminar_Meta_Planeacion/${id_meta_plan}`, {
            method:'get'    
        }).then(res => res.json())
        .then(data => {
            Frm_Topicos.hide();
            listar_Metas_Planeacion();
           
        });



}

// Se elistan la metas registradas en la planeacion para mostrar en una tabla
function listar_Metas_Planeacion(){

    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/listar_Metas_Planeacion/${id_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
       let html='';
        data.forEach(element => { 
                html+=`<tr>`;
                html+=`<td>${element.nombre_topico}</td>`;
                html+=`<td>${element.nombre_fase}</td>`;
                html+=`<td>${element.nombre_meta}</td>`;
                html+=`<td><a title="Eliminar" href='javascript:Eliminar_Meta_Planeacion(${element.id_planeacion_metas})'><i class="fa-sharp fa-solid fa-trash"></i></a></td>`;
                html+=`</tr>`;
    });
        document.getElementById('tabla_metas_planeacion').innerHTML = html;  
    });



}


function Agragar_Metas_Planeacion() {
    let id_fase=  document.getElementById('Lista_Fases').value; 
    let id_meta=  document.getElementById('Lista_Metas').value; 
    let id_planeacion=  document.getElementById('id_planeacion').value; 
    
    let datos= new URLSearchParams();
    datos.append('id_fase', id_fase);
    datos.append('id_meta', id_meta);
    datos.append('id_planeacion', id_planeacion);
   
    fetch(`/Registrar_Meta_Planeacion`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {
                Frm_Topicos.hide();
                listar_Metas_Planeacion();
                
           });   


}

function listar_Metas_Topico(){ 

    let Lista_Topicos=document.getElementById('Lista_Topicos').value;

    fetch(`/listar_Metas_Topico/${Lista_Topicos}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
         let html=`<option value='0'>Seleccione una opción</option>`;
      
        data.forEach(element => {
           
        html+=`<option value='${element.id_meta_comprension}'>${element.nombre_meta}</option>`;
        });   
        document.getElementById('Lista_Metas').innerHTML = html;  
    });


}




function Listar_Topicos_Unidad(){
    let id_planeacion=document.getElementById('id_planeacion').value;

    fetch(`/Listar_Topicos_Unidad/${id_planeacion}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
      
       let html=`<option value='0'>Seleccione una opción</option>`;
    
        data.forEach(element => {
           
        html+=`<option value='${element.id_topico}'>${element.nombre_topico}</option>`;
        });   
        document.getElementById('Lista_Topicos').innerHTML = html;  
    });

}

// peticion para finalizar la plaenación 
function Finalizar_Planeacion(id_planeacion){


    Swal.fire({
        title: '¿Desea finalizar la planeación?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          
                                fetch(`/Finalizar_Planeacion/${id_planeacion}`, {
                                    method: 'get',
                                    headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }    
                                }).then(
                                    res =>{
                                        if (res.status == 401)return  window.location.href = "/";
                                        if (res.status == 404)return  alert('Error con la base de datos');
                                        if (res.status == 200) return res.json();   
                                    } 
                                )
                                .then(data => {
                                    window.location.href = "/planeacion";
                                });   

        } else if (result.isDenied) {
          Swal.fire('Operación cancelada..!', '', 'info')
        }
      })



    /*
    

*/

}


/* Busca planeaciones en estado de proceso del usuario que inicio sesión */
function Buscar_Planeacion_Proceso(){

    fetch('/Buscar_Planeacion_Proceso', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }           
        }).then( 
            res =>{
                if (res.status == 401)return  window.location.href = "/";
                if (res.status == 500)return  alert('usuario no autorizado');
                if (res.status == 200) return res.json();   
            }    
        )
        .then(data => {

           if (data.length>0) {
                document.getElementById('id_planeacion').value=data[0].id_planeacion;
                document.getElementById('semana').innerHTML=data[0].semana;
                document.getElementById('nombres').innerHTML=data[0].nombres;
                document.getElementById('unidad').innerHTML=data[0].unidad;
                document.getElementById('id_unidad').value=data[0].id_unidad;
                
                document.getElementById('admin').innerHTML=`<button class='btn btn-danger' onclick='Finalizar_Planeacion(${data[0].id_planeacion})'>Finalizar</button>`;
                
                listar_Metas_Planeacion();
                listar_Hilos_Planeacion();
                listar_Criterios_Planeacion();
                listar_Grados_Planeacion();
              //  listar_Recursos_Planeacion();
                listar_Desempenios_Planacion();
            Swal.fire({
                title: 'Pendiente',
                icon: 'success',
                text: 'Tiene una planeacion pendiente por terminar',
                timer: 1500
            })

        }else{
           
            Listar_Materias_Asignadas();
            Frm_Planeacion.show();
        }
           

        });  


}


function Listar_Semanas_Unidad(){
    let id_unidad= document.getElementById('Lista_Unidades').value;
   
    fetch(`/Listar_Semanas_Unidad/${id_unidad}`, {
               method:'get'    
           }).then(res => res.json())
           .then(data => {
             
              let html=`<option value='0'>Seleccione una opción</option>`;
               data.forEach(element => {
               html+=`<option value='${element.id_plan_estudio}'>${element.nombre_semana}</option>`;
               });   
               document.getElementById('Lista_Semanas').innerHTML = html;  
           });
}




function Listar_Unidades_Asignadas(){
    let id_asignacion=  document.getElementById('Lista_Matrias').value; 

  
    fetch(`/Listar_Unidades_Asignadas/${id_asignacion}`, {
               method: 'get'    
           }).then(res => res.json())
           .then(data => {
   
            let html=`<option value='0'>Seleccione una opción</<option>`;
               data.forEach(element => {
                html+=`<option value=${element.id_unidad}>${element.nombre}</option>`;
   
               });
                  
               document.getElementById('Lista_Unidades').innerHTML = html;   
           });   



}




function Listar_Materias_Asignadas(){     
    fetch('/Listar_Materias_Asignadas', {
            method: 'get'    
        }).then(res => res.json())
        .then(data => {
            let html=`<option value='0'>Seleccione una opción</<option>`;
            data.forEach(element => {
             html+=`<option value=${element.id_asiganacion}>${element.nombre_materia}</option>`;
            });
              
            document.getElementById('Lista_Matrias').innerHTML = html;     
        });  
}



function Registrar_Planeacion_Formacion(){
    
    let id_plan_estudio=  document.getElementById('Lista_Semanas').value;
    let id_asiganacion=  document.getElementById('Lista_Matrias').value;
    
    
    let datos= new URLSearchParams();
    datos.append('id_plan_estudio', id_plan_estudio);
    datos.append('id_asiganacion', id_asiganacion);
    
    fetch(`/Registrar_Planeacion_Formacion`, {
               method: 'post',
               body: datos, 
               headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }    
           }).then(
                res =>{
                    if (res.status == 401)return  window.location.href = "/";
                    if (res.status == 500)return  alert('Ya tiene una planeación registrada para la semana y la unidad seleccionada');      
                    if (res.status == 200) return res.json();   
                } 
            )
           .then(data => {
            Frm_Planeacion.hide();
            Buscar_Planeacion_Proceso();
            Swal.fire({
                title: data.titulo,
                icon: data.icon,
                text: data.text,
                timer: 1500
            });

     
           });   


}


/*Formularios de los crud basicos*/

function Frm_listar_Topicos(){
    Listar_Topicos_Unidad();
    listar_fases();
    Frm_Topicos.show();
}


async function Frm_Agregar_Topicos(){
    Frm_Topicos.hide();
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Nuevo Topico Generativos',
        inputPlaceholder: 'Digite el nuevo tópico',
        inputAttributes: {
            maxlength: 200
        },
        showCancelButton: true
      })
      
      if (text) {
        //Swal.fire(text);
        let id_unidad=  document.getElementById('id_unidad').value; 
        Registrar_Topicos(id_unidad,text)  
        
      }


}



// se realiza la peticion para registrar topicos
function Registrar_Topicos(id_unidad,text){

    
    let datos= new URLSearchParams();
    datos.append('id_unidad', id_unidad);
    datos.append('nombre', text);
    
    fetch(`/Registrar_Topicos`, {
               method: 'post',
               body: datos 
           }).then(res =>{return res.json();} 
            )
           .then(data => {
                    Mensaje.fire({
                        icon: data.icon,
                        title: data.text
                    })
                 Frm_listar_Topicos();
           });   

}



// se registra una nueva meta del topico seleccionado
async function Frm_Agregar_Metas(){
    Frm_Topicos.hide();
const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Nueva meta de comprensión',
        inputPlaceholder: 'Digite la nueva meta de comprensión',
        inputAttributes: {
            maxlength: 200
        },
        showCancelButton: true
      })
      
      if (text) {
        //Swal.fire(text);
        let id_topico=  document.getElementById('Lista_Topicos').value; 
        Registrar_Meta(id_topico,text);  
        
      }


}

// se realiza la peticion para registrar nueva meta de comprensión
function Registrar_Meta(id_topico,nombre){
    
    let datos= new URLSearchParams();
    datos.append('id_topico', id_topico);
    datos.append('nombre', nombre);
    fetch(`/Registrar_Meta`, {
               method: 'post',
               body: datos
               
           }).then(
                res =>{
                    return res.json();   
                } 
            )
           .then(data => {
    
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            });
            
            listar_Metas_Topico();
            Frm_Topicos.show();
           });   

}
async function Frm_Agregar_Hilos(){
  
    Frm_Hilos.hide();
   const { value: text } = await Swal.fire({
       input: 'textarea',
       inputLabel: 'Nuevo Hilo Conductor Generativo',
       inputPlaceholder: 'Digite el nuevo hilo conductor',
       inputAttributes: {
           maxlength: 200
       },
       showCancelButton: true
     })
     
     if (text) {
       //Swal.fire(text);
       let id_meta=  document.getElementById('select_Metas4').value; 
       Registrar_Hilo(id_meta,text)     
     }

}

// se realiza la perticion para registrar un nuevo hilo
function Registrar_Hilo(id_meta,text){

    let datos= new URLSearchParams();
    datos.append('id_meta', id_meta);
    datos.append('nombre', text);
    fetch(`/Registrar_Hilo`, {
               method: 'post',
               body: datos
           }).then(res =>{return res.json();} 
            )
           .then(data => {
    
            Mensaje.fire({icon: data.icon,title: data.text});

            Listar_Hilos_Metas();
            Frm_Hilos.show();
           });   

}


// se realiza la petición para registra un nueva actividad
async function Frm_Agregar_Actividad(){


    Frm_Criterios.hide();
   const { value: text } = await Swal.fire({
       input: 'textarea',
       inputLabel: 'Nueva Actividad ',
       inputPlaceholder: 'Digite la nueva  Actividad',
       inputAttributes: {
           maxlength: 200
       },
       showCancelButton: true
     })
     
     if (text) {
        let id_meta=  document.getElementById('Lista_Metas2').value; 
      Registrar_Actividad(id_meta,text);  
     }



}


function Registrar_Actividad(id_meta,actividad){

    
    let datos= new URLSearchParams();
    datos.append('id_meta', id_meta);
    datos.append('actividad', actividad);
    fetch(`/Registrar_Actividad`, {
               method: 'post',
               body: datos
           })
           .then(res =>res.json())
           .then(data => {
    
            Mensaje.fire({icon: data.icon,title: data.text});

            Listar_Activiades_Metas();
            Frm_Criterios.show();
           });   


}

// se realiza la petición para registrar criterios

async function Frm_Agregar_Criterio(){



    Frm_Criterios.hide();
   const { value: text } = await Swal.fire({
       input: 'textarea',
       inputLabel: 'Nuevo Criterio ',
       inputPlaceholder: 'Digite el nuevo criterio',
       inputAttributes: {
           maxlength: 200
       },
       showCancelButton: true
     })
     
     if (text) {
        let id_actividad=  document.getElementById('Lista_Actividades').value; 
      Registrar_Criterio(id_actividad,text);  
     }


}


function  Registrar_Criterio(id_actividad,criterio){

    let datos= new URLSearchParams();
    datos.append('id_actividad', id_actividad);
    datos.append('criterio', criterio);
    fetch(`/Registrar_Criterio`, {
               method: 'post',
               body: datos
           })
           .then(res =>res.json())
           .then(data => {
    
            Mensaje.fire({icon: data.icon,title: data.text});

            Listar_Criterios();
            Frm_Criterios.show();
           });   

}


// Se crea el formulario para registrar nuevo recurso
async function Frm_Agregar_Recurso(){



    Frm_recursos.hide();
   const { value: text } = await Swal.fire({
       input: 'textarea',
       inputLabel: 'Nuevo Recurso ',
       inputPlaceholder: 'Digite el nuevo recurso',
       inputAttributes: {
           maxlength: 200
       },
       showCancelButton: true
     })
     
     if (text) {
       
      Registrar_Recurso(text);  
     }

}



function Registrar_Recurso(recurso){


    let datos= new URLSearchParams();
    datos.append('recurso', recurso);
    fetch(`/Registrar_Recurso`, {
               method: 'post',
               body: datos
           })
           .then(res =>res.json())
           .then(data => {

            Mensaje.fire({icon: data.icon,title: data.text});
            Listar_Recursos();
            Frm_recursos.show();
           });   

}

async function Frm_Agregar_Fase(){
   Frm_Topicos.hide();
    const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Nueva fase de secuencia',
            inputPlaceholder: 'Digite la nueva fase de secuencia',
            inputAttributes: {
                maxlength: 200
            },
            showCancelButton: true
          })
          
          if (text) {
            //Swal.fire(text);
            
            Registrar_Fase(text);  
            
          }
}


 function Registrar_Fase(fase){

    let datos= new URLSearchParams();
    datos.append('fase', fase);
    fetch(`/Registrar_Fase`, {
               method: 'post',
               body: datos
           })
           .then(res =>res.json())
           .then(data => {

            Mensaje.fire({icon: data.icon,title: data.text});
            listar_fases();
            Frm_Topicos.show();
           });   


 }


