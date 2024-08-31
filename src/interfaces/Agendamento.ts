import {Service} from "../interfaces/Service"

export interface Agendamento{
    name: string;
    date: string;
    price: number;
    services: Service[];
}