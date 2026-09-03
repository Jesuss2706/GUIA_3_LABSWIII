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

// NUEVO: valida que un número esté dentro de un rango razonable (ej. años de experiencia)
function validarRangoNumerico(campo, errorElement, min, max, mensaje) {
    const valor = Number(campo.value);
    if (!/^\d+$/.test(campo.value) || valor < min || valor > max) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarHoraInicioFin(horaInicio, horaFin, errorElement, mensaje) {
    if (!horaInicio.value || !horaFin.value) {
        // si algún campo está vacío, esta validación no aplica; la de "obligatorio" ya se encarga
        return true;
    }

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

// NUEVO: valida que la fecha ingresada no sea anterior a hoy
function validarFechaNoPasada(campoFecha, errorElement, mensaje) {
    if (!campoFecha.value) return true; // lo cubre validarCampoObligatorio

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(campoFecha.value + 'T00:00:00');

    if (fechaSeleccionada < hoy) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(radiosGenero, errorElement, mensaje) {
    let seleccionado = false;
    for (let i = 0; i < radiosGenero.length; i++) {
        if (radiosGenero[i].checked) {
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
    mostrarNotificacion(`✅ ${mensaje}`, "exito");
}



function validarFormularioMedico() {
    const nombre = document.getElementById('nombresMedico');
    const apellido = document.getElementById('apellidosMedico');
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
    const especialidadValido = validarCampoObligatorio(especialidad, labelErrorEspecialidadMedico, '¡Debe seleccionar una especialidad!');
    const horarioInicioValido = validarCampoObligatorio(horarioInicio, labelErrorHorarioInicioMedico, '¡Debe ingresar su horario de inicio!');
    const horarioFinValido = validarCampoObligatorio(horarioFin, labelErrorHorarioFinMedico, '¡Debe ingresar su horario de fin!');
    const horariosValido = validarHoraInicioFin(horarioInicio, horarioFin, labelErrorHorarioFinMedico, '¡La hora de inicio no puede ser mayor o igual a la hora de fin!');
    const aniosExperienciaValido = validarRangoNumerico(aniosExperiencia, labelErrorAniosExperienciaMedico, 0, 60, '¡Ingrese un número de años válido (0-60)!');
    const bibliografiaValido = validarLongitud(bibliografia, labelErrorBibliografiaMedico, 10, 500, '¡La bibliografía debe tener entre 10 y 500 caracteres!');

    return nombresValido && apellidosValido && especialidadValido && horarioInicioValido &&
        horarioFinValido && horariosValido && aniosExperienciaValido && bibliografiaValido;
}

function validarFormularioPaciente() {
    const nombres = document.getElementById('nombresPaciente');
    const apellidos = document.getElementById('apellidosPaciente');
    const radiosGenero = document.getElementsByName('genero');

    const labelErrorNombrePaciente = document.getElementById('nombresPacienteError');
    const labelErrorApellidosPaciente = document.getElementById('apellidosPacienteError');
    const labelErrorGenero = document.getElementById('errorGenero');

    const nombresValido = validarCampoObligatorio(nombres, labelErrorNombrePaciente, '¡Debe ingresar su nombre!');
    const apellidosValido = validarCampoObligatorio(apellidos, labelErrorApellidosPaciente, '¡Debe ingresar su apellido!');
    const generoValido = validarGenero(radiosGenero, labelErrorGenero, '¡Debe seleccionar un género!');

    return nombresValido && apellidosValido && generoValido;
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

    const fechaValida = validarCampoObligatorio(fecha, labelErrorFecha, '¡Debe ingresar una fecha!');
    const fechaNoPasadaValida = validarFechaNoPasada(fecha, labelErrorFecha, '¡La fecha no puede ser anterior a hoy!');
    const horaInicioValida = validarCampoObligatorio(horaInicio, labelErrorHoraInicio, '¡Debe ingresar la hora de inicio!');
    const horaFinValida = validarCampoObligatorio(horaFin, labelErrorHoraFin, '¡Debe ingresar la hora de fin!');
    const horariosValidos = validarHoraInicioFin(horaInicio, horaFin, labelErrorHoraFin, '¡La hora de inicio no puede ser mayor o igual a la hora de fin!');
    const medicoValido = validarCampoObligatorio(medicoSelect, labelErrorMedico, '¡Debe seleccionar un médico!');
    const pacienteValido = validarCampoObligatorio(pacienteSelect, labelErrorPaciente, '¡Debe seleccionar un paciente!');

    return fechaValida && fechaNoPasadaValida && horaInicioValida && horaFinValida &&
        horariosValidos && medicoValido && pacienteValido;
}

function validarcamposAlCambiarFocoMedico() {
    const nombresMedico = document.getElementById('nombresMedico');
    const apellidosMedico = document.getElementById('apellidosMedico');
    const especialidadMedico = document.getElementById('especialidadMedico');
    const horarioInicioMedico = document.getElementById('horarioInicioMedico');
    const horarioFinMedico = document.getElementById('horarioFinMedico');
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
    especialidadMedico.addEventListener("change", () => validarCampoObligatorio(especialidadMedico, labelErrorEspecialidadMedico, '¡Debe seleccionar una especialidad!'));
    horarioInicioMedico.addEventListener("blur", () => validarHoraInicioFin(horarioInicioMedico, horarioFinMedico, labelErrorHoraInicioMedico, '¡La hora de inicio no puede ser mayor o igual a la hora de fin!'));
    horarioFinMedico.addEventListener("blur", () => validarHoraInicioFin(horarioInicioMedico, horarioFinMedico, labelErrorHoraFinMedico, '¡La hora de inicio no puede ser mayor o igual a la hora de fin!'));
    aniosExperienciaMedico.addEventListener("blur", () => validarRangoNumerico(aniosExperienciaMedico, labelErrorAniosExperienciaMedico, 0, 60, '¡Ingrese un número de años válido (0-60)!'));
    bibliografiaMedico.addEventListener("blur", () => validarLongitud(bibliografiaMedico, labelErrorBibliografiaMedico, 10, 500, '¡La bibliografía debe tener entre 10 y 500 caracteres!'));
}

function validarcamposAlCambiarFocoPaciente() {
    const nombresPaciente = document.getElementById('nombresPaciente');
    const apellidosPaciente = document.getElementById('apellidosPaciente');
    const radiosGenero = document.getElementsByName('genero');

    const labelErrorNombrePaciente = document.getElementById('nombresPacienteError');
    const labelErrorApellidosPaciente = document.getElementById('apellidosPacienteError');
    const labelErrorGenero = document.getElementById('errorGenero');

    nombresPaciente.addEventListener("blur", () => validarCampoObligatorio(nombresPaciente, labelErrorNombrePaciente, '¡Debe ingresar su nombre!'));
    apellidosPaciente.addEventListener("blur", () => validarCampoObligatorio(apellidosPaciente, labelErrorApellidosPaciente, '¡Debe ingresar su apellido!'));
    radiosGenero.forEach(radio => radio.addEventListener("change", () => validarGenero(radiosGenero, labelErrorGenero, '¡Debe seleccionar un género!')));
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

    fecha.addEventListener("blur", () => {
        validarCampoObligatorio(fecha, labelErrorFecha, '¡Debe ingresar una fecha!');
        validarFechaNoPasada(fecha, labelErrorFecha, '¡La fecha no puede ser anterior a hoy!');
    });
    horaInicio.addEventListener("blur", () => validarHoraInicioFin(horaInicio, horaFin, labelErrorHoraInicio, '¡La hora de inicio no puede ser mayor o igual a la hora de fin!'));
    horaFin.addEventListener("blur", () => validarHoraInicioFin(horaInicio, horaFin, labelErrorHoraFin, '¡La hora de inicio no puede ser mayor o igual a la hora de fin!'));
    medicoSelect.addEventListener("change", () => validarCampoObligatorio(medicoSelect, labelErrorMedico, '¡Debe seleccionar un médico!'));
    pacienteSelect.addEventListener("change", () => validarCampoObligatorio(pacienteSelect, labelErrorPaciente, '¡Debe seleccionar un paciente!'));

    // No permitir seleccionar fechas anteriores a hoy desde el propio selector
    const hoy = new Date().toISOString().split('T')[0];
    fecha.min = hoy;
}

document.addEventListener("DOMContentLoaded", validarcamposAlCambiarFocoMedico);
document.addEventListener("DOMContentLoaded", validarcamposAlCambiarFocoPaciente);
document.addEventListener("DOMContentLoaded", validarcamposAlCambiarFocoCita);