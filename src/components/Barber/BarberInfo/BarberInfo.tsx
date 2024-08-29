import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import styles from "./BarberInfo.module.scss";
import { APP_ROUTES } from "@/constants/app-routes";
import HeaderDetalhamento from "@/components/Header/HeaderDetalhamento";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { putBarbeiroById } from "@/api/barbeiro/putBarbeiroById";
import { getAddressById } from "@/api/endereco/getAddressById";
import BarberInput from "../BarberInput";

interface Barbeiro {
  idBarber: string;
  name: string;
  email: string;
  cpf: string;
  address: number | Address; // Pode ser o ID ou o objeto completo
  salary: number;
  admissionDate: string;
  workload: number;
  services: Service[];
}

interface Address {
  idAddress: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  time: number;
  value: number;
}

interface BarberInfoProps {
  hrefAnterior: string;
  backDetalhamento: () => void;
  barbeiro: Barbeiro;
}

const BarberInfo: React.FC<BarberInfoProps> = ({ hrefAnterior, backDetalhamento, barbeiro }) => {
  const { push } = useRouter();
  const [editar, setEditar] = useState(false);
  const [barberData, setBarberData] = useState<Barbeiro | null>(null);
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (barbeiro) {
      setBarberData(barbeiro);

      // Buscar o endereço completo usando o ID
      if (typeof barbeiro.address === "number") {
        getAddressById(barbeiro.address.toString()).then(response => setAddress(response.data));
      } else {
        setAddress(barbeiro.address);
      }
    }
  }, [barbeiro]);

  const { mutate } = useMutation(
    async (values: Barbeiro) => {
      return putBarbeiroById(values.idBarber, values);
    }, {
      onSuccess: () => {
        push(APP_ROUTES.private.barbeiros.name);
      },
      onError: (error) => {
        console.log("Erro ao atualizar barbeiro", error);
      }
    });

  if (!barberData || !address) return null; // Exibe um loading ou algo do tipo enquanto os dados são carregados

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
          initialValues={{ ...barberData, address }}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            mutate({ ...values, address: Number(address.idAddress)});
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, values, isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.userProfile}>
                <div className={styles.photo}>
                  <p>Imagem de usuário</p>
                </div>
                <div className={styles.userInfo}>
                  <h2>{values.name}</h2>
                  {values.services.map((service) => (
                    <p key={service.id}>{service.name}</p>
                  ))}
                </div>
              </div>

              <h2>Informações pessoais</h2>
              <div className={styles.personalInfo}>
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="Nome completo:"
                  name="name"
                  value={values.name}
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
                  value={values.email}
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
                  value={values.cpf}
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
                  value={address.cep}
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
                  value={address.street}
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
                  value={address.number}
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
                  value={address.neighborhood}
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
                  value={address.city}
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
                  value={address.state}
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
                  value={values.salary}
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
                  value={values.admissionDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
                <BarberInput
                  disabled={!editar}
                  type="text"
                  label="Tipo de Serviço:"
                  name="services"
                  value={values.services.map((service) => service.name).join(", ")}
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
                  value={values.workload}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="medium"
                  error={undefined}
                />
              </div>

              <div className={styles.formButton}>
                <button
                  type="button"
                  onClick={() => setEditar(!editar)}
                  className={`${styles.container__header_button} ${editar ? styles.cancelButton : styles.editButton}`}
                >
                  {editar ? 'Cancelar' : 'Editar'}
                </button>
                {editar && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.saveButton}
                  >
                    Salvar
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default BarberInfo;
