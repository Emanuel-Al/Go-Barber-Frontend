"use client"


import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import style from "./detalhar-promocao.module.scss";

import HeaderDetalhamento from "@/components/Header/HeaderDetalhamento";
import DadosPromocao from "./DadosPromocao";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { putPromocaoById } from "@/api/promocoes/putPromocaoById";
import { APP_ROUTES } from "@/constants/app-routes";
import { Promocao } from "@/interfaces/promocaoInterface";

interface DetalharPromocaoProps {
    hrefAnterior: string;
    diretorioAtual: string;
    dirAnt: string;
    hrefAtual: string;
    backDetalhamento: () => void;
    promocao: Promocao;
}


  const DetalharPromocao : React.FC<DetalharPromocaoProps> = ({ hrefAnterior, backDetalhamento, promocao }) => {

    const { push } = useRouter();
    const [editar, setEditar] = useState(false);

  const [formData, setFormData] = useState({
    id: promocao.id,
    name: '',
    totalPrice: '',
    startDate: '',
    endDate: '',
    coupon: '',
  })

  useEffect(() => {
    if (promocao) {
      setFormData({
        id: promocao.id,
        name: promocao.name || '',
        totalPrice: promocao.totalPrice || '',
        startDate: promocao.startDate || '',
        endDate: promocao.endDate || '',
        coupon: promocao.coupon || '',
      })
    }
  }, [promocao]);


  const { mutate } = useMutation(
    async (values: Promocao) => {
      return putPromocaoById(promocao.id, values);
    }, {
    onSuccess: () => {
        push(APP_ROUTES.private.promocoes.name); // Ajuste conforme necessário
    },
    onError: (error) => {
      console.log("Erro ao cadastrar uma nova promoção", error);
    }
  });


  return (
    <div id="header" className={style.container}>
        <HeaderDetalhamento
            titulo="Promoções"
            hrefAnterior={backDetalhamento}
            diretorioAnterior="Home / Promoções / "
            diretorioAtual="Informações da promoção"

       />
      <div className={style.container__ContainerForm}>
        <Formik
          initialValues={formData}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            mutate(values)
            setSubmitting(false);

            
          }}
        >
          
          {(formik) => {
            return (

              <Form
                className={style.container__ContainerForm_form}
              >
                  <div className={style.container__header}>
                     <div className={style.container__header_title}>
                      <h1>Informações da promoção</h1>
                      </div>
                      {editar === false ? (
                      <button
                          onClick={() => setEditar(true)}
                          className={style.container__header_button}>

                          <span>Editar</span>
                          {/*<Image src="/assets/iconLapis.svg" alt="editar perfil" width={25} height={25} /> */}
                      </button >
                      ) : (
                      <button
                          onClick={() => setEditar(false)}
                          className={style.container__header_button}>

                          <span>Salvar</span>
                          {/*<Image src="/assets/iconLapis.svg" alt="editar perfil" width={25} height={25} />*/}
                      </button >
                      )}
                  </div>


                <DadosPromocao formik={formik} editar={editar} hrefAnterior={hrefAnterior} />
                {/*
                  hrefAnterior === "/agricultores" && (
                    <DadosAtividadesRurais formik={formik} editar={editar} />
                  )*/
                }
               
              </Form >
            )
          }
          }
        </Formik >
      </div >

    </div >
  );
}


export default DetalharPromocao;