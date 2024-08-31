import {Service} from "../interfaces/Service"

export interface Agendamento{
    id: string;
    name: string;
    date: string;
    price: number;
    services: Service[];
}