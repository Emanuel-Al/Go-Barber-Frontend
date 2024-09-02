"use client"
import style from "./promocao.module.scss";

interface DadosBarbeiroProps {
    formik: any;
    editar: boolean;
    hrefAnterior: string;
    }

const DadosPessoais: React.FC<DadosBarbeiroProps> = ({ formik, editar }) => {

  return (
    <>
      <div className={style.container__ContainerForm_form_halfContainer}>

        {editar === false ? (
          <>
            <div>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                className={style.container__ContainerForm_form_input}
                name="name"
                placeholder="Não informado"
                onBlur={formik.h1andleBlur}
                value={formik.values.name}
                disabled
              />
            </div>
            <div>
              <label htmlFor="email">Email </label>
              <input
                id="email"
                className={style.container__ContainerForm_form_input}
                name="email"
                placeholder="Não informado"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled
              />
            </div>
            <div>
              <label htmlFor="contato">Telefone</label>

              <input
                id="contato"
                className={style.container__ContainerForm_form_input}
                name="contato"
                placeholder="Não informado"
                value={formik.values.contato}
                disabled
              />
            </div>
            <div>
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                className={style.container__ContainerForm_form_input}
                name="cpf"
                placeholder="Não informado"
                onBlur={formik.handleBlur}
                value={formik.values.cpf}
                disabled
              />
            </div>
            
          </>
        ) : (
          <>

            <div>
              <label htmlFor="name">Nome</label>

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
            </div>
            {formik.touched.name && formik.errors.name ? (
                <span className={style.form__error}>{formik.errors.name}</span>
              ) : null}

            <div>
              <label htmlFor="email">Email</label>

              <input
                className={style.container__ContainerForm_form_input}
                id="email"
                name="email"
                placeholder={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <span className={style.form__error}>{formik.errors.email}</span>
              ) : null}
            </div>

            <div>

              <label htmlFor="contato">Telefone </label>
              <input
                className={style.container__ContainerForm_form_input}
                id="contato"
                name="contato"
                placeholder={formik.values.contato}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contato}
                required
              />
              {formik.touched.contato && formik.errors.contato ? (
                <span className={style.form__error}>{formik.errors.contato}</span>
              ) : null}
            </div>   
            
            <div>

              <label htmlFor="cpf">CPF </label>
              <input
                className={style.container__ContainerForm_form_input}
                id="cpf"
                name="cpf"
                placeholder={formik.values.cpf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cpf}
                required
              />
              {formik.touched.cpf && formik.errors.cpf ? (
                <span className={style.form__error}>{formik.errors.cpf}</span>
              ) : null}
            </div>            
          </>
        )}

      </div>
    </>
  )
}


export default DadosPessoais;