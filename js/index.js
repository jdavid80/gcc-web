//listarPlaneaciones();


function ValidarUsuario(){
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let datos = new URLSearchParams();
        datos.append('login', login);
        datos.append('password', password);
 
        fetch('/login', {
            method: 'POST',
            body: datos
        })
            .then(data => { return data.json() })
            .then(res => {
          
            if (res.status == 'error') return alert('Usuario o contraseña incorrecta');
             
                localStorage.setItem('token', res.token)
                window.location.href = "/Abrir_Home";
            })
            .catch(err => {
                console.log(err);
            })
}







function listarPlaneacion(idPlaneacion) {

    fetch(`/Listar_Planeacion/${idPlaneacion}`)
   /*  {
        method:'get'
    }) */
    .then(res => res.json())
    .then(function(data) {
        let prueba = data[0].nombre_curso;
       //  console.log(prueba);
    });
}

function listarPlaneaciones() {

     let tabla='';
  
            fetch('/Listar_Planeaciones',
            {
                method:'get' 
            })
            .then(res => res.json())
            .then(data => {
                data.forEach(element => {
                    let json = [];
                    let array ={};
                        data.forEach(element => {
                            array = {
                                "col-1": element.nombre_curso,
                                "col-2": element.nombre_proceso,
                                "col-3": element.nombres_orientador,
                                "col-4": element.nombre_periodo,
                                "col-5": element.metas_semana,
                                "col-6": "<a class='btn btn-primary'>Edit.</a>"
                            }
                            json.push(array);
                        });      
                            $('#example').DataTable({
                                "paging":true,
                                "processing":true,
                                "responsive":true,
                                "destroy":true,
                                "data":json,
                                dom: 'Bfrtip',
                                columns:[
                                    {"data": "col-1"},
                                    {"data": "col-2"},
                                    {"data": "col-3"},
                                    {"data": "col-4"},
                                    {"data": "col-5"},
                                    {"data": "col-6"}
                                ]
                            });
                });

            });
  
}

