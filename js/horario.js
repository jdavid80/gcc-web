


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

var Frm_Horario = new bootstrap.Modal(document.getElementById('Frm_Horario'), {
    keyboard: false
});



listarHorariosCurso();
listarGrados();
function abrirFrmHorario(){
   
    listarOrientadores();
    Frm_Horario.show();
  
}

function listarGrados(){
  
    fetch(`/listarCursos`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_curso}'>${element.nombre_curso}</<option>`;         
        });
        document.getElementById('Lista_Cursos').innerHTML = html;  
    });


}


function listarMateriasCurso() {

    const id_curso= document.getElementById('Lista_Cursos').value;
    listarHorariosCurso();
   
    fetch(`/listarMateriasCurso/${id_curso}`, {
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



function listarOrientadores() {

   
    fetch(`/listarOrientadoresActivos`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_persona}'>${element.nombres}</<option>`;         
        });
        document.getElementById('Lista_Orientadores').innerHTML = html;  
    });


}


function Registrar_Horario(){

   
 let id_persona = document.getElementById('Lista_Orientadores').value;
 let id_curso = document.getElementById('Lista_Cursos').value;
 let id_Materia = document.getElementById('Lista_Materias').value;
 let hora_inicio = document.getElementById('hora_inicio').value;
 let hora_fin = document.getElementById('hora_fin').value;
 let Lista_Dia = document.getElementById('Lista_Dia').value;
 

 
 let datos= new URLSearchParams();
 datos.append('id_persona', id_persona);
 datos.append('id_curso', id_curso);
 datos.append('id_Materia', id_Materia);
 datos.append('hora_inicio', hora_inicio);
 datos.append('hora_fin', hora_fin);
 datos.append('dia', Lista_Dia);

 

 fetch(`/registrarHorario`, {
            method: 'post',
            body: datos,   
        }).then(res => res.json())
        .then(data => {
            Frm_Horario.hide();
            listarHorariosCurso();
         Mensaje.fire({
             icon: data.icon,
             title: data.text
         })
         
        });   


}





async function  listarHorariosCurso() {

    const id_curso= document.getElementById('Lista_Cursos').value;

   
   await fetch(`/listarHorariosCurso/${id_curso}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
       // console.log(data);
        let html=`<table>`;
        data.forEach(element => { 
            html+=`<tr>`;
            html+=`<td>${element.orientador}</td>`;   
            html+=`<td>${element.Lunes}</td>`;
            html+=`<td>${element.Martes}</td>`;     
            html+=`<td>${element.Miercoles}</td>`;     
            html+=`<td>${element.Jueves}</td>`;     
            html+=`<td>${element.Viernes}</td>`;    
            html+=`<td><a title='Eliminar' href='javascript:desactivarHorario(${element.id_asiganacion})'><i class="fa-sharp fa-solid fa-trash"></i></a></td>`;         
            html+=`</tr>`;         
        });
        html+=`</table>`;
        document.getElementById('tabla_horario').innerHTML = html;  
    });

}


function desactivarHorario(id_horario){

    fetch(`/desactivarHorario/${id_horario}`, {
        method: 'get'
    }).then(res => res.json())
    .then(data => {
        listarHorariosCurso();
        Mensaje.fire({
            icon: data.icon,
            title: data.text
        });
    });   
}

