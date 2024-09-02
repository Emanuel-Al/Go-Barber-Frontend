"use client";

import { useMutation } from "react-query";
import { Form, Formik } from "formik";
import style from "./cadastrar-produto.module.scss";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import DadosEstoque from "./dadosEstoque/index";
import { postEstoque } from "@/api/estoque/postEstoque";
import { Estoque } from "@/interfaces/estoqueInterface";



interface NovoEstoqueProps {
  productId: string; // Prop para receber o ID do produto
  onCancel: () => void; // Callback para retornar ao detalhamento do produto
}

const NovoEstoque: React.FC<NovoEstoqueProps> = ({ productId, onCancel }) => {
  const { push } = useRouter();

  const initialValues = {
    idStock: "",
    idProduct: productId, // Preencher automaticamente com o ID do produto
    quantity: 0,
    batchNumber: "",
    expirationDate: "",
    acquisitionDate: "",
  };

  const validateSchema = Yup.object().shape({
    quantity: Yup.number().required("Obrigatório"),
    expirationDate: Yup.date().required("Obrigatório"),
    acquisitionDate: Yup.date().required("Obrigatório"),
  });

  const { mutate } = useMutation(
    async (values: Estoque) => {
      return postEstoque(values);
    },
    {
      onSuccess: () => {
        onCancel(); // Retornar ao detalhamento do produto após a criação
      },
      onError: (error) => {
        console.log("Erro ao cadastrar o novo estoque", error);
      },
    }
  );

  return (
    <>
      <div className={style.header}>
        <div className={style.header__title}>
          <h1>Estoque</h1>
          <div className={style.header__title_line}></div>
        </div>
        <div className={style.header__navegacao}>
          <div
            className={style.header__navegacao_voltar}
            onClick={onCancel} // Callback para retornar ao detalhamento
          >
            <img src="/assets/icons/menor_que.svg" alt="Voltar" />
            <h1>Voltar</h1>
          </div>
          <div className={style.header__navegacao_guia}>
            <span>Home / Produtos / </span>
            <h1>Cadastrar Estoque</h1>
          </div>
        </div>
      </div>
      <div id="header" className={style.container}>
        <div className={style.container__ContainerForm}>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Entrou!", values);
              mutate(values);
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form className={style.container__ContainerForm_form}>
                <DadosEstoque formik={formik} />

                <div className={style.container__ContainerForm_buttons}>
                  <button
                    className={style.container__ContainerForm_buttons_link}
                    type="button"
                    onClick={onCancel} // Callback para retornar ao detalhamento
                  >
                    <h1>Voltar</h1>
                  </button>
                  <button
                    type="submit"
                    className={style.container__ContainerForm_buttons_linkWhite}
                  >
                    <h1>Finalizar</h1>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default NovoEstoque;
