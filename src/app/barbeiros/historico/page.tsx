"use client";

import React, { useEffect, useState } from "react";
import styles from "./barbeiros.module.scss";
import Menu from "@/components/Menu";
import MeuPerfil from "@/components/Barbeiro/MeuPerfil";
import { Barbeiro } from "@/interfaces/barbeiroInterface";
import { getBarberLogged } from "@/api/barbeiro/getBarberLogged";
import { useMutation } from "react-query";
import { APP_ROUTES } from "@/constants/app-routes";
import ListarAgendamentos from "@/components/Agendamento/ListarAgendamento/ListarAgendamentos";
import ListaProdutos from "@/components/Produto/ListaProduto";
import ListaBarbeiros from "@/components/Barbeiro/ListaBarbeiro";

const page = () => {
  const [barbeiro, setBarbeiro] = useState<Barbeiro>();

  
    useEffect(() => {
      if(!barbeiro){
          mutate()
      }
    }, [barbeiro]);

    const { mutate } = useMutation(() => getBarberLogged(), {
      onSuccess: (res) => {
        setBarbeiro(res.data);
      },
      onError: (error) => {
        console.error('Erro ao recuperar as promoções:', error);
      }
    });
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.container__menu}>
          <Menu />
        </div>
        <div className={styles.container__main}>
          <ListarAgendamentos/>
        </div>
      </div>
    </div>
  );
};

export default page;
