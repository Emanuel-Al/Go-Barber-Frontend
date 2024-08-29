import api from "@/api/http-common";

export async function getAddressById(id: string) {
    return await api.get(`/address/${id}`);
}