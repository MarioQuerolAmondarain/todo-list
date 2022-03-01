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
    if(ascendente)
        console.log("ToDo");
    else
        console.log("ToDo");
}
function ocultar(lista)
{
    if(lista == "general")
    {
        document.getElementById("listaGeneralContenedor").style.display = "none";
        document.getElementById("mostrarCreadas").style.display = "";
        console.log(lista + " dice: Ocultar uwu");
    }
    else
    {
        document.getElementById("listaDeletedContenedor").style.display = "none";
        document.getElementById("mostrarEliminadas").style.display = "";
    }
    console.log("Se oculta " + lista);
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
    console.log("Se muestra " + lista);
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
        listaToDo.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state === "doing") {
        listaDoing.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state === "done") {    
        listaDone.appendChild(tareaItem.cloneNode(true));
    } else {// if(tarea.state == "deleted")
        listaDeleted.appendChild(tareaItem.cloneNode(true));
    }

    listaGeneral.appendChild(tareaItem.cloneNode(true));
    indice++;
    tareasNodos.push(tareaItem);
}

function prueba()
{
    let hijoEliminar = 0;
    let hijos = listaGeneral.getElementsByClassName("itemTarea");
    
    for(let i = 0; i < hijos.length; i++)
    {
        console.log(hijos[i].getAttribute("id"));
    }
    listaGeneral.removeChild(hijos[4]);

    //console.log(hijos[0].attributes.id);
}

function vaciarLista(lista)
{
    /* 
        Modificar la forma en la que se vacia la lista, clonar el nodo en las lista de deleted
        y luego borrar el nodo el la lista general

        Asignar a cada nodo un id para luego coger el nodo padre y poder borrar el nodo con el id 
        que queramos https://www.w3schools.com/jsref/met_node_removechild.asp
            const element = document.getElementById("myLI");
            element.parentNode.removeChild(element);
    */
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
            actualizarTareas(tareaActualizada);
            
            //listaGeneral.removeChild(tareas[indice]);

            console.log("Actualizada " + tareas[indice].name + " Estado: " + tareas[indice].state);
        }
    }
    actualizarListas();
    console.log("Lista " + lista + " vaciada");
}

function actualizarListas()
{
    while(listaGeneral.firstChild) 
    {
        listaGeneral.removeChild(listaGeneral.firstChild);
    }

    while(listaToDo.firstChild) 
    {
        listaToDo.removeChild(listaToDo.firstChild);
    }
    
    while(listaDoing.firstChild) 
    {
        listaDoing.removeChild(listaDoing.firstChild);
    }
    
    while(listaDone.firstChild) 
    {
        listaDone.removeChild(listaDone.firstChild);
    }
    
    while(listaDeleted.firstChild) 
    {
        listaDeleted.removeChild(listaDeleted.firstChild);
    }

    tareas.forEach(tarea => {
        actualizarTareas(tarea);
    });
}