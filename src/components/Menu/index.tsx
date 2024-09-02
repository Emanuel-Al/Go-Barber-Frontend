import style from "./menu.module.scss";
import { APP_ROUTES } from "@/constants/app-routes";
import Header_menu from "./Header_menu";
import Botao_menu from "./Botao_menu";
import Footer_menu from "./Footer_menu";
import { useEffect, useState } from "react";
import { getStorageItem } from "@/utils/localStore";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";  // Import the correct type
import { Barbeiro } from "@/interfaces/barbeiroInterface";
import { getBarberPhotoLogged } from "@/api/barbeiro/getBarberPhotoLogged";
import { getBarberLogged } from "@/api/barbeiro/getBarberLogged";
import { useMutation } from "react-query";

const Menu = () => {

    const [role, setRole] = useState<string | null>(getStorageItem("userRole"));
    
    const userLogin = useSelector((state: RootState) => state.userLogin);
    function whatIsTypeUser() {
        if (role === "ADMIN") {
            return <LayoutAdmin />
        } else if (role === "BARBER") {
            return <LayoutBarbeiro />
        } else if (role === "ROLE_AGRICULTOR") {
             return <LayoutSecretaria/>
        }
    } 

    return (
        whatIsTypeUser()  
    )
    
}

export default Menu;


const LayoutAdmin = () => {
  
    
    return (
        <div className={style.menu}>
            <div className={style.menu__container}>
                
                <div>
                    <Header_menu photo="/assets/photo.svg" name="Adenilson Ramos" />
                </div>
                <div>
                    <Botao_menu 
                        title="Gerenciamento Barbeiro" 
                        icon="/assets/icons/navalha.svg"
                        route={APP_ROUTES.private.barbeiros.name}
                    />
                    <Botao_menu 
                        title="Gerenciamento Serviços" 
                        icon="/assets/icons/cadeira.svg"
                        route={APP_ROUTES.private.servicos.name}
                    />
                    <Botao_menu 
                        title="Gerenciamento Produtos" 
                        icon="/assets/icons/sexta.svg"
                        route={APP_ROUTES.private.produtos.name}
                    />
                        <Botao_menu 
                        title="Gerenciamento Promoções" 
                        icon="/assets/icons/promocao.svg"
                        route={APP_ROUTES.private.promocoes.name}
                    />
                </div>
                <div>
                    <Footer_menu />
                </div>
            </div>
            
        </div>
    )
}

const LayoutSecretaria = () => {
    return (
        <div className={style.menu}>
        <div className={style.menu__container}>
            
            <div>
                <Header_menu photo="/assets/photo.svg" name="Adenilson Ramos" />
            </div>
            <div>
                <Botao_menu 
                    title="Meu Perfil" 
                    icon="/assets/icons/navalha.svg"
                    route={APP_ROUTES.private.barbeiros.name}
                />
                
            </div>
            <div>
                <Footer_menu />
            </div>
        </div>
        
    </div>
)
}



const LayoutBarbeiro = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [barbeiro, setBarbeiro] = useState<Barbeiro | null>(null);
    const [formData, setFormData] = useState<Barbeiro>({
        idBarber: '',
        name: '',
        email: '',
        contato: '',
        password: '',
        services: [],
        cpf: '',
        address: {
          street: '',
          number: 0,
          neighborhood: '',
          city: '',
          state: '',
        },
        salary: 0,
        start: '',
        end: '',
        admissionDate: '',
        workload: 0,
        idServices: [],
        profilePhoto: undefined,
      });
    
      useEffect(() => {
        if(!barbeiro){
            mutate()
        }
        if (barbeiro) {
          setFormData({
            idBarber: barbeiro.idBarber || '',
            name: barbeiro.name || '',
            email: barbeiro.email || '',
            services: barbeiro.services || {},
            password: barbeiro.password || '',
            contato: barbeiro.contato || '',
            cpf: barbeiro.cpf || '',
            start: barbeiro.start || '',
            end: barbeiro.end || '',
            address: barbeiro.address || {},
            salary: barbeiro.salary || 0,
            admissionDate: barbeiro.admissionDate || '',
            workload: barbeiro.workload || 0,
            idServices: barbeiro.idServices || [],
            profilePhoto: undefined,
          });
    
          if (barbeiro.idBarber) {
            getBarberPhoto(barbeiro.idBarber);
          }
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
      const getBarberPhoto = async (idBarber: string) => {
        try {
            const response = await getBarberPhotoLogged();
    
            if (response.data) {
                const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(imageBlob);
    
                console.log("URL da imagem gerada:", imageUrl);
    
                setImagePreview(imageUrl);  // Atualiza o estado com a URL do Blob
            } else {
                console.error("Nenhum dado encontrado na resposta.");
            }
        } catch (error) {
            console.error("Erro ao buscar a imagem do barbeiro:", error);
        }
    };
    

    return (
        <div className={style.menu}>
            <div className={style.menu__container}>
                
                <div>
                    <Header_menu photo={imagePreview} name={barbeiro?.name} />
                </div>
                <div>
                    <Botao_menu 
                        title="Meu Perfil" 
                        icon="/assets/icons/navalha.svg"
                        route={APP_ROUTES.private.meu_perfil.name}
                    />
                    
                </div>
                <div>
                    <Footer_menu />
                </div>
            </div>
            
        </div>
    )
}