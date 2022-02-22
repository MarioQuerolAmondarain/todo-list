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
/*

//ordenar()
var creadas = document.getElementById("creadas");
var haciendo = document.getElementById("haciendo");
var hechas = document.getElementById("hechas");
var eliminadas = document.getElementById("eliminadas");
var elemento

tareas.forEach(tarea => {
    elemento = "<dt>" + tarea["name"] +
            "<b>Descripción: </b>" + tarea["description"] + "</dd>" 
            "<b>Prioridad: </b>" + tarea["priority"] 
    + "</dt>"

    switch(tarea["state"])
    {
        case "created":
            creadas.innerHTML +=  elemento; 
            break;
        case "doing":
            haciendo.innerHTML +=  elemento;
            break;
        case "done":
            hechas.innerHTML +=  elemento;
            break;
        case "deleted":
            eliminadas.innerHTML +=  elemento;
            break;
        default:
            creadas.innerHTML +=  elemento;
            break;
    }
});
*/

function ordenar()
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
}

function actulizarColumna(columna)
{
    ordenar();
    switch(columna)
    {
        case "created":
            creadas.innerHTML = "uwu"; 
            break;
        case "doing":
            haciendo.innerHTML = "uwu"; 
            break;
        case "done":
            hechas.innerHTML = "uwu"; 
            break;
        case "deleted":
            eliminadas.innerHTML = "uwu"; 
            break;
        default:
            creadas.innerHTML = "uwu"; 
            break;
    }
}