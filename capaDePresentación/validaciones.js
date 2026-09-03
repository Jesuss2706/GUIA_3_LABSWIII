function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarNumero(campo, errorElement, mensaje) {
    if (!/^\d+$/.test(campo.value)) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarHoraInicioFin(horaInicio, horaFin, errorElement, mensaje) {
    const [inicioHoras, inicioMinutos] = horaInicio.value.split(':').map(Number);
    const [finHoras, finMinutos] = horaFin.value.split(':').map(Number);

    const inicioTotal = inicioHoras * 60 + inicioMinutos;
    const finTotal = finHoras * 60 + finMinutos;

    if (inicioTotal >= finTotal) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(genero, errorElement, mensaje) {
    let seleccionado = false;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function mostrarMensajeExito() {
    Toastify({
        text: "✅ ¡Registro exitoso!",
        duration: 3000,            // Duración: 3 segundos
        gravity: "top",             // Posición: arriba
        position: "right",          // Alineación: derecha
        style: {
            background: "rgba(0, 128, 0, 0.8)",  // Verde con transparencia
            color: "#fff",                      // Texto blanco
            borderRadius: "12px",               // Esquinas redondeadas
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Sombra ligera
            padding: "12px 20px"               // Más relleno
        },
        stopOnFocus: true, // No desaparecer al pasar el mouse
    }).showToast();
}

//Funcion para validar el formulario de Medico
function validarFormularioMedico() {
    const nombre = document.getElementById('nombresMedico');
    const apellido = document.getElementById('apellidoMedico');
    const especialidad = document.getElementById('especialidadMedico');
    const horarioInicio = document.getElementById('horarioInicioMedico');
    const horarioFin = document.getElementById('horarioFinMedico');
    const aniosExperiencia = document.getElementById('aniosExperienciaMedico');
    const bibliografia = document.getElementById('bibliografiaMedico');

    const labelErrorNombreMedico = document.getElementById('nombreMedicoError');
    const labelErrorApellidoMedico = document.getElementById('apellidoMedicoError');
    const labelErrorEspecialidadMedico = document.getElementById('especialidadMedicoError');
    const labelErrorHorarioInicioMedico = document.getElementById('horarioInicioMedicoError');
    const labelErrorHorarioFinMedico = document.getElementById('horarioFinMedicoError');
    const labelErrorAniosExperienciaMedico = document.getElementById('aniosExperienciaMedicoError');
    const labelErrorBibliografiaMedico = document.getElementById('bibliografiaMedicoError');

    const nombresValido = validarCampoObligatorio(nombre, labelErrorNombreMedico, '¡Debe ingresar su nombre!');
    const apellidosValido = validarCampoObligatorio(apellido, labelErrorApellidoMedico, '¡Debe ingresar su apellido!');
    const especialidadValido = validarCampoObligatorio(especialidad, labelErrorEspecialidadMedico, '¡Debe seleccionar su especialidad!');
    const horarioInicioValido = validarCampoObligatorio(horarioInicio, labelErrorHorarioInicioMedico, '¡Debe ingresar su horario de inicio!');
    const horarioFinValido = validarCampoObligatorio(horarioFin, labelErrorHorarioFinMedico, '¡Debe ingresar su horario de fin!');
    const horariosValido = validarHoraInicioFin(horarioInicio, horarioFin, labelErrorHorarioFinMedico, '¡La hora de inicio no puede ser mayor a la hora de fin!');
    const aniosExperienciaValido = validarNumero(aniosExperiencia, labelErrorAniosExperienciaMedico, '¡Debe ingresar un número de años!');
    const bibliografiaValido = validarLongitud(bibliografia, labelErrorBibliografiaMedico, 1, 2, '¡Ingrese un número de años!');

    if (nombresValido && apellidosValido && especialidadValido && horarioInicioValido && horarioFinValido && horariosValido && aniosExperienciaValido && bibliografiaValido) {
        mostrarMensajeExito();
        const formulario = document.getElementById('formMedico');
        formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            formulario.reset();
        }, 2000);
        return false;
    } else {
        alert("Error en el formulario de medico");
        return true;
    }
}

function validarFormularioPaciente() {
    const nombres = document.getElementById('nombresPaciente');
    const apellidos = document.getElementById('apellidosPaciente');

    const labelErrorNombrePaciente = document.getElementById('nombresPacienteError');
    const labelErrorApellidosPaciente = document.getElementById('apellidosPacienteError');

    const nombresValido = validarCampoObligatorio(nombres, labelErrorNombrePaciente, '¡Debe ingresar su nombre!');
    const apellidosValido = validarCampoObligatorio(apellidos, labelErrorApellidosPaciente, '¡Debe ingresar su apellido!');

    if (nombresValido && apellidosValido) {
        mostrarMensajeExito();
        const formulario = document.getElementById('formPaciente');
        formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            formulario.reset();
        }, 2000);
        return false;
    } else {
        alert("Error en el formulario de paciente");
        return true;
    }
}

