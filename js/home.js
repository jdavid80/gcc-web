
Listar_Planeacion_Formacion();

function Listar_Planeacion_Formacion(){


    /*
    ,
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    */

fetch('/Listar_Planeacion_Formacion',{
        method:'get'
    })
    .then(res=>res.json())
    .then(data=>{
       // if(data.status == 401) return console.log(data)
        let json = [];
        let array = {}
        const opciones = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        let boton='';
        data.forEach(element => {
          
            if(element.estado_planeacion=='Proceso'){
            boton=`<a class='btn btn-primary' href='javascript:Editar_Planeacion(${element.id_planeacion})';><i class="fa-sharp fa-solid fa-pen"></i></a>`;
         
            }else{
                boton=`<a class='btn btn-primary' href='javascript:Imprimeir_Planeacion(${element.id_planeacion})';><i class="fa-sharp fa-solid fa-file-pdf"></i></a>`;
         
            }
            array = {
                "col-1": element.id_planeacion,
                "col-2": new Date(element.fecha_elaboracion).toLocaleDateString(),
                "col-3": element.estado_planeacion,
                "col-4": element.nombre_semana,
                "col-5": element.unidad,
                "col-6":boton ,
            }
            json.push(array);
        });
   

        $('#tabla-planeacion').DataTable({

         
            "autoWidth": false,
            "info" : false,
            "destroy": true,
            data: json,
            columns : [
                {"data": "col-1"},
                {"data": "col-2"},
                {"data": "col-3"},
                {"data": "col-4"},
                {"data": "col-5"},
                {"data": "col-6"}
            ]
 
               
        });

    
        
    });


}


function Editar_Planeacion(id_planeacion){
alert(id_planeacion);

}