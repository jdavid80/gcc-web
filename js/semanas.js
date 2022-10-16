

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

var Frm_Semana = new bootstrap.Modal(document.getElementById('Frm_Semana'), {
    keyboard: false
});




listarSemanasPeriodos();


function listarSemanasPeriodos(){

       
    fetch(`/listarSemanasPeriodos`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<table>`;
        data.forEach(element => { 

            //fechaActual.toLocaleDateString('en-us', opciones));
            let f1= new Date(`${element.fecha_inicio}`);
            let f2= new Date(`${element.fecha_fin}`);
            html+=`<tr>`;
            html+=`<td>${element.periodo}</td>`;  
            html+=`<td>${element.nombre_semana}</td>`; 
            html+=`<td>${f1.toLocaleDateString('en-us')}</td>`;
            html+=`<td>${f2.toLocaleDateString('en-us')}</td>`;      
            html+=`<td><a class='btn btn-danger' href='javascript:desactivarSemana(${element.id_semana})'>Eliminar</a>`;  
            html+=`</tr>`;         
        });
        html+=`</table>`;
        document.getElementById('tabla_semana').innerHTML = html;  
    });

}




function desactivarSemana(idsemana){
    fetch(`/desactivarSemana/${idsemana}`, {
               method: 'get'
           }).then(res => res.json())
           .then(data => {
            listarSemanasPeriodos();
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            });
            
           });   
   }
   

   function abrirFrmSemana(){
    Frm_Semana.show();
   }


   
function registrarSemana(){
 
    let datos= new URLSearchParams();
    datos.append('idPeriodo', document.getElementById('Lista_Periodos').value );
    datos.append('semana',document.getElementById('semana').value );
    datos.append('Fecha_Inicio',document.getElementById('Fecha_Inicio').value );
    datos.append('Fecha_Fin',document.getElementById('Fecha_Fin').value );
  

    



    fetch(`/registrarSemana`, {
                method: 'post',
                body: datos,   
            }).then(res => res.json())
            .then(data => {
            document.getElementById('semana').value ='' 
            Frm_Semana.hide();
            listarSemanasPeriodos();
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })
            
            });   
  
  }