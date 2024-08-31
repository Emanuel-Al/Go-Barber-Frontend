import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import styles from "./BarberInfo.module.scss";
import HeaderDetalhamento from "@/components/Header/HeaderDetalhamento";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { putBarbeiroById } from "@/api/barbeiro/putBarbeiroById";
import { getAddressById } from "@/api/endereco/getAddressById";
import BarberInput from "../BarberInput";
import { Barbeiro } from "@/interfaces/Barbeiro";
import { Address } from "@/interfaces/Address";
import AgendamentoTable from "../BarberHistoricoAgendamento/Table/Table";
import { mockAgendamentos } from "../BarberHistoricoAgendamento/TableMock";
import { Agendamento } from "@/interfaces/Agendamento";

interface BarberInfoProps {
  hrefAnterior: string;
  diretorioAtual: string;
  dirAnt: string;
  hrefAtual: string;
  backDetalhamento: () => void;
  barbeiro: Barbeiro;
}

const BarberInfo: React.FC<BarberInfoProps> = ({
  hrefAnterior,
  backDetalhamento,
  barbeiro,
}) => {
  const { push } = useRouter();
  const [editar, setEditar] = useState(false);
  const [barberData, setBarberData] = useState<Barbeiro | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [showConsultas, setShowConsultas] = useState(false);
  const [agendamentos, setAgendamentos] =
    useState<Agendamento[]>(mockAgendamentos);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (barbeiro) {
      setBarberData(barbeiro);
      getAddressById(barbeiro.address.toString())
        .then((response) => {
          setAddress(response.data);
        })
        .catch((error) => {
          console.log("Erro ao buscar endereço: ", error);
        });
    }
  }, [barbeiro]);

  const { mutate } = useMutation(
    async (values: Barbeiro) => {
      if (!values.idBarber) {
        throw new Error("ID do barbeiro não está definido.");
      }
      return putBarbeiroById(values.idBarber, values);
    },
    {
      onSuccess: () => {
        setEditar(false);
      },
      onError: (error) => {
        console.log("Erro ao atualizar barbeiro", error);
      },
    }
  );

  const onSelectAgendamento = (agendamento: Agendamento) => {
    console.log("Agendamento selecionado: ", agendamento);
  };

  return (
    <>
      <HeaderDetalhamento
        titulo="Barbeiros"
        diretorioAnterior="Gerenciar Barbeiros /"
        diretorioAtual={barbeiro.name}
        hrefAnterior={backDetalhamento}
      />

      <div className={styles.container}>
        <Formik
          initialValues={{
            ...barberData,
            address: address
              ? address
              : {
                  /* valores padrão para Address */
                },
          }}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            // Garantir que idBarber seja uma string não opcional
            const updatedValues: Barbeiro = {
              idBarber: values.idBarber ?? "", // Usa string vazia se undefined
              name: values.name ?? "",
              email: values.email ?? "",
              cpf: values.cpf ?? "",
              salary: values.salary ?? 0,
              admissionDate: values.admissionDate ?? "",
              workload: values.workload ?? 0,
              services: values.services ?? [],
              address: address ? Number(address.idAddress) : 0,
            };

            mutate(updatedValues);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, values, isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formHeader}>
                <div className={styles.userProfile}>
                  <div className={styles.photo}>
                    <p>Imagem de usuário</p>
                  </div>
                  <div className={styles.userInfo}>
                    <h2>{values.name}</h2>
                    {values.services && values.services.length > 0 ? (
                      values.services.map((service) => (
                        <p key={service.id}>{service.name}</p>
                      ))
                    ) : (
                      <p>Nenhum serviço disponível</p>
                    )}
                  </div>
                </div>
                <div className={styles.agendamento}>
                  <button
                    onClick={() => setShowConsultas(!showConsultas)}
                    className={styles.btn}
                  >
                    Atendimentos
                  </button>
                </div>
              </div>

              <h2>Informações pessoais</h2>
              <div className={styles.personalInfo}>
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="Nome completo:"
                  name="name"
                  value={values.name ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="email"
                  label="Email:"
                  name="email"
                  value={values.email ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="CPF:"
                  name="cpf"
                  value={values.cpf ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
              </div>

              <hr className={styles.line} />
              <h2>Endereço</h2>
              <div className={styles.address}>
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="CEP:"
                  name="address.cep"
                  value={address?.cep ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="Rua:"
                  name="address.street"
                  value={address?.street ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="number"
                  label="Número:"
                  name="address.number"
                  value={address?.number ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="Bairro:"
                  name="address.neighborhood"
                  value={address?.neighborhood ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="Cidade:"
                  name="address.city"
                  value={address?.city ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="Estado:"
                  name="address.state"
                  value={address?.state ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
              </div>

              <hr className={styles.line} />
              <h2>Informações de Admissão</h2>
              <div className={styles.admissionInfo}>
                <BarberInput
                  disabled={!editar}
                  type="number"
                  label="Salário:"
                  name="salary"
                  value={values.salary ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="date"
                  label="Data de Admissão:"
                  name="admissionDate"
                  value={values.admissionDate ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="number"
                  label="Carga Horária:"
                  name="workload"
                  value={values.workload ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
              </div>

              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => setEditar(!editar)}
                >
                  {editar ? "Cancelar" : "Editar"}
                </button>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.submitBtn}`}
                  disabled={isSubmitting || !editar}
                >
                  Salvar
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {showConsultas && (
          <div className={styles.consultas}>
            <hr className={styles.line}/>
            <h2>Consultas do Barbeiro</h2>
            <AgendamentoTable
              table1="Nome do Cliente"
              table2="Horário Agendado"
              table3="Tipo de Serviço"
              listAgendamentos={agendamentos}
              onSelectAgendamento={onSelectAgendamento}
              setAgendamentos={setAgendamentos}
              totalPages={1}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BarberInfo;
