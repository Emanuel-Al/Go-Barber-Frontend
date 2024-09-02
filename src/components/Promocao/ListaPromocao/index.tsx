import { useEffect, useState } from "react";
import style from "./promocao.module.scss";
import { useMutation } from "react-query";
import Table from "./Table";
import { getAllPromocoes } from "@/api/promocoes/getAllPromocoes";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import DetalhamentoPromocao from "../DetalharPromocao";
import HeaderDetalhamento from "@/components/Header/HeaderDetalhamento";
import { Promocao } from "@/interfaces/promocaoInterface";


const ListaPromocoes = () => {
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [selectedPromocao, setSelectedPromocao] = useState<Promocao | null>(null);
  const [searchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { push } = useRouter();

  const { mutate } = useMutation(() => getAllPromocoes(currentPage, 3), {
    onSuccess: (res) => {
      setPromocoes(res.data.content);
      setTotalPages(res.data.totalPages);
    },
    onError: (error) => {
      console.error('Erro ao recuperar as promoções:', error);
    }
  });

  useEffect(() => {
    mutate();
  }, [currentPage]);

  const filteredPromocoes = promocoes.filter((promocao) =>
    promocao.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPromocao = (promocao: Promocao) => {
    setSelectedPromocao(promocao);
  };

  const handleBackToList = () => {
    setSelectedPromocao(null);
  };

  if (selectedPromocao) {
    return <DetalhamentoPromocao
      diretorioAtual="dirAtual"
      promocao={selectedPromocao}
      backDetalhamento={handleBackToList}
      dirAnt="dirAnt"
      hrefAnterior={APP_ROUTES.private.home.name}
      hrefAtual={APP_ROUTES.private.promocoes.name}
    />
  }

  return (
    <div>
      <div className={style.header}>
        <HeaderDetalhamento
          titulo="Promoções"
          hrefAnterior={APP_ROUTES.private.home.name}
          diretorioAnterior="Home /"
          diretorioAtual="Promoções"
        />
        <div className={style.header__container}>
         <div className={style.header__container_botoes}>
            <button onClick={() => (push(APP_ROUTES.private.cadastrar_promocao.name))}>
              <h1>
                Adicionar Promoção
              </h1>
              <img src="/assets/icons/navalha.svg" alt="Navalha" />
            </button>
          </div>
        </div>
      </div>

      <Table
        listPromocoes={filteredPromocoes}
        setPromocoes={setPromocoes}
        onSelectPromocao={handleSelectPromocao}
        table1="Nome"
        table2="Valor"
        table3="Data Inicio"
        table4="Data Fim"
        table5="Ações"
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ListaPromocoes;