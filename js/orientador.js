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

var Frm_orientador = new bootstrap.Modal(document.getElementById('Frm_orientador'), {
    keyboard: false
});

listarOrientadores();

function Frm_Orientador(){
    document.getElementById('btnRegistrar').style.display = 'block';
    document.getElementById('btnActualizar').style.display = 'none';
    Frm_orientador.show();
}


function listarOrientadores(){
   
   
    fetch(`/listarTodosOrientadores`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<table>`;
        data.forEach(element => { 
            html+=`<tr>`;
            html+=`<td>${element.numero_documento}</td>`;  
            html+=`<td>${element.nombres}</td>`;
            html+=`<td>${element.direccion}</td>`; 
            html+=`<td>${element.telefono}</td>`;  
            html+=`<td>${element.correo_electronico}</td>`; 
         
            html+=`<td>${element.estado}</td>`;
            html+=`<td>`;  
          if(element.estado=='Activo'){
            html+=`<a class='btn btn-primary m-2' href='javascript:buscarOrientador(${element.id_persona})'>Actualizar</a>`;  
            html+=`<a class='btn btn-danger m-2' href='javascript:desactivarOrientador(${element.id_persona})'>Desactivar</a>`;  
            }else{
                html+=`<a class='btn btn-primary' href='javascript:activarOrientador(${element.id_persona})'>Activar</a>`;  
            }
           
            html+=`</td>`;  
          html+=`</tr>`;         
        });
        html+=`</table>`;
        document.getElementById('tabla_orientador').innerHTML = html;  
    });
}


function desactivarOrientador(idOrientador){

    fetch(`/desactivarOrientador/${idOrientador}`, {
        method: 'get'
    }).then(res => res.json())
    .then(data => {
        listarOrientadores();
     Mensaje.fire({
         icon: data.icon,
         title: data.text
     })
     
    });  

}




function activarOrientador(idOrientador){

    fetch(`/activarOrientador/${idOrientador}`, {
        method: 'get'
    }).then(res => res.json())
    .then(data => {
        listarOrientadores();
     Mensaje.fire({
         icon: data.icon,
         title: data.text
     })
     
    });  

}




function registrarOrientador(){

    let tipoIdentificacion = document.getElementById('tipoIdentificacion').value;
    let identificacion = document.getElementById('identificacion').value;
    let nombres = document.getElementById('nombres').value;
    let primerApellido = document.getElementById('primerApellido').value;
    let segundoApellido = document.getElementById('segundoApellido').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;
   
    
    let datos= new URLSearchParams();
    datos.append('tipoIdentificacion', tipoIdentificacion);
    datos.append('identificacion', identificacion);
    datos.append('nombres', nombres);
    datos.append('primerApellido', primerApellido);
    datos.append('segundoApellido', segundoApellido);
    datos.append('direccion', direccion);
    datos.append('telefono', telefono);
    datos.append('correo', correo);
   
       
    fetch(`/registrarOrientador`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {
            Frm_orientador.hide();
            limpiarFormulario();
            listarOrientadores();
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })
            
           });   
   
   
   }
   
   



function buscarOrientador(idPersona){
  
       
    fetch(`/buscarOrientador/${idPersona}`, {
               method: 'get'  
           }).then(res => res.json())
           .then(data => {
         
            
            document.getElementById('idOrientador').value=data[0].id_persona;
            document.getElementById('tipoIdentificacion').value=data[0].tipo_documento;
            document.getElementById('identificacion').value=data[0].numero_documento;
            document.getElementById('nombres').value=data[0].nombres_persona;
            document.getElementById('primerApellido').value=data[0].primer_apellido;
            document.getElementById('segundoApellido').value=data[0].segundo_apellido;
            document.getElementById('direccion').value=data[0].direccion;
            document.getElementById('telefono').value=data[0].telefono;
            document.getElementById('correo').value=data[0].correo_electronico;

            document.getElementById('btnRegistrar').style.display = 'none';
            document.getElementById('btnActualizar').style.display = 'block';

            Frm_orientador.show();
           });   
   
   
   }





function actualizarOrientador(){


    let idOrientador = document.getElementById('idOrientador').value;
    let tipoIdentificacion = document.getElementById('tipoIdentificacion').value;
    let identificacion = document.getElementById('identificacion').value;
    let nombres = document.getElementById('nombres').value;
    let primerApellido = document.getElementById('primerApellido').value;
    let segundoApellido = document.getElementById('segundoApellido').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;
   
    let datos= new URLSearchParams();
    datos.append('idPersona', idOrientador);
    datos.append('tipoIdentificacion', tipoIdentificacion);
    datos.append('identificacion', identificacion);
    datos.append('nombres', nombres);
    datos.append('primerApellido', primerApellido);
    datos.append('segundoApellido', segundoApellido);
    datos.append('direccion', direccion);
    datos.append('telefono', telefono);
    datos.append('correo', correo);
   
       
    fetch(`/actualizarOrientador`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {
            Frm_orientador.hide();
            limpiarFormulario();
            listarOrientadores();
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })
            
           });   
   
   
   }


   function limpiarFormulario(){
    document.getElementById('idOrientador').value='';
    document.getElementById('tipoIdentificacion').value='';
    document.getElementById('identificacion').value='';
    document.getElementById('nombres').value='';
    document.getElementById('primerApellido').value='';
    document.getElementById('segundoApellido').value='';
    document.getElementById('direccion').value='';
    document.getElementById('telefono').value='';
    document.getElementById('correo').value='';
   }
   