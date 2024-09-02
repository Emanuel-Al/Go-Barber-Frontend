import api from "../http-common";

export async function getAllBarberApointments(barberId: number){
    api.get(`/appointments/barber/${barberId}`);
}