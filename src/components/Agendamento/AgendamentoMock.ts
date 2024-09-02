// mockData.ts

import { Agendamento } from "@/interfaces/agendamentoInterface";
import { Service } from "@/interfaces/barbeiroInterface";

export const mockServicos: Service[] = [
  {
    id: 1,
    name: "Corte de cabelo",
    description: "Corte com máquina e tesoura",
    value: 30,
    time: 30
  }
];

export const mockAgendamentos: Agendamento[] = [
  {
    clientName: "João da Silva",
    clientNumber: "123456789",
    barber: {
      idBarber: '1',
      name: "Zé Tramontina",
      email: "barber@gobarber.com",
      cpf: "12345678910",
      address: {
        street: "Rua um",
        city: "Garanhuns",
        neighborhood: "Centro",
        number: 1,
        state: "PE"

      },
      salary: 100000,
      admissionDate: "2024-09-11",
      workload: 44,
      services: [
        {
          id: 1,
          name: "Corte de cabelo",
          description: "Corte com máquina e tesoura",
          value: 30,
          time: 30
        }
      ],
      contato: "987654321",
      idServices: [],
      password: "123",
      start: "08:00",
      end: "17:00"
    },
    serviceType: [
      {
        idService: 1,
        nameService: "Corte de cabelo",
        descriptionService: "Corte com máquina e tesoura",
        valueService: 30,
        timeService: {
          hour: 0,
          minute: 30,
          second: 0,
          nano: 0
        }
      }
    ],
    startTime: "2024-09-02T09:00:00Z",
    endTime: "2024-09-02T09:30:00Z"
  }, 
  
];

export const mockTotalAgendamentos = {
  totalElements: 105,
  totalPages: 11,
  page: 0,
  size: 10
};
