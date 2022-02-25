/*
    FORMATO ITEM TODO
    <div>
        <h3>Tarea</h3>
        <ul>
            <li>Descripción: </li>
            <li>Prioridad: </li>
        </ul>
    </div>

const tareas = [
    {
        "name": "Task 1",
        "description": "Example task",
        "priority": 6,
        "state" : "created"
    },
    {
        "name": "Task 1.2",
        "description": "Example task",
        "priority": 3,
        "state" : "created"
    },
    {
        "name": "Task 2",
        "description": "Example task",
        "priority": 0,
        "state" : "doing"
    },
    {
        "name": "Task 2.1",
        "description": "Example task",
        "priority": 1,
        "state" : "doing"
    },
    {
        "name": "Task 3",
        "description": "Example task",
        "priority": 5,
        "state" : "done"
    },
    {
        "name": "Task 4",
        "description": "Example task",
        "priority": 3,
        "state" : "deleted"
    },
    {
        "name": "Task 4.2",
        "description": "Example task",
        "priority": 2,
        "state" : "deleted"
    }
];


var contendorCreadas = document.getElementById("contenedorTareasCreadas");
var contenedorHaciendo = document.getElementById("contenedorTareasHaciendo");
var contenedorHechas = document.getElementById("contenedorTareasHechas");
var contenedorEliminadas = document.getElementById("contenedorTareasEliminadas");

actualizarTablas();
function ordenarCreadas()
{
    for (let i = 0; i < tareas.length ; i++)
    {
        for (let j = 0; j < i ; j++) 
        {
            if(tareas[j]["priority"] > tareas[j+1]["priority"])
            {
                aux = tareas[j];
                tareas[j] = tareas[j+1];
                tareas[j+1] = aux;
            }
        }
    }
    actualizarTablas();
}


function ordenar(contedor)
{
    for (let i = 0; i < contedor.length ; i++)
    {
        for (let j = 0; j < i ; j++) 
        {
            if(contedor[j]["priority"] > contedor[j+1]["priority"])
            {
                aux = contedor[j];
                contedor[j] = contedor[j+1];
                contedor[j+1] = aux;
            }
        }   
    }
    actualizarTablas();
}

function actualizarTablas()
{
    contendorCreadas.innerHTML = "";
    contenedorHaciendo.innerHTML = "";
    contenedorHechas.innerHTML = "";
    contenedorEliminadas.innerHTML = "";
    
    tareas.forEach(tarea => 
    {
        elemento = "<div class=\"tarea\">" + 
        "<h3>" + tarea["name"] + "</h3>" + "<ul>" +
            "<li>Descripción: " + tarea["description"] + "</li>" +
            "<li>Prioridad: " + tarea["priority"] + "</li>" +
        "</ul></div>";

        switch(tarea["state"])
        {
            case "created":
                contendorCreadas.innerHTML += elemento;
                break;
            case "doing":
                contenedorHaciendo.innerHTML += elemento;
                break;
            case "done":
                contenedorHechas.innerHTML += elemento;
                break;
            case "deleted":
                contenedorEliminadas.innerHTML += elemento;
                break;
        }
    });
}
*/