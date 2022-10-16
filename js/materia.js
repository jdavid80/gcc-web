
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

var FrmUnidades = new bootstrap.Modal(document.getElementById('FrmUnidades'), {
    keyboard: false
});

var FrmMaterias = new bootstrap.Modal(document.getElementById('FrmMaterias'), {
    keyboard: false
});




listarGrados();


function listarGrados() {

    fetch(`/listarGrados`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<option value='0'>Seleccione una opción</<option>`;
        data.forEach(element => { 
            html+=`<option value='${element.id_grado}'>${element.nombre_grado}</<option>`;         
        });
        document.getElementById('Lista_grados').innerHTML = html;  
    });
}


function listarMateriasGrado(){

    const idGrado= document.getElementById('Lista_grados').value;
   
    fetch(`/listarMateriasGrado/${idGrado}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=`<table>`;
        data.forEach(element => { 
            html+=`<tr>`;
            html+=`<td>${element.nombre_grado}</td>`;  
            html+=`<td>${element.nombre_materia}</td>`;   
            html+=`<td><a class='btn btn-danger' href='javascript:desactivarMateria(${element.id_materia})'>Eliminar</a>`;  
            html+=`<a class='btn btn-primary m-2' href='javascript:AdministrarUnidades(${element.id_materia})'>Admin. Unidades</a></td>`;          
            html+=`</tr>`;         
        });
        html+=`</table>`;
        document.getElementById('tabla_materias').innerHTML = html;  
    });

}

function desactivarMateria(idMateria) {

    fetch(`/desactivarMateria/${idMateria}`, {
        method: 'get'
    }).then(res => res.json())
    .then(data => {
        listarMateriasGrado();
     Mensaje.fire({
         icon: data.icon,
         title: data.text
     })
     
    });    

}



function AdministrarUnidades(idMateria) {
document.getElementById('idMateria').value=idMateria;
listarUnidadesMateria();
FrmUnidades.show();


}

function listarUnidadesMateria(){

    const id=document.getElementById('idMateria').value;
    fetch(`/listarUnidadesMateria/${id}`, {
        method:'get'    
    }).then(res => res.json())
    .then(data => {
        let html=``;
        data.forEach(element => { 
            html+=`<li>${element.nombre} <a title='Eliminar' href='javascript:desactivarUnidad(${element.id_unidad});'> <i class="fa-sharp fa-solid fa-trash fa-1xl"></i> </a></li>`;         
        });
        document.getElementById('listaUnidades').innerHTML = html;  
        
    });

}




function regitrarUnidad(){
 
  let datos= new URLSearchParams();
  datos.append('idMateria', document.getElementById('idMateria').value );
  datos.append('nombreUnidad',document.getElementById('nombreUnidad').value );

 fetch(`/RegitrarUnidad`, {
            method: 'post',
            body: datos,   
        }).then(res => res.json())
        .then(data => {
         document.getElementById('nombreUnidad').value ='' 
        listarUnidadesMateria();
         Mensaje.fire({
             icon: data.icon,
             title: data.text
         })
         
        });   


}


function desactivarUnidad(idUnidad){
 fetch(`/desactivarUnidad/${idUnidad}`, {
            method: 'get'
        }).then(res => res.json())
        .then(data => {
         listarUnidadesMateria();
         Mensaje.fire({
             icon: data.icon,
             title: data.text
         })
         
        });   
}


function abrirFrmMateria(){

    FrmMaterias.show();

}




function regitrarMateria(){
 
    let datos= new URLSearchParams();
    datos.append('idGrado', document.getElementById('Lista_grados').value );
    datos.append('nombreMateria',document.getElementById('nombreMateria').value );
  
    fetch(`/regitrarMateria`, {
                method: 'post',
                body: datos,   
            }).then(res => res.json())
            .then(data => {
            document.getElementById('nombreMateria').value ='' 
            FrmMaterias.hide();
            listarMateriasGrado();
            Mensaje.fire({
                icon: data.icon,
                title: data.text
            })
            
            });   
  
  }

