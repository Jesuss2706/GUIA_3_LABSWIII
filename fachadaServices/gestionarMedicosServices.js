class GestionarMedicos {
  constructor(repoMedico) {
    this.repoMedico = repoMedico;
  }

  registrarMedico(nombre, apellido, especialidad, horarioAtencion, aniosExperiencia, bibliografia) {
    const id = this.repoMedico.siguienteId();
    const medico = new Medico(id, nombre, apellido, especialidad, horarioAtencion, aniosExperiencia, bibliografia);
    this.repoMedico.agregar(medico);
    return medico;
  }

  listarMedicos() {
  return this.repoMedico.obtenerTodos();
  }

  buscarMedico(id) {
    return this.repoMedico.buscarPorId(id);
  }
}

const gestionarMedicos = new GestionarMedicos(medicoRepo);