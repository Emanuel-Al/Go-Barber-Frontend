"use client";

import { Agendamento } from "@/interfaces/agendamentoInterface";
import style from "./table.module.scss";

interface TableProps {
  table1: string; // nome cliente
  table2: string; // horario agendado
  table3: string; // ação
  listAgendamentos: Agendamento[];
  setAgendamentos: (agendamentos: Agendamento[]) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onSelectAgendamento: (agendamento: Agendamento) => void;
}
const AgendamentoTable: React.FC<TableProps> = ({
  table1,
  table2,
  table3,
  listAgendamentos,
  currentPage,
  totalPages,
  setCurrentPage,
  onSelectAgendamento,
}) => {
  // const handleDeletePromocao = async (id: string) => {
  //    await deletePromocao(id);
  //   setPromocoes(listPromocoes.filter(promocao => promocao.coupon !== id));
  // };

  return (
    <>
      <div className={style.content}>
        <table className={style.content__table}>
          <thead className={style.content__table__header}>
            <tr>
              <th>{table1}</th>
              <th>{table2}</th>
              <th className={style.content__table__header_name3}>
                <div>
                  {table3}
                  <img src="/assets/icons/informacao.svg" alt="Visualizar" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className={style.content__table__body}>
            {listAgendamentos.map((agendamento, index) => (
              <tr key={index}>
                <td>{agendamento.clientName}</td>
                <td>{agendamento.startTime}</td>
                <td>
                  <button
                    onClick={() => onSelectAgendamento(agendamento)}
                    className={style.content__table__body_click}
                  >
                    <img src="/assets/icons/visualizar.svg" alt="Visualizar" />
                  </button>
                  <button>
                    <img
                      src="/assets/icons/excluir.svg"
                      alt="excluir"
                      className={style.content__table__body_click}
                    />
                  </button>
                </td>
              </tr>
            ))}
            {/* Pagination Controls */}
          </tbody>
        </table>
        <div className={style.content__table__pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AgendamentoTable;
