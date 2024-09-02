"use client"

import { useMutation } from "react-query";
import { Form, Formik } from "formik";
import style from "./cadastrar-promocao.module.scss";
import DadosPromocao from "./dadosPromocao/index";
import * as Yup from 'yup';
import { postPromocao } from "@/api/promocoes/postPromocao";
import { APP_ROUTES } from "@/constants/app-routes";
import { useRouter } from "next/navigation";
import { Promocao } from "@/interfaces/promocaoInterface";




const CadastroPromocao = () => {
  const { push } = useRouter();

  const initialValues: Promocao = {
    id: "",
    name: "",
    totalPrice: "",
    startDate: "",
    endDate: "",
    coupon: ""
  };

  const validateSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "O nome deve ter no mínimo 5 caracteres")
      .required('Obrigatório'),
    totalPrice: Yup.number()
      .required('Obrigatório'),
    startDate: Yup.date()
      .min(new Date(), "O início da promoção não pode ser antes da data atual.")
      .required('Obrigatório'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), "O fim da promoção não pode ser antes da data de início.")
      .required('Obrigatório'),
    
  });

  const { mutate } = useMutation(
    async (values: Promocao) => {
      const coupon = values.coupon === "" ? null : values.coupon;
      const updatedValues = { ...values, coupon }; // Atualiza o campo coupon no objeto values
    
      return postPromocao(updatedValues);    
    }, {
    onSuccess: () => {
        push(APP_ROUTES.private.promocoes.name); // Ajuste conforme necessário
    },
    onError: (error) => {
      console.log("Erro ao cadastrar uma nova promoção", error);
    }
  });

  
  return (
    <>
      <div className={style.header}>
        <div className={style.header__title}>
            <h1>Produtos</h1>
            <div className={style.header__title_line}></div>
        </div>
        <div className={style.header__navegacao}>
          <div className={style.header__navegacao_voltar} onClick={() => (push(APP_ROUTES.private.produtos.name))}>
            <img src="/assets/icons/menor_que.svg" alt="Voltar" />
            <h1>Voltar</h1>
          </div>
          <div className={style.header__navegacao_guia}>
            <span>Home / Promoções /</span><h1>Cadastrar Promoção</h1>
          </div>
        </div>
        
      </div>
    <div id="header" className={style.container}>
      <div className={style.container__ContainerForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutate(values);
            setSubmitting(false);
          }}
        >
          {(formik) => {
            return (
              <Form className={style.container__ContainerForm_form}>
                <DadosPromocao formik={formik} />
                <div className={style.container__ContainerForm_buttons}>
                  <button
                    className={style.container__ContainerForm_buttons_link}
                    type="button"
                    onClick={() => push(APP_ROUTES.private.promocoes.name)}
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

export default CadastroPromocao;