import api from "@/api/http-common";

export async function getAtendimentoById(id: string | string[] | undefined) {
    return await api.get(`/appointments/${id}`);
}