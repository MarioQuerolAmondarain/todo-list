const tareas = [];
const estados = ["todo", "doing", "done", "deleted"];

let indice = 0;
for (let index = 0; index < 8; index++) 
{
    id = index;
    tareas.push(new Task("Tarea " + index, "Descripcion", estados[indice], Math.round(Math.random() * 10)));
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

listaGeneral.removeChild(listaGeneral.firstChild);
tareas.forEach(tarea => {
    actualizarTareas(tarea);
});
listaGeneral.removeChild(listaGeneral.firstChild);

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

document.getElementById("vaciarToDo").addEventListener('click', (e) => {
    vaciarLista("todo");
});
document.getElementById("vaciarDoing").addEventListener('click', (e) => {
    vaciarLista("doing");
});
document.getElementById("vaciarDone").addEventListener('click', (e) => {
    vaciarLista("done");
});

document.getElementById("ordenarAscendenteToDo").addEventListener('click', (e) => {
    ordenarLista("todo", true);
});


/* 
    FUNCIONES
*/
ordenarLista(lista, ascendente)
{
    
}

function actualizarTareas(tarea)
{
    let tareaItem = tareaTemplate.cloneNode(true);
    tareaItem.setAttribute('id', "");

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