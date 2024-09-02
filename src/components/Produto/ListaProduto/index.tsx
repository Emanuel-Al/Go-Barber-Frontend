import { useEffect, useState } from "react";
import style from "./produto.module.scss";
import { useMutation } from "react-query";

import Table from "./Table";

import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import HeaderDetalhamento from "@/components/Header/HeaderDetalhamento";
import DetalharProduto from "../DetalharProduto";
import NovoEstoque from "../NovoEstoque"; // Importando o componente NovoEstoque
import { getAllProdutos } from "@/api/produtos/getAllProdutos";
import { Produto } from "@/interfaces/produtoInterface";


const ListaProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [showNovoEstoque, setShowNovoEstoque] = useState(false); // Estado para controlar a exibição do NovoEstoque
  const [searchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { push } = useRouter();

  const { mutate } = useMutation(() => getAllProdutos(currentPage, 3), {
    onSuccess: (res) => {
      setProdutos(res.data.content);
      setTotalPages(res.data.totalPages);
    },
    onError: (error) => {
      console.error('Erro ao recuperar as promoções:', error);
    }
  });

  useEffect(() => {
    mutate();
  }, [currentPage]);

  const filteredProdutos = produtos.filter((produto) =>
    produto.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProduto = (produto: Produto) => {
    setSelectedProduto(produto);
  };

  const handleBackToList = () => {
    setSelectedProduto(null);
    setShowNovoEstoque(false); // Resetar a exibição do NovoEstoque
  };

  // Verifica se deve renderizar o NovoEstoque
  if (showNovoEstoque) {
    return (
      <NovoEstoque
        productId={selectedProduto?.idProduct || ''}
        onCancel={handleBackToList} // Callback para voltar ao detalhamento do produto
      />
    );
  }

  if (selectedProduto) {
    return (
      <DetalharProduto
        diretorioAtual="dirAtual"
        produto={selectedProduto}
        backDetalhamento={handleBackToList}
        dirAnt="dirAnt"
        hrefAnterior={APP_ROUTES.private.home.name}
        hrefAtual={APP_ROUTES.private.promocoes.name}
        onNovoEstoque={() => setShowNovoEstoque(true)} // Define para mostrar o NovoEstoque
      />
    );
  }

  return (
    <div>
      <div className={style.header}>
        <HeaderDetalhamento
          titulo="Produtos"
          hrefAnterior={APP_ROUTES.private.home.name}
          diretorioAnterior="Home /"
          diretorioAtual="Produtos"
        />
        <div className={style.header__container}>
          <div className={style.header__container_botoes}>
            <button onClick={() => (push(APP_ROUTES.private.cadastrar_produtos.name))}>
              <h1>
                Adicionar Produto
              </h1>
              <img src="/assets/icons/sexta.svg" alt="Navalha" />
            </button>
          </div>
        </div>
      </div>

      <Table
        listProdutos={filteredProdutos}
        setProdutos={setProdutos}
        onSelectProduto={handleSelectProduto}
        table1="Nome"
        table2="Marca"
        table3="Valor"
        table4="Peso"
        table5="Ações"
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ListaProdutos;
