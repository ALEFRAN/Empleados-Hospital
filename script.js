let listaEmpleados = []

const objetoEmpleado = {
    id:'',
    nombre:'',
    puesto:''
}      

let editando = false;

const formulario = document.querySelector('#formulario')
const nombreInput = document.querySelector('#nombre')
const puestoInput = document.querySelector('#puesto')
const btnAgregar = document.querySelector('#btnAgregar')

formulario.addEventListener('submit', validarformulario)

function validarformulario(e) {
    e.preventDefault()

    if(nombreInput.value === '' || puestoInput.value === ''){
        alert('Llenar todos los campos')
        return
    }

    if(editando) {
        editarEmpleado()
        editando =  false
    }else{
        objetoEmpleado.id = Date.now()
        objetoEmpleado.nombre = nombreInput.value
        objetoEmpleado.puesto = puestoInput.value

        agregarEmpleado()
    }
}

function agregarEmpleado() {
    listaEmpleados.push({...objetoEmpleado});

    mostrarEmpleados()

    formulario.reset() 

    limpiarObjeto()
}

function limpiarObjeto() {
    objetoEmpleado.id = ''
    objetoEmpleado.nombre = ''
    objetoEmpleado.puesto = ''
}

function mostrarEmpleados() {

    limpiarHTML()

    const divEmpleados = document.querySelector('.div-empleados')

    listaEmpleados.forEach( empleado => {
        const {id, nombre, puesto} = empleado

        const parrafo = document.createElement('p')
        parrafo.textContent = `${id} - ${nombre} - ${puesto} -`
        parrafo.dataset.id = id

        const editarBoton = document.createElement('button')
        editarBoton.onclick = () => cargarEmpleado(empleado)
        editarBoton.textContent = 'Editar'
        editarBoton.classList.add('btn', 'btn-editar')
        parrafo.append(editarBoton)

        const eliminarBoton = document.createElement('button')
        eliminarBoton.onclick = () => eliminarEmpleado(id)
        eliminarBoton.textContent = 'Eliminar'
        eliminarBoton.classList.add('btn', 'btn-eliminar')
        parrafo.append(eliminarBoton)

        const hr = document.createElement('hr')

        divEmpleados.appendChild(parrafo)
        divEmpleados.appendChild(hr)
    })
}

function cargarEmpleado(empleado) {
    const {id, nombre, puesto} = empleado

    nombreInput.value = nombre
    puestoInput.value = puesto

    objetoEmpleado.id = id

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'

    editando = true
}

function editarEmpleado() {
    objetoEmpleado.nombre = nombreInput.value
    objetoEmpleado.puesto = puestoInput.value

    listaEmpleados.map( empleado =>{

        if(empleado.id === objetoEmpleado.id) {
            empleado.id = objetoEmpleado.id
            empleado.nombre = objetoEmpleado.nombre
            empleado.puesto = objetoEmpleado.puesto
        }
    })

    limpiarHTML()
    mostrarEmpleados()

    formulario.reset()

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar'

    editando = false
}

function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id)

    limpiarHTML()
    mostrarEmpleados()
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados')
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild)
    }
}