"use client";

import React from "react";
import styles from "./barbeiros.module.scss";
import Menu from "@/components/Menu";
import BarberRegister from "@/components/Barber/BarberRegister/BarberRegister";
import CadastrarBarbeiro from "@/components/Barbeiro/CadastrarBarbeiro";

const page = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.container__menu}>
          <Menu />
        </div>
        <div className={styles.container__main}>
          <CadastrarBarbeiro />
        </div>
      </div>
    </div>
  );
};

export default page;
