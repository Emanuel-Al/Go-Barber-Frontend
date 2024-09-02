"use client";

import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import style from "./detalharAgendamento.module.scss"
import HeaderDetalhamento from "@/components/Header/HeaderDetalhamento";
import DadosAgendamento from "../DadosAgendamento";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { putServicoById } from "@/api/servicos/putServicoById";
import { APP_ROUTES } from "@/constants/app-routes";
import { Agendamento } from "@/interfaces/agendamentoInterface";
import { putAtendimentoById } from "@/api/atendimentos/putAtendimentosById";

interface DetalharAgendamentoProps {
  hrefAnterior: string;
  diretorioAtual: string;
  dirAnt: string;
  hrefAtual: string;
  backDetalhamento: () => void;
  agendamento: Agendamento;
}

const DetalharAgendamento: React.FC<DetalharAgendamentoProps> = ({
  hrefAtual,
  backDetalhamento,
  agendamento,
}) => {
  const { push } = useRouter();
  const [editar, setEditar] = useState(false);

  const [formData, setFormData] = useState({
    barber: agendamento.barber,
    clientName: agendamento.clientName || '',
    clientNumber: agendamento.clientNumber || '',
    startTime: agendamento.startTime || '',
    endTime: agendamento.endTime || '',
    services: agendamento.barber.services || [],
    serviceType: agendamento.serviceType || [],
  });

  useEffect(() => {
    if (agendamento) {
      setFormData({
        barber: agendamento.barber,
        clientName: agendamento.clientName,
        clientNumber: agendamento.clientNumber || '',
        startTime: agendamento.startTime || '',
        endTime: agendamento.endTime || '',
        services: agendamento.barber.services || [],
        serviceType: agendamento.serviceType || [],
      });
    }
  }, [agendamento]);

/*   const { mutate } = useMutation(
    async (values: Agendamento) => {
      return putAtendimentoById(agendamento.id, values);
    },
    {
      onSuccess: () => {
        push(APP_ROUTES.private.agendamentos.name);
      },
      onError: (error) => {
        console.log("Erro ao atualizar o agendamento", error);
      },
    }
  );
 */
  return (
    <div id="header" className={style.container}>
      <HeaderDetalhamento
        titulo="Agendamentos"
        hrefAnterior={backDetalhamento}
        diretorioAnterior="Home / Agendamentos / "
        diretorioAtual="Informações do Agendamento"
      />
      <div className={style.container__ContainerForm}>
        <Formik
          initialValues={formData}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            /* mutate(values); */
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form className={style.container__ContainerForm_form}>
              <div className={style.container__header}>
                <div className={style.container__header_title}>
                  <h1>Informações do Agendamento</h1>
                </div>
                <button
                  type="button"
                  onClick={() => setEditar(!editar)}
                  className={style.container__header_button}
                >
                  <span>{editar ? 'Salvar' : 'Editar'}</span>
                </button>
              </div>
              <DadosAgendamento formik={formik} editar={editar} hrefAnterior={hrefAtual} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DetalharAgendamento;
