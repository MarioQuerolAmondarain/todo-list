const tareas = [];
const estados = ["todo", "doing", "done", "deleted"];

let indice = 0;
var id;
for (let index = 0; index < 8; index++) 
{
    id = index;
    tareas.push(new Task("Tarea " + index, "Descripcion", estados[indice], Math.round(Math.random() * 10), id));
    indice++;
    if(indice >= 4) indice = 0;
}
console.log("Se crean las tareas");

const tareaTemplate = document.getElementById("tareaGeneral");
const listaGeneral = document.getElementById("listaGeneral");
const listaToDo = document.getElementById("listaToDo");
const listaDoing = document.getElementById("listaDoing");
const listaDone = document.getElementById("listaDone");
const listaDeleted = document.getElementById("listaDeleted");
const tareasNodos = [];

listaGeneral.removeChild(listaGeneral.firstChild);
tareas.forEach(tarea => {
    actualizarTareas(tarea);
});
listaGeneral.removeChild(listaGeneral.firstChild);
console.log("Se añaden las tareas a las respectivas listas");

/* 
    EVENTOS BOTONES
*/
document.getElementById("btnAñadirTarea").addEventListener('click', (e) => {
    e.preventDefault();
    let nombre = document.getElementById("nombreTarea").value;
    let descripcion = document.getElementById("descripcionTarea").value;
    let estado = document.getElementById("estadoTarea").value;
    let prioridad = document.getElementById("prioridadTarea").value;

    let nuevaTarea = new Task(nombre, descripcion, estado, prioridad, id++);
    actualizarTareas(nuevaTarea);
    tareas.push(nuevaTarea);
    console.log("Se añade nueva tarea, con id: " + id);
});;

document.getElementById("ocultarGeneral").addEventListener('click', (e) => {
    ocultar("general");
});
document.getElementById("mostrarCreadas").style.display = "none";
document.getElementById("mostrarCreadas").addEventListener('click', (e) => {
    mostrar("general");
});

document.getElementById("ocultarDeleted").addEventListener('click', (e) => {
    ocultar("deleted");
});
document.getElementById("mostrarEliminadas").style.display = "none";
document.getElementById("mostrarEliminadas").addEventListener('click', (e) => {
    mostrar("deleted");
});

const nombreBotones = ["ToDo", "Doing", "Done"];
nombreBotones.forEach(nombre => {
    document.getElementById("vaciar" + nombre).addEventListener('click', (e) => {
        vaciarLista(nombre.toLowerCase());
    });    

    document.getElementById("ordenarAscendente" + nombre).addEventListener('click', (e) => {
        ordenarLista(nombre.toLowerCase(), true);
    });

    document.getElementById("ordenarDescendente" + nombre).addEventListener('click', (e) => {
        ordenarLista(nombre.toLowerCase(), false);
    });
});

/* 
    FUNCIONES
*/
function ordenarLista(lista, ascendente)
{
    /* 
        1º Crear una lista con la lista desordenada 
        2º Vaciar la lista en cuestión
        3º Ordenar la lista
        4º Volver a añadir las tareas a la lista

        Mirar método ordenación:
        https://stackoverflow.com/questions/7742305/changing-the-order-of-elements
    */

    if(lista !== "todo"){
        console.log("Estos no son los androides que buscais");
        return;
    }

    let listaDesordenada = listaToDo.getElementsByClassName("itemTarea");;
    let prioridad = obtenerPrioridad(listaDesordenada, 0);
    console.log(prioridad);
    /* 
        Probar si se puede cambiar la posición de los hijos para poder ordenarlos con lo del método burbuja
    */
    let hijoAux = listaDesordenada[0];
    listaDesordenada[0] = listaDesordenada[1];
    listaDesordenada[1] = hijoAux;
    console.log(listaDesordenada);

/*     for(let i = 0; i < listaDesordenada.length; i++)
    {
        for(let j = 0; j < listaDesordenada.length - i; j++)
        {
        }
    }
 */    
    /* 
    let eliminada = false;
    for(let i = 0; i < hijos.length; i++)
    {
        if(hijos[i].getAttribute("id") == tareaId)
        {
            listaGeneral.removeChild(hijos[i]);
            eliminada = true;
        }
    }

    if(ascendente)
        console.log("ToDo");
    else
        console.log("ToDo"); */
}

