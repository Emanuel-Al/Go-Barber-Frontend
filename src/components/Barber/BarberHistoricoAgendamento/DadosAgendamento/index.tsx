"use client";

import style from "./DadosAgendamento.module.scss";

interface DadosAgendamentoProps {
  formik: any;
  editar: boolean;
  hrefAnterior: string;
}

const DadosAgendamento: React.FC<DadosAgendamentoProps> = ({
  formik,
  editar,
  hrefAnterior,
}) => {
  return (
    <>
      <div className={style.container__ContainerForm_form_halfContainer}>
        {editar === false ? (
          <>
            <div>
              <label htmlFor="name">Nome do Agendamento</label>
              <input
                id="name"
                className={style.container__ContainerForm_form_input}
                name="name"
                placeholder="Não informado"
                onBlur={formik.handleBlur}
                value={formik.values.name}
                disabled
              />
            </div>
            <div>
              <label htmlFor="date">Data</label>
              <input
                id="date"
                className={style.container__ContainerForm_form_input}
                name="date"
                placeholder="Não informado"
                onBlur={formik.handleBlur}
                value={formik.values.date}
                disabled
              />
            </div>
            <div>
              <label htmlFor="price">Valor</label>
              <input
                id="price"
                className={style.container__ContainerForm_form_input}
                name="price"
                placeholder="Não informado"
                onBlur={formik.handleBlur}
                value={formik.values.price}
                disabled
              />
            </div>
            <div>
              <label htmlFor="services">Serviços</label>
              <input
                id="services"
                className={style.container__ContainerForm_form_input}
                name="services"
                placeholder="Não informado"
                onBlur={formik.handleBlur}
                value={formik.values.services.map((service: any) => service.name).join(', ')}
                disabled
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="name">Nome do Agendamento</label>
              <input
                className={style.container__ContainerForm_form_input}
                id="name"
                name="name"
                placeholder={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <span className={style.form__error}>{formik.errors.name}</span>
              ) : null}
            </div>

            <div>
              <label htmlFor="date">Data</label>
              <input
                className={style.container__ContainerForm_form_input}
                id="date"
                name="date"
                placeholder={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                required
              />
              {formik.touched.date && formik.errors.date ? (
                <span className={style.form__error}>{formik.errors.date}</span>
              ) : null}
            </div>

            <div>
              <label htmlFor="price">Valor</label>
              <input
                className={style.container__ContainerForm_form_input}
                id="price"
                name="price"
                placeholder={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                required
              />
              {formik.touched.price && formik.errors.price ? (
                <span className={style.form__error}>{formik.errors.price}</span>
              ) : null}
            </div>

            <div>
              <label htmlFor="services">Serviços</label>
              <input
                className={style.container__ContainerForm_form_input}
                id="services"
                name="services"
                placeholder={formik.values.services.map((service: any) => service.name).join(', ')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.services.map((service: any) => service.name).join(', ')}
                required
              />
              {formik.touched.services && formik.errors.services ? (
                <span className={style.form__error}>{formik.errors.services}</span>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DadosAgendamento;
