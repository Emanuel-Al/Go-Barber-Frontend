import { useEffect, useState } from "react";
import style from "./detalhar-produto.module.scss";
import HeaderDetalhamento from "@/components/Header/HeaderDetalhamento";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import ListaEstoque from "../ListaEstoque";
import DetalharEstoque from "../DetalharEstoque";
import { putProdutoById } from "@/api/produtos/putProdutoById";
import DadosProduto from "./DadosProduto";
import { APP_ROUTES } from "@/constants/app-routes";
import NovoEstoque from "../NovoEstoque";
import { Produto } from "@/interfaces/produtoInterface";
import { Estoque } from "@/interfaces/estoqueInterface";

interface DetalharProdutoProps {
  hrefAnterior: string;
  diretorioAtual: string;
  dirAnt: string;
  hrefAtual: string;
  backDetalhamento: () => void;
  produto: Produto;
  onNovoEstoque: () => void;  // Adicionando a prop para lidar com o botão Novo Estoque
}

const DetalharProduto: React.FC<DetalharProdutoProps> = ({
  hrefAnterior,
  backDetalhamento,
  produto,
}) => {
  const { push } = useRouter();
  const [editar, setEditar] = useState(false);
  const [selectedEstoque, setSelectedEstoque] = useState<Estoque | null>(null);
  const [novoEstoque, setNovoEstoque] = useState(false); // Estado para controlar se o NovoEstoque está sendo exibido

  const [formData, setFormData] = useState({
    idProduct: produto.idProduct,
    nameProduct: "",
    brandProduct: "",
    priceProduct: "",
    size: "",
    descriptionProduct: "",
  });

  useEffect(() => {
    if (produto) {
      setFormData({
        idProduct: produto.idProduct,
        nameProduct: produto.nameProduct || "",
        brandProduct: produto.brandProduct || "",
        priceProduct: produto.priceProduct || "",
        size: produto.size || "",
        descriptionProduct: produto.descriptionProduct || "",
      });
    }
  }, [produto]);

  const { mutate } = useMutation(
    async (values: Produto) => {
      return putProdutoById(produto.idProduct, values);
    },
    {
      onSuccess: () => {
        setEditar(false);
      },
      onError: (error) => {
        console.log("Erro ao cadastrar um novo produto", error);
      },
    }
  );

  const handleSelectEstoque = (estoque: Estoque) => {
    setSelectedEstoque(estoque);
  };

  const handleNovoEstoque = () => {
    setNovoEstoque(true);
  };

  if (novoEstoque) {
    return (
      <NovoEstoque
        productId={produto.idProduct}
        onCancel={() => {
          setNovoEstoque(false); // Retorna ao detalhamento do produto
        }}
      />
    );
  }

  if (selectedEstoque) {
    return (
      <DetalharEstoque
        diretorioAtual="dirAtual"
        estoque={selectedEstoque}
        backDetalhamento={() => setSelectedEstoque(null)}
        dirAnt="dirAnt"
        hrefAnterior={APP_ROUTES.private.home.name}
        hrefAtual={APP_ROUTES.private.promocoes.name}
      />
    );
  }

  return (
    <div id="header" className={style.container}>
      <HeaderDetalhamento
        titulo="Produtos"
        hrefAnterior={backDetalhamento}
        diretorioAnterior="Home / Produtos / "
        diretorioAtual="Informações do produto"
      />
      <div className={style.container__ContainerForm}>
        <Formik
          initialValues={formData}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            mutate(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form className={style.container__ContainerForm_form}>
              <div className={style.container__header}>
                <div className={style.container__header_title}>
                  <h1>Informações do produto</h1>
                </div>
                {!editar ? (
                  <button
                    onClick={() => setEditar(true)}
                    className={style.container__header_button}
                  >
                    <span>Editar</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setEditar(false)}
                    className={style.container__header_button}
                  >
                    <span>Salvar</span>
                  </button>
                )}
              </div>

              <DadosProduto
                formik={formik}
                editar={editar}
                hrefAnterior={hrefAnterior}
              />
            </Form>
          )}
        </Formik>
        <div>
        <ListaEstoque
            onSelectEstoque={handleSelectEstoque}
            idProduct={produto.idProduct}
            onNovoEstoque={handleNovoEstoque} // Adicione esta linha
          />
        </div>
      </div>
    </div>
  );
};

export default DetalharProduto;