function obtenerPrioridad(hijos, nElemento)
{
    /* let hijos = lista.getElementsByClassName("itemTarea"); */
    
    let titulo = hijos[nElemento].getElementsByClassName("tituloTarea")[0].innerHTML;

    let indice;
    for (let i = titulo.length-1; i > 0; i--) {
        if(titulo[i] == "[")
        {
            indice = i;
            break;
        }
    }
    return titulo.substring(indice+1, titulo.length-1);
}

function ocultar(lista)
{
    if(lista == "general")
    {
        document.getElementById("listaGeneralContenedor").style.display = "none";
        document.getElementById("mostrarCreadas").style.display = "";
    }
    else
    {
        document.getElementById("listaDeletedContenedor").style.display = "none";
        document.getElementById("mostrarEliminadas").style.display = "";

    }
    console.log("Se oculta " + lista + " se muestra botón para desocultar");
}
function mostrar(lista)
{
    if(lista == "general")
    {
        document.getElementById("listaGeneralContenedor").style.display = "";
        document.getElementById("mostrarCreadas").style.display = "none";
    }
    else
    {
        document.getElementById("listaDeletedContenedor").style.display = "";
        document.getElementById("mostrarEliminadas").style.display = "none";
    }
    console.log("Se muestra " + lista + " se oculta botón para desocultar");
}

function actualizarTareas(tarea)
{
    let tareaItem = tareaTemplate.cloneNode(true);
    tareaItem.setAttribute('id', tarea.id);

    let tituloTarea = tareaItem.getElementsByClassName("tituloTarea");
    tituloTarea[0].innerHTML = tarea.name + " [" + tarea.priority + "]";
    
    let descripcionTarea = tareaItem.getElementsByClassName("textoTarea");
    descripcionTarea[0].innerHTML = tarea.description;

    let estadoTarea = tareaItem.getElementsByClassName("estadoTarea");
    estadoTarea[0].innerHTML = tarea.state;
    
    if(tarea.state === "todo"){
        estadoTarea[0].style.color = "yellow";
        listaToDo.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state === "doing") {
        estadoTarea[0].style.color = "blue";
        listaDoing.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state === "done") {    
        estadoTarea[0].style.color = "green";
        listaDone.appendChild(tareaItem.cloneNode(true));
    } else {// if(tarea.state == "deleted")
        estadoTarea[0].style.color = "red";
        listaDeleted.appendChild(tareaItem.cloneNode(true));
    }

    listaGeneral.appendChild(tareaItem.cloneNode(true));
    indice++;
    tareasNodos.push(tareaItem);
}

function eliminarTarea(tareaId)
{
    let hijos = listaGeneral.getElementsByClassName("itemTarea");
    
    let eliminada = false;
    for(let i = 0; i < hijos.length; i++)
    {
        if(hijos[i].getAttribute("id") == tareaId)
        {
            listaGeneral.removeChild(hijos[i]);
            eliminada = true;
        }
    }

    if(eliminada){
        console.log("Tarea con id " + tareaId + " ha sido eliminada");
    }else {
        console.log("No existe la tarea con id " + tareaId);
    }
}

function vaciarLista(lista)
{
    var confirmacion = confirm("Desea eliminar la lista " + lista);
    if(!confirmacion){
        return;
    }

    for (let indice = 0; indice < tareas.length; indice++) 
    {
        let tarea = tareas[indice];
        if(tareas[indice].state == lista)
        {
            tareas[indice].state = "deleted";
            let tareaActualizada = tareas[indice];
            eliminarTarea(tarea.id);
            actualizarTareas(tareaActualizada);

            console.log("Actualizada " + tareas[indice].name + " Estado: " + tareas[indice].state);
        }
    }

    if(lista == "todo"){
        listaToDo.innerHTML = "";
    } else if( lista == "doing") {
        listaDoing.innerHTML = "";
    } else if(lista == "done") {  
        listaDone.innerHTML = "";  
    } else if(lista == "deleted") {
        listaDeleted.innerHTML = "";
    } else {
        console.log("Lista no válida");
    }

    console.log("Lista " + lista + " vaciada");
}