import { Paciente } from "./paciente";

export class SignosVitales {

    idSigno: number;
    fecha: string;
    temperatura: string;
    pulso: string;
    ritmoR: string;
    paciente: Paciente;

    // Adicionales para la tabla
    nombrePaciente: string;

    //detalleConsulta: DetalleConsulta[];
}