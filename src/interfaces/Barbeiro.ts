import { Service } from './Service';

export interface Barbeiro {
  idBarber: string;
  name: string;
  email: string;
  cpf: string;
  address: number;
  salary: number;
  admissionDate: string;
  workload: number;
  services: Service[];
}