function validarFormularioCita() {
    const fecha = document.getElementById('fecha');
    const horaInicio = document.getElementById('horaInicio');
    const horaFin = document.getElementById('horaFin');

    const medicoSelect = document.getElementById('medicoSelect');
    const pacienteSelect = document.getElementById('pacienteSelect');

    const labelErrorFecha = document.getElementById('fechaError');
    const labelErrorHoraInicio = document.getElementById('horaInicioError');
    const labelErrorHoraFin = document.getElementById('horaFinError');
    const labelErrorMedico = document.getElementById('medicoError');
    const labelErrorPaciente = document.getElementById('pacienteError');

    const fechaValido = validarLongitud(fecha, labelErrorFecha, 10, 10, '¡Ingrese una fecha válida!');
    const horaInicioValido = validarLongitud(horaInicio, labelErrorHoraInicio, 5, 5, '¡Ingrese una hora válida!');
    const horaFinValido = validarLongitud(horaFin, labelErrorHoraFin, 5, 5, '¡Ingrese una hora válida!');
    const medicoValido = validarLongitud(medicoSelect, labelErrorMedico, 1, 1, '¡Debe seleccionar un medico!');
    const pacienteValido = validarLongitud(pacienteSelect, labelErrorPaciente, 1, 1, '¡Debe seleccionar un paciente!');

    if (fechaValido && horaInicioValido && horaFinValido && medicoValido && pacienteValido) {
        mostrarMensajeExito();
        const formulario = document.getElementById('formCitas');
        formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            formulario.reset();
        }, 2000);
        return false;
    } else {
        alert("Error en el formulario de cita");
        return true;
    }
    
}

