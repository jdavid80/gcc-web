listarGrados();




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


  var Frm_PlanEstudio = new bootstrap.Modal(document.getElementById('Frm_PlanEstudio'), {
    keyboard: false
});





function listarGrados(){
  
    fetch(`/listarGrados`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_grado}'>${element.nombre_grado}</<option>`;         
        });
        document.getElementById('Lista_Grados').innerHTML = html;  
    });


}




//listarPlanEstudioGrado();

function listarPlanEstudioGrado() {

let idGrado=document.getElementById('Lista_Grados').value;
fetch(`/listarPlanEstudioGrado/${idGrado}`, {
    method:'get'    
}).then(res => res.json())
.then(data => {
    let html=`<table>`;
       //per.nombre_periodo,sem.nombre_semana,gra.nombre_grado,ma.nombre_materia,un.nombre AS unidad,pe.estado
    data.forEach(element => { 
        html+=`<tr>`;
        html+=`<td>${element.nombre_grado}</td>`;  
        html+=`<td><b>${element.periodo}</b></td>`;   
        html+=`<td>${element.nombre_semana}</td>`;
        html+=`<td>${element.nombre_materia}</td>`;     
        html+=`<td>${element.unidad}</td>`;     
        html+=`<td>${element.estado}</td>`;    
        html+=`<td><a title='Eliminar' href='javascript:desactivarPlanEstudio(${element.id_plan_estudio});'><i class="fa-sharp fa-solid fa-trash"></i></a></td>`;    
        html+=`</tr>`;         
    });
    html+=`</table>`;
    
    document.getElementById('tabla_plan_estudio').innerHTML = html;  
});

}


function desactivarPlanEstudio(idPlanEstudio) {

    
    fetch(`/desactivarPlanEstudio/${idPlanEstudio}`, {
        method: 'get'
    }).then(res => res.json())
    .then(data => {
        listarPlanEstudioGrado()
        
        Mensaje.fire({
            icon: data.icon,
            title: data.text
        });

        
    });

}



function abrirFrmPlanEstudio(){
    Listar_Semanas();
    listarMateriasGrado();
    var grados = document.getElementById("Lista_Grados");
    var gradoSeleccionado = grados.options[grados.selectedIndex].text;
    document.getElementById('titulo').innerHTML=gradoSeleccionado;
  
    Frm_PlanEstudio.show();
}



function Listar_Semanas(){
  
    fetch(`/Listar_Semanas`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_semana}'>${element.semana}</<option>`;         
        });
        document.getElementById('Lista_Semana').innerHTML = html;  
    });


}




function listarMateriasGrado(){
  
    idGrado = document.getElementById('Lista_Grados').value;

    fetch(`/listarMateriasGrado/${idGrado}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_materia}'>${element.nombre_materia}</<option>`;         
        });
        document.getElementById('Lista_Materias').innerHTML = html;  
    });
}



function listarUnidadesMateria(){
  
    idMateria = document.getElementById('Lista_Materias').value;
    fetch(`/listarUnidadesMateria/${idMateria}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_unidad}'>${element.nombre}</<option>`;         
        });
        document.getElementById('Lista_Unidades').innerHTML = html;  
    });
}








function RegistrarPlanEstudio(){



   

    let idSemana = document.getElementById('Lista_Semana').value;
    let idUnidad = document.getElementById('Lista_Unidades').value;


    let datos= new URLSearchParams();
    datos.append('idSemana', idSemana);
    datos.append('idUnidad', idUnidad);
  
    
   
    fetch(`/RegistrarPlanEstudio`, {
               method: 'post',
               body: datos,   
           }).then(res => res.json())
           .then(data => {
                Frm_PlanEstudio.hide();
                listarPlanEstudioGrado();
                Mensaje.fire({
                    icon: data.icon,
                    title: data.text
                });
           });   
   
   
   }
   






