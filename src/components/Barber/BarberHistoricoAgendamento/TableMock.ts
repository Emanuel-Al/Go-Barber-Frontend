import { Agendamento } from "@/interfaces/Agendamento";

export const mockAgendamentos: Agendamento[] = [
    {
      name: "João Silva",
      date: "14:00",
      price: 150,
      services: [
        { id: "1", name: "Corte de Cabelo", description: "Corte masculino", time: 30, value: 50 },
        { id: "2", name: "Barba", description: "Aparar e modelar a barba", time: 20, value: 30 }
      ]
    },
    {
      name: "Maria Souza",
      date: " 15:00",
      price: 200,
      services: [
        { id: "3", name: "Tintura", description: "Tintura capilar", time: 60, value: 100 },
      ]
    },
  ];