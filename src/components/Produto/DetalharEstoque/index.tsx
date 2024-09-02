"use client"


import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import style from "./detalhar-promocao.module.scss";

import HeaderDetalhamento from "@/components/Header/HeaderDetalhamento";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { APP_ROUTES } from "@/constants/app-routes";
import DadosEstoque from "./DadosEstoque";
import { putEstoqueById } from "@/api/estoque/putEstoqueById";
import { Estoque } from "@/interfaces/estoqueInterface";

interface DetalharEstoqueProps {
    hrefAnterior: string;
    diretorioAtual: string;
    dirAnt: string;
    hrefAtual: string;
    backDetalhamento: () => void;
    estoque: Estoque;
}


  const DetalharEstoque : React.FC<DetalharEstoqueProps> = ({ hrefAnterior, backDetalhamento, estoque }) => {

    const { push } = useRouter();
    const [editar, setEditar] = useState(false);

    const [formData, setFormData] = useState({
      idStock: estoque.idStock,
      idProduct: estoque.idProduct, 
      quantity: estoque.quantity || 0,
      batchNumber: estoque.batchNumber || '',
      expirationDate: estoque.expirationDate || '',
      acquisitionDate: estoque.acquisitionDate || '',
    });
  
    useEffect(() => {
      if (estoque) {
        setFormData({
          idStock: estoque.idStock,
          idProduct: estoque.idProduct, // Ensure consistency here too
          quantity: estoque.quantity || 0,
          batchNumber: estoque.batchNumber || '',
          expirationDate: estoque.expirationDate || '',
          acquisitionDate: estoque.acquisitionDate || '',
        });
      }
    }, [estoque]);

  const { mutate } = useMutation(
    async (values: Estoque) => {
      return putEstoqueById(estoque.idStock, values);
    }, {
    onSuccess: () => {
        push(APP_ROUTES.private.produtos.name); 
    },
    onError: (error) => {
      console.log("Erro ao cadastrar um novo produto", error);
    }
  });


  return (
    <div id="header" className={style.container}>
        <HeaderDetalhamento
            titulo="Produtos"
            hrefAnterior={backDetalhamento}
            diretorioAnterior="Home / Produtos / "
            diretorioAtual="Informações do Estoque"

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
                      <h1>Informações do Estoque</h1>
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


                <DadosEstoque formik={formik} editar={editar} hrefAnterior={hrefAnterior} />
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
        <div>
          
        </div>
      </div >

    </div >
  );
}


export default DetalharEstoque;