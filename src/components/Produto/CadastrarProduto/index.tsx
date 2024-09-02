"use client";

import { useMutation } from "react-query";
import { Form, Formik } from "formik";
import style from "./cadastrar-produto.module.scss";
import DadosProduto from "./dadosProduto/index";
import * as Yup from "yup";
import { APP_ROUTES } from "@/constants/app-routes";
import { useRouter } from "next/navigation";
import DadosEstoque from "./dadosEstoque/index";
import { postProduto } from "@/api/produtos/postProduto";
import { postEstoque } from "@/api/estoque/postEstoque";
import { Produto } from "@/interfaces/produtoInterface";
import { Estoque } from "@/interfaces/estoqueInterface";

interface FormValues {
  produto: Produto;
  estoque: Estoque;
}

const CadastrarProduto = () => {
  const { push } = useRouter();

  const initialValues: FormValues = {
    produto: {
      idProduct: "",
      nameProduct: "",
      brandProduct: "",
      priceProduct: "",
      size: "",
      descriptionProduct: "",
    },
    estoque: {
      idStock: "",
      idProduct: "",
      quantity: 0,
      batchNumber: "",
      expirationDate: "",
      acquisitionDate: "",
    },
  };

  const validateSchema = Yup.object().shape({
    produto: Yup.object().shape({
      nameProduct: Yup.string()
        .min(5, "O nome deve ter no mínimo 5 caracteres")
        .required("Obrigatório"),
      priceProduct: Yup.number().required("Obrigatório"),
    }),
    estoque: Yup.object().shape({
      quantity: Yup.number().required("Obrigatório"),
      expirationDate: Yup.date().required("Obrigatório"),
      acquisitionDate: Yup.date().required("Obrigatório"),
    }),
  });

  const mutateStock = useMutation(
    async (estoqueData: Estoque) => {
      return postEstoque(estoqueData);
    },
    {
      onSuccess: (res) => {
        push(APP_ROUTES.private.produtos.name); // Redirect after successful stock creation
      },
      onError: (error) => {
        console.log("Erro ao cadastrar o estoque", error);
      },
    }
  );

  const mutateProduto = useMutation(
    async (produtoData: FormValues) => {
      return postProduto(produtoData.produto);
    },
    {
      onSuccess: (produtoResponse, formikValues) => {
        const estoqueData = {
          ...formikValues.estoque, // Use the updated Formik values
          idProduct: produtoResponse.data.idProduct, // Ensure the product ID is passed to the stock data
        };
        mutateStock.mutate(estoqueData); // Pass the modified stock data to mutateStock
      },
      onError: (error) => {
        console.log("Erro ao cadastrar o produto", error);
      },
    }
  );

  return (
    <>
      <div className={style.header}>
        <div className={style.header__title}>
          <h1>Produtos</h1>
          <div className={style.header__title_line}></div>
        </div>
        <div className={style.header__navegacao}>
          <div
            className={style.header__navegacao_voltar}
            onClick={() => push(APP_ROUTES.private.produtos.name)}
          >
            <img src="/assets/icons/menor_que.svg" alt="Voltar" />
            <h1>Voltar</h1>
          </div>
          <div className={style.header__navegacao_guia}>
            <span>Home / Produtos / </span>
            <h1>Cadastrar Produto</h1>
          </div>
        </div>
      </div>
      <div id="header" className={style.container}>
        <div className={style.container__ContainerForm}>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values, { setSubmitting }) => {
              mutateProduto.mutate(values); // Pass entire Formik values to mutateProduto
              setSubmitting(false);
            }}
          >
            {(formik) => {
              return (
                <Form className={style.container__ContainerForm_form}>
                  <DadosProduto formik={formik} />
                  <DadosEstoque formik={formik} />

                  <div className={style.container__ContainerForm_buttons}>
                    <button
                      className={style.container__ContainerForm_buttons_link}
                      type="button"
                      onClick={() => push(APP_ROUTES.private.produtos.name)}
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
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CadastrarProduto;
