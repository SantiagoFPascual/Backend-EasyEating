const BASE_URL_RESTAURANTES = 'http://localhost:5000/api/restaurantes/';

function LimpiarPantalla(){
    document.querySelector("#contenedor").innerHTML="";
}

function CargarDatos(){   
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a cargar datos");
    let url=BASE_URL_RESTAURANTES;
    axios
        .get(url)
        .then((result)=>{

            displayRestaurantes(result.data);
             
        })
    
    .catch((error)=>{
        console.log(error);
    });
}

function CargarDatosPorId(){
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a cargar datos por ID");
    let url=BASE_URL_RESTAURANTES;
    let id=document.getElementById('idRestaurante').value;
    axios
        .get(url+id)
        .then((result)=>{

            displayUnRestaurante(result.data);
            
        })
    .catch((error)=>{
        console.log(error);
    });
}

function BorrarRestaurante(){
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a borrar restaurante");
    let url=BASE_URL_RESTAURANTES;
    let id=document.getElementById('idBorrar').value;

    axios
        .delete(url+id)
        .then((result)=>{
                document.querySelector("#contenedor").innerHTML+=`
                <h4>Se borró el restaurante</h4>`;       
        })
    
    .catch((error)=>{
        console.log(error);
    });
}

function UpdateRestaurante(){
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a update restaurante");
    
    let idRestaurante=document.getElementById('idUpd').value;
    let nombre=document.getElementById('nombreUpd').value;
    let direccion=document.getElementById('direccionUpd').value;  
    let latitud=document.getElementById('latitudUpd').value;
    let longitud=document.getElementById('longitudUpd').value;
    let horario=document.getElementById('horarioUpd').value;
    let telefono=document.getElementById('telefonoUpd').value;

    
    let url=BASE_URL_RESTAURANTES+idRestaurante;

    const params = {
        idRestaurante: idRestaurante,
        nombre: nombre,
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        horario: horario,
        telefono: telefono
    };

    axios
        .put(url, params)
        .then((result)=>{
                if (result.data!=0) {
                    document.querySelector("#contenedor").innerHTML+=`<h4>Se actualizó el restuarante</h4>`;
                }
                else{
                    document.querySelector("#contenedor").innerHTML+=`<h4>ERROR. Uno de los campos es inválido</h4>`;
                }              
        })
    
    .catch((error)=>{
        console.log(error);
    });
}

function InsertRestaurante(){
    document.querySelector("#contenedor").innerHTML="";
    console.log("entra a insert restaurante");
    var  url = BASE_URL_RESTAURANTES;
    let nombre=document.getElementById('nombreIns').value;
    let direccion=document.getElementById('direccionIns').value;  
    let latitud=document.getElementById('latitudIns').value;
    let longitud=document.getElementById('longitudIns').value;
    let horario=document.getElementById('horarioIns').value;
    let telefono=document.getElementById('telefonoIns').value;

    const params = {
        nombre: nombre,
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        horario: horario,
        telefono: telefono
    };

    axios
        .post(url, params)
        .then((result)=>{

                document.querySelector("#contenedor").innerHTML+=`
                <h4>Se creó el restaurante</h4>`;
         
        })
    
    .catch((error)=>{
        console.log(error);
    });
}

function displayRestaurantes(restaurantes){
    let table = '<table class="table table-striped table-hover">';
    table += `<thead class="table-dark"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th><th class="col-5">Dirección</th><th class="col-2 text-center">Latitud</th><th class="col-1 text-center">Longitud</th><th class="col-1 text-center">Horario</th><th class="col-1 text-center">Telefono</th></tr></thead>`;
    restaurantes.forEach((restaurante, index) => {
      table += `<tr>`;
      table += `<td scope="col" class="text-center">${restaurante.idRestaurante}</td>`;
      table += `<td scope="col">${restaurante.nombre}</td>`;
      table += `<td scope="col">${restaurante.direccion}</td>`;
      table += `<td scope="col">${restaurante.latitud}</td>`;
      table += `<td scope="col">${restaurante.longitud}</td>`;
      table += `<td scope="col">${restaurante.horario}</td>`;
      table += `<td scope="col">${restaurante.telefono}</td>`;
      table += `</tr>`;
    });

    table += "</table>";
    document.querySelector("#contenedor").innerHTML = table;
  }

//PARA UNO

  function displayUnRestaurante(restaurante){
    let table = '<table class="table table-striped table-hover">';
    table += `<thead class="table-dark"><tr><th class="col-1 text-center">Id</th><th class="col-3">Nombre</th><th class="col-5">Dirección</th><th class="col-2 text-center">Latitud</th><th class="col-1 text-center">Longitud</th><th class="col-1 text-center">Horario</th><th class="col-1 text-center">Telefono</th></tr></thead>`;
      table += `<tr>`;
      table += `<td scope="col" class="text-center">${restaurante.idRestaurante}</td>`;
      table += `<td scope="col">${restaurante.nombre}</td>`;
      table += `<td scope="col">${restaurante.direccion}</td>`;
      table += `<td scope="col">${restaurante.latitud}</td>`;
      table += `<td scope="col">${restaurante.longitud}</td>`;
      table += `<td scope="col">${restaurante.horario}</td>`;
      table += `<td scope="col">${restaurante.telefono}</td>`;
      table += `</tr>`;
    table += "</table>";
    document.querySelector("#contenedor").innerHTML = table;
  }