const formPaciente = document.getElementById("formPaciente");
const pacienteSelect = document.getElementById("pacienteSelect");
const btnAgregarPaciente = document.getElementById("btnAgregarPaciente");

// habilita/deshabilita el botón según la validez nativa del formulario
formPaciente.addEventListener("input", () => {
  btnAgregarPaciente.disabled = !formPaciente.checkValidity();
});
formPaciente.addEventListener("change", () => {
  btnAgregarPaciente.disabled = !formPaciente.checkValidity();
});

formPaciente.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validación completa de la capa de presentación
  if (!validarFormularioPaciente()) {
    return;
  }

  const nombres = document.getElementById("nombresPaciente").value;
  const apellidos = document.getElementById("apellidosPaciente").value;

  const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
  const genero = generoSeleccionado ? generoSeleccionado.value : null;

  const paciente = gestionarPacientes.registrarPaciente(nombres, apellidos, genero);
  console.log("Paciente registrado:", paciente);
  // actualizar select
  const option = document.createElement("option");
  option.value = paciente.id;
  option.textContent = `${paciente.nombres} ${paciente.apellidos}`;
  pacienteSelect.appendChild(option);

  formPaciente.reset();
  btnAgregarPaciente.disabled = true;

  mostrarNotificacion(`Paciente ${paciente.nombres} ${paciente.apellidos} registrado con éxito`);
});