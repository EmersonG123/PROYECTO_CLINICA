
export enum UserRole {
  PACIENTE = 'Paciente',
  MEDICO = 'Médico',
  RECEPCION = 'Recepción',
  CAJA = 'Caja',
  ENFERMERO = 'Enfermero',
  ADMIN = 'Admin',
  LABORATORIO = 'Laboratorio'
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  cmp: string;
  image: string;
  badge?: string;
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
