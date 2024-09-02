// Importação do modal
import ConfirmationModal from "../BotaoConfirmar";
import style from "./table.module.scss";
import React, { useState } from 'react';
import { postNotificarPromocao } from "@/api/promocoes/postNotificarPromocao";
import { deletePromocao } from "@/api/promocoes/deletePromocao";
import ConfirmationPromocaoModal from "../ExcluirPromocao";
import { Promocao } from "@/interfaces/promocaoInterface";

interface TableProps {
  table1: string;
  table2: string;
  table3: string;
  table4: string;
  table5: string;
  listPromocoes: Promocao[];
  setPromocoes: (promocoes: Promocao[]) => void; 
  onSelectPromocao: (promocao: Promocao) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}



const Table: React.FC<TableProps> = ({ 
  listPromocoes,  
  onSelectPromocao, 
  table1, 
  table2, 
  table3, 
  table4, 
  table5, 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPromocao, setSelectedPromocao] = useState<Promocao | null>(null);
  const [selectedPromocaoId, setSelectedPromocaoId] = useState<string | null>(null);
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);


  const handleClose = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleOpenModal = (promocao: Promocao) => {
    setSelectedPromocao(promocao);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedPromocao) {
      try {
        // Enviar a promoção usando a função postNotificarPromocao
        const response = await postNotificarPromocao(selectedPromocao.id);
  
        if (response.status === 202) {
          console.log(`Promoção enviada com sucesso: ${selectedPromocao.name}`);
        } else {
          console.error('Falha ao enviar a promoção. Status:', response.status);
          console.error('Detalhes da resposta:', response.data);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  
    handleClose();
  };

  const openDeleteModal = (id: string) => {
    setSelectedPromocaoId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedPromocaoId(null);
    handleClose();
  };

  const handleConfirmDelete = async () => {
    if (selectedPromocaoId) {
      try {
        await deletePromocao(selectedPromocaoId);  // Adicione a lógica de exclusão
        // Atualize a lista de promoções usando setPromocoes
        setPromocoes(listPromocoes.filter(promocao => promocao.id !== selectedPromocaoId));
      } catch (error) {
        console.error('Erro ao excluir a promoção:', error);
      }
      closeDeleteModal();
    }
  };
  

  return (
    <>
      <div className={style.content}>
        <table className={style.content__table}>
          <thead className={style.content__table__header}>
            <tr>
              <th>{table1}</th>
              <th>{table2}</th>
              <th>{table3}</th>
              <th>{table4}</th>
              <th className={style.content__table__header_name3}>
                <div>
                  {table5}
                  <img src="/assets/icons/informacao.svg" alt="Visualizar" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className={style.content__table__body}>
            {listPromocoes.map((promocao, index) => (
              <tr key={index}>
                <td>{promocao.name}</td>
                <td>{promocao.totalPrice}</td>
                <td>{promocao.startDate}</td>
                <td>{promocao.endDate}</td>
                <td>
                  <button 
                    onClick={() => onSelectPromocao(promocao)} 
                    className={style.content__table__body_click}
                  >
                    <img 
                      src="/assets/icons/visualizar.svg" 
                      alt="Visualizar" 
                    />
                  </button>
                  <button 
                    onClick={() => handleOpenModal(promocao)} 
                    className={style.content__table__body_click}
                  >
                    <img 
                      src="/assets/icons/enviar.svg" 
                      alt="Enviar" 
                    />
                  </button>
                  <button 
                    onClick={() => openDeleteModal(promocao.id)} 
                    className={style.content__table__body_click}
                  >
                    <img 
                      src="/assets/icons/excluir.svg" 
                      alt="Excluir" 
                    />
                  </button>
                </td>
              </tr>
            ))}
            {/* Pagination Controls */}
          </tbody>
        </table>
        <div className={style.content__table__pagination}>
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
            Previous
          </button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>
            Next
          </button>
        </div>
      </div>
      {selectedPromocao && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          promocaoName={selectedPromocao.name}  // Para o envio
        />
      )}
      {selectedPromocaoId && (
        <ConfirmationPromocaoModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          promocaoId={selectedPromocaoId}  // Para a exclusão
        />
      )}
    </>
  );
};

export default Table;