function validarcamposAlCambiarFocoMedico() {
    const nombresMedico = document.getElementById('nombresMedico');
    const apellidosMedico = document.getElementById('apellidosMedico');
    const especialidadMedico = document.getElementById('especialidadMedico');
    const horarioInicioMedico = document.getElementById('horarioInicioMedico')
    const horarioFinMedico = document.getElementById('horarioFinMedico')
    const aniosExperienciaMedico = document.getElementById('aniosExperienciaMedico');
    const bibliografiaMedico = document.getElementById('bibliografiaMedico');

    const labelErrorNombreMedico = document.getElementById('nombreMedicoError');
    const labelErrorApellidoMedico = document.getElementById('apellidoMedicoError');
    const labelErrorEspecialidadMedico = document.getElementById('especialidadMedicoError');
    const labelErrorHoraInicioMedico = document.getElementById('horarioInicioMedicoError');
    const labelErrorHoraFinMedico = document.getElementById('horarioFinMedicoError');
    const labelErrorAniosExperienciaMedico = document.getElementById('aniosExperienciaMedicoError');
    const labelErrorBibliografiaMedico = document.getElementById('bibliografiaMedicoError');

    nombresMedico.addEventListener("blur", () => validarCampoObligatorio(nombresMedico, labelErrorNombreMedico, '¡Debe ingresar su nombre!'));
    apellidosMedico.addEventListener("blur", () => validarCampoObligatorio(apellidosMedico, labelErrorApellidoMedico, '¡Debe ingresar su apellido!'));
    horarioInicioMedico.addEventListener("blur", () => validarHoraInicioFin(horarioInicioMedico, horarioFinMedico, labelErrorHoraInicioMedico, '¡La hora de inicio no puede ser mayor a la hora de fin!'));
    horarioFinMedico.addEventListener("blur", () => validarHoraInicioFin(horarioInicioMedico, horarioFinMedico, labelErrorHoraFinMedico, '¡La hora de inicio no puede ser mayor a la hora de fin!'));
    especialidadMedico.addEventListener("blur", () => validarCampoObligatorio(especialidadMedico, labelErrorEspecialidadMedico, '¡Debe seleccionar su especialidad!'));
    horaInicio.addEventListener("blur", () => validarHoraInicioFin(horaInicio, horaFin, labelErrorHoraInicio, '¡La hora de inicio no puede ser mayor a la hora de fin!'));
    
    aniosExperienciaMedico.addEventListener("blur", () => validarNumero(aniosExperienciaMedico, labelErrorAniosExperienciaMedico, '¡Debe ingresar un número de años!'));
    bibliografiaMedico.addEventListener("blur", () => validarCampoObligatorio(bibliografiaMedico, labelErrorBibliografiaMedico, '¡Debe ingresar su bibliografía!'));
}

function validarcamposAlCambiarFocoPaciente() {
    const nombresPaciente = document.getElementById('nombresPaciente');
    const apellidosPaciente = document.getElementById('apellidosPaciente');

    const labelErrorNombrePaciente = document.getElementById('nombresPacienteError');
    const labelErrorApellidosPaciente = document.getElementById('apellidosPacienteError');

    nombresPaciente.addEventListener("blur", () => validarCampoObligatorio(nombresPaciente, labelErrorNombrePaciente, '¡Debe ingresar su nombre!'));
    apellidosPaciente.addEventListener("blur", () => validarCampoObligatorio(apellidosPaciente, labelErrorApellidosPaciente, '¡Debe ingresar su apellido!'));
}

function validarcamposAlCambiarFocoCita() {
    const fecha = document.getElementById('fecha');
    const horaInicio = document.getElementById('horaInicio');
    const horaFin = document.getElementById('horaFin');

    const medicoSelect = document.getElementById('medicoSelect');
    const pacienteSelect = document.getElementById('pacienteSelect');

    const labelErrorFecha = document.getElementById('fechaError');
    const labelErrorHoraInicio = document.getElementById('horaInicioError');
    const labelErrorHoraFin = document.getElementById('horaFinError');
    const labelErrorMedico = document.getElementById('medicoError');
    const labelErrorPaciente = document.getElementById('pacienteError');

    fecha.addEventListener("blur", () => validarLongitud(fecha, labelErrorFecha, 10, 10, '¡Ingrese una fecha válida!'));
    horaInicio.addEventListener("blur", () => validarHoraInicioFin(horaInicio, horaFin, labelErrorHoraInicio, '¡La hora de inicio no puede ser mayor a la hora de fin!'));
    horaFin.addEventListener("blur", () => validarHoraInicioFin(horaInicio, horaFin, labelErrorHoraFin, '¡La hora de inicio no puede ser mayor a la hora de fin!'));
    medicoSelect.addEventListener("blur", () => validarLongitud(medicoSelect, labelErrorMedico, 1, 1, '¡Debe seleccionar un medico!'));
    pacienteSelect.addEventListener("blur", () => validarLongitud(pacienteSelect, labelErrorPaciente, 1, 1, '¡Debe seleccionar un paciente!'));
}

document.addEventListener("DOMContentLoaded", validarcamposAlCambiarFocoMedico);
document.addEventListener("DOMContentLoaded", validarcamposAlCambiarFocoPaciente);
document.addEventListener("DOMContentLoaded", validarcamposAlCambiarFocoCita);