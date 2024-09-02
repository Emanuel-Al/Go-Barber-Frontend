import { useEffect, useState } from "react";
import style from "./estoque.module.scss";
import { useMutation } from "react-query";
import Table from "./Table";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { getAllEstoqueByProductId } from "@/api/estoque/getAllEstoqueByProductId";
import { Estoque } from "@/interfaces/estoqueInterface";


interface ListaEstoqueProps {
  onSelectEstoque: (estoque: Estoque) => void;
  idProduct: string;
  onNovoEstoque: () => void;
}

const ListaEstoque: React.FC<ListaEstoqueProps> = ({ onSelectEstoque, onNovoEstoque, idProduct }) => {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [searchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { push } = useRouter();

  const { mutate } = useMutation(() => getAllEstoqueByProductId(currentPage, 3, idProduct), {
    onSuccess: (res) => {
      setEstoques(res.data.content || {});
      setTotalPages(res.data.totalPages);
    },
    onError: (error) => {
      console.error('Erro ao recuperar os estoques:', error);
    }
  });

  const filteredEstoques = estoques.filter((estoque) =>
    estoque?.batchNumber.includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    mutate();
  }, [currentPage]);

  return (
    <div>
      <div className={style.header}>
        <div className={style.header__container}>
          <div></div>
          <div className={style.header__container_title}>
            <h1>Estoques</h1>
          </div>
          <div className={style.header__container_botoes}>
            <button onClick={onNovoEstoque}>
              <h1>Novo Estoque</h1>
              <img src="/assets/icons/navalha.svg" alt="Navalha" />
            </button>
          </div>
        </div>
      </div>

      <Table
        listEstoques={filteredEstoques}
        setEstoques={setEstoques}
        onSelectEstoque={onSelectEstoque}
        table1="Compra"
        table2="Validade"
        table3="Quantidade"
        table5="Ações"
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ListaEstoque;
