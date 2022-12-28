import _set from 'lodash/set'

import * as Env from '../env'
import AppStorage from './data/AppStorage'
import api from './api'

export default class Endpoints {
    
    /* ---------------------------------------------- */
    /*  Gera Retorno de sucesso 
    /* ---------------------------------------------- */

    static generateReturn() {
        const returnData = {
            success: true,
            data: null,
            status: 200,
            error: false,
        }

        return returnData
    }

    /* ---------------------------------------------- */
    /*  Busca o Token de Acesso e formata para acesso */
    /* ---------------------------------------------- */

    static generateAuthenticationHeader = async () => {
        const token = await AppStorage.getData(`${Env.keyPrefix}-token`)

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        return config
    }

    /* ---------------------------------------------- */
    /*  Busca pelo ID do usuário
    /* ---------------------------------------------- */

    static getUser = async () => {
        const config = this.generateAuthenticationHeader()
        const user_id = await AppStorage.getData(`${Env.keyPrefix}-user`)

        if (user_id) {
            const data = await api.get(
                `${Env.apiURL}customer/user/${user_id?.id}`,
                await config,
                )

            await AppStorage.storeData(`${Env.keyPrefix}-user`, data?.data)

            return data
        }
            return null
        
    }

    /* ---------------------------------------------- */
    /*  Login do usuário
    /* ---------------------------------------------- */

    static signIn = async (values: any) => {
        
        const { data } = await api.post(`${Env.apiURL}auth/customer/login`, values)
        
        await AppStorage.storeData(`${Env.keyPrefix}-token`, data?.access_token)
        await AppStorage.storeData(`${Env.keyPrefix}-user`, data?.user)

        return data
    }

    /* ---------------------------------------------- */
    /*  Cadastro do usuário
    /* ---------------------------------------------- */

    static signUp = async (values: any) => {
        const {data} = await api.post(`${Env.apiURL}customer`, values)

        await AppStorage.storeData(`${Env.keyPrefix}-token`, data?.access_token)
        await AppStorage.storeData(`${Env.keyPrefix}-user`, data?.user)

        return data
    }


    /* ---------------------------------------------- */
    /*  Recuperar senha
    /* ---------------------------------------------- */

    static recoveryPassword = async (values: any) => {
        const config = this.generateAuthenticationHeader()

        const { data } = await api.get(
            `${Env.apiURL}User/recoverPassword/${values.email}`,
            await config,
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Recuperar senha - Confirmação
    /* ---------------------------------------------- */

    static recoveryPasswordConfirmation = async (values: any) => {
        const config = this.generateAuthenticationHeader()

        const { data } = await api.post(
            `${Env.apiURL}User/recoverPassword/ChangePassword`,
            values,
            await config,
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Alterar senha
    /* ---------------------------------------------- */

    static postChangePassword = async (_values: any) => {
        const config = this.generateAuthenticationHeader()

        const { data } = await api.post(
            `${Env.apiURL}User/changePassword`,
            _values,
            await config,
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Atualizar dados do usuário
    /* ---------------------------------------------- */

    static updateUser = async (values: any) => {
        const config = this.generateAuthenticationHeader()

        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}customer/${user?.id}`;
        const { data } = await api.put(
            url,
            values,
            await config,
        )

        return data
    }


    //* ---------------------------------------------- */
    /*  Enviar localização
    /* ---------------------------------------------- */

    static putTracking = async (values: any) => {
        const config = this.generateAuthenticationHeader()

        const { data, status } = await api.put(
            `${Env.apiURL}customer/update/tracking`,
            values,
            await config,
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Enviar código de validação de e-mail
    /* ---------------------------------------------- */

    static sendVerificationCodeEmail = async () => {
        const config = this.generateAuthenticationHeader()

        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const { data } = await api.post(
            `${Env.apiURL}customer/send/email-verification`,
            {
                customerId: user.id,
                type: 0
            },
            await config,
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Lista de ordens pendentes
    /* ---------------------------------------------- */

    static getPendingOrders = async () => {
        const config = this.generateAuthenticationHeader()

        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const { data } = await api.get(
            `${Env.apiURL}order/pending/customer`,
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Completar cadastro
    /* ---------------------------------------------- */

    static completeRegister = async (values: any) => {
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}customer/${user?.id}`;
        const { data } = await api.put(
            url,
            values,
            await config,
        )

        if(data){
            await AppStorage.storeData(`${Env.keyPrefix}-complete-register-${user?.id}`, true)
        }

        return data
    }


    /* ---------------------------------------------- */
    /*  Criar cartão de crédito
    /* ---------------------------------------------- */

    static creditCardCreate = async (values: any) => {

        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )
      
        const url = `${Env.apiURL}customerCreditCard`;
        const { data } = await api.post(
            url,
            {
                customer: user?.id,
                default: true,
                holder_name: values.holder_name,
                number: values.number,
                exp_month: values.exp_month,
                exp_year: values.exp_year,
                cvv: values.cvv,
                billing_address: {
                    line_1: user?.street,
                    line_2: `${user?.neighborhood}, ${user?.street_number} - ${user?.complement}`,
                    zip_code: user?.zipCode,
                    city: user?.city,
                    state: user?.state,
                    country: 'Brasil',
                }
            },
            await config,
        )

        if(data){
            await AppStorage.storeData(`${Env.keyPrefix}-credit-card-${user?.id}`, true)
        }

        return data
    }


    /* ---------------------------------------------- */
    /*  Lista de gêneros
    /* ---------------------------------------------- */

    static getGenderList = async () => {
       
        const { data } = await api.get(
            `${Env.apiURL}gender`
        )

        return data
    }

    
    /* ---------------------------------------------- */
    /*  Lista de Tipos de Documentos
    /* ---------------------------------------------- */

    static getDocumentTypesList = async () => {
       
        const { data } = await api.get(
            `${Env.apiURL}documentType`
        )

        return data
    }


    /* -------------------------------------------------- */
    /* ---- código para o email do usuário -------*/
    /* -------------------------------------------------- */

    static sendEmailCode = async () => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
        const { data } = await api.post(
            `${Env.apiURL}customer/verification/email/${user?.id}`,
            {},
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Verificação do e-mail do usuário
    /* ---------------------------------------------- */

    static verifyMailCode = async (values: any) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)

        const { data } = await api.post(
            `${Env.apiURL}customer/validation/email/${
                values.input1 +
                values.input2 +
                values.input3 +
                values.input4 +
                values.input5
            }`,
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Enviar código de validação de telefone por SMS
    /* ---------------------------------------------- */

    static sendSMSCode = async () => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
        const data = await api.post(
            `${Env.apiURL}customer/verification/sms/${user?.id}`,
            {},
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Verificação de telefone por SMS
    /* ---------------------------------------------- */

    static verifySMSCode = async (values: any) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)

        const { data } = await api.post(
            `${Env.apiURL}customer/validation/sms/${
                values.input1 +
                values.input2 +
                values.input3 +
                values.input4 +
                values.input5
            }`,
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Login com Telefone, Envia código SMS
    /* ---------------------------------------------- */

    static sendSMSCodeAuth = async () => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)

        const data = await api.post(
            `${Env.apiURL}auth/login/phone/token`,
            {
                ddd: user?.phoneAreaCode,
                phone: user?.phoneNumber,
                type: "CUSTOMER"
            },
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Verifica código de validação de telefone por SMS para Login
    /* ---------------------------------------------- */

    static verifySMSCodeAuth = async (token: any) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)

        const { data } = await api.post(
            `${Env.apiURL}auth/login/token`, {
                token
            },
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Esqueci minha senha - código sms para o usuário
    /* ---------------------------------------------- */

    static sendSMSCodeForgotPassword = async (phone: string) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
        const data = await api.post(
            `${Env.apiURL}customer/resetPassword/sms/${phone}`,
            {},
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Esqueci minha senha - código para o e-mail do usuário
    /* ---------------------------------------------- */

    static sendEmailCodeForgotPassword = async (email: string) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
        const data = await api.post(
            `${Env.apiURL}customer/resetPassword/email/${email}`,
            {},
            await config,
        )

        return data
    }

    
    /* ---------------------------------------------- */
    /*  Esqueci minha senha - confirma alteração de senha
    /* ---------------------------------------------- */

    static changePasswordConfirm = async (values: any) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)

        const { data } = await api.post(
            `${Env.apiURL}customer/resetPassword`, values,
            await config,
        )

        return data
    }



    
    /* ---------------------------------------------- */
    /*  Salva o Token do celular
    /* ---------------------------------------------- */

    static saveDeviceToken = async (token: number) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
       
        const { data } = await api.put(
            `${Env.apiURL}customer/deviceId/${user?.id}`,
            {
                deviceId: token,
            },
            await config
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Lista de Cartões de crédito
    /* ---------------------------------------------- */

    static loadAllCreditCards = async () => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
       
        const { data } = await api.get(
            `${Env.apiURL}customerCreditCard/customer/get/all`,
            await config
        )

        return data
    }


   


    /* ---------------------------------------------- */
    /*  Lista de todas as ordens
    /* ---------------------------------------------- */

    static loadAllOrders = async () => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
       
        const { data } = await api.get(
            `${Env.apiURL}order/all/customer`,
            await config
        )

        return data
    }
  

    static deleteCreditCard = async (id: number) => {
        const config = this.generateAuthenticationHeader()
       
        const { data } = await api.delete(
            `${Env.apiURL}customerCreditCard/${id}`,
            await config
        )

        return data
    }
  
   
    /* ---------------------------------------------- */
    /*  Salva imagem de perfil
    /* ---------------------------------------------- */

    static saveImage = async (values: any) => {

        const token = await AppStorage.getData(`${Env.keyPrefix}-token`)
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}customer/${user?.id}`;
        const { data } = await api.put(
            url,
            values, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            }
        )

        if(data){
            await AppStorage.storeData(`${Env.keyPrefix}-complete-register-${user?.id}`, true)
        }


        return data
    }


    /* ---------------------------------------------- */
    /*  Lista de faqs
    /* ---------------------------------------------- */

    static getFaqs = async () => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
       
        const { data } = await api.get(
            `${Env.apiURL}faq`,
            await config
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Atualizar documento
    /* ---------------------------------------------- */

    static updateDocument = async (values: any) => {

        const token = await AppStorage.getData(`${Env.keyPrefix}-token`)
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}customer/${user?.id}`;

        const { data } = await api.put(
            url,
            values, 
            await config   
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Atualizar imagem do documento
    /* ---------------------------------------------- */

    static saveImageDocument = async (values: any) => {

        const token = await AppStorage.getData(`${Env.keyPrefix}-token`)
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}customer/document/${user?.id}`;

        const { data } = await api.put(
            url,
            values, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            }
        )

        if(data){
            await AppStorage.storeData(`${Env.keyPrefix}-complete-register-${user?.id}`, true)
        }


        return data
    }

    
    /* ---------------------------------------------- */
    /*  Atualizar Cartão de crédito principal
    /* ---------------------------------------------- */

    static updatePaymentCardPrincipal = async (id: any) => {
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}customerCreditCard/setDefault/${id}`;

        const { data } = await api.put(
            url,
            {
                active: true
            }, 
            await config   
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Lista de banners
    /* ---------------------------------------------- */

    static getBanners = async () => {
        const config = this.generateAuthenticationHeader()
       
        const { data } = await api.get(
            `${Env.apiURL}banner`,
        )

        return data
    }

    
    /* ---------------------------------------------- */
    /*  Lista de Solicitações
    /* ---------------------------------------------- */
    
    static getAllOrders = async () => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const { data } = await api.get(
            `${Env.apiURL}order/all/customer/${user.id}`,
            await config
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Lista de Extrato de Planos
    /* ---------------------------------------------- */
    
    static getExtractContract = async () => {
        const config = this.generateAuthenticationHeader()
       
        const { data } = await api.get(
            `${Env.apiURL}contractPayment/customer/extract`,
            await config
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Lista de Extrato de Solicitacoes
    /* ---------------------------------------------- */
    
    static getExtractOrders = async () => {
        const config = this.generateAuthenticationHeader()
       
        const { data } = await api.get(
            `${Env.apiURL}orderPayment/customer/extract`,
            await config
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Lista de Endereços salvos
    /* ---------------------------------------------- */
    
    static loadAllSavedAddress = async () => {
        const config = this.generateAuthenticationHeader()
       
        const { data } = await api.get(
            `${Env.apiURL}customerAddress/customer/all`,
            await config
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Remover Endereço salvo
    /* ---------------------------------------------- */
    
    static removeAddress = async (id: number) => {
        const config = this.generateAuthenticationHeader()
       
        const { data } = await api.delete(
            `${Env.apiURL}customerAddress/${id}`,
            await config
        )

        return data
    }



    /* ---------------------------------------------- */
    /*  Atualizar Endereço principal
    /* ---------------------------------------------- */

    static updateAddressPrincipal = async (id: any) => {
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}customerAddress/setDefault/${id}`;

        const { data } = await api.put(
            url,
            {
                default: true
            }, 
            await config   
        )

        return data
    }

    
    /* ---------------------------------------------- */
    /*  Adicionar novo endereço
    /* ---------------------------------------------- */

    static newAddress = async (values: any) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)

        const { data } = await api.post(
            `${Env.apiURL}customerAddress`, values,
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Endereço default
    /* ---------------------------------------------- */
    
    static getDefaultAddress = async () => {
        const config = this.generateAuthenticationHeader()

        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
       
        const { data } = await api.get(
            `${Env.apiURL}customerAddress/default`,
            await config
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Lista de Cartões de crédito
    /* ---------------------------------------------- */

    static loadAllServiceTypes = async () => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)
       
        const { data } = await api.get(
            `${Env.apiURL}typeService/customer/all`,
            await config
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Cria uma nova ordem de serviço
    /* ---------------------------------------------- */

    static createOrder = async (values: any) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)

        const { data } = await api.post(
            `${Env.apiURL}order`, values,
            await config,
        )

        return data
    }
    

    /* ---------------------------------------------- */
    /*  Ordem - inicia a busca por um profissional
    /* ---------------------------------------------- */

    static orderSetSearch = async (id: any) => {
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}order/setSearch/${id}`;

        const { data } = await api.put(
            url,
            {}, 
            await config   
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Cancelar orderm
    /* ---------------------------------------------- */

    static cancelOrder = async (id: any) => {
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(`${Env.keyPrefix}-user`)

        const { data } = await api.post(
            `${Env.apiURL}order/customer/cancel/${id}`, {
                customerId: user?.id
            },
            await config,
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Ordem - marca como agendamento
    /* ---------------------------------------------- */

    static orderSetScheduled = async (id: number,date: any) => {
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}order/setScheduled/${id}`;

        const { data } = await api.put(
            url,
            {
                dateScheduled: date
            }, 
            await config   
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Customer - Marca para iniciar o orçamento 
    /* ---------------------------------------------- */

    static customerStartOrder = async (id: any) => {
        const config = this.generateAuthenticationHeader()

        const { data } = await api.post(
            `${Env.apiURL}order/start`, {
                orderId: id
            },
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Aceitar Orçamento
    /* ---------------------------------------------- */

    static acceptOrderBudget = async (id: number) => {
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}order/setAccept/${id}`;

        const { data } = await api.put(
            url,
            {
            }, 
            await config   
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Rejeitar Orçamento
    /* ---------------------------------------------- */

    static rejectOrderBudget = async (id: number) => {
        
        const config = this.generateAuthenticationHeader()
        const user = await AppStorage.getData(
            `${Env.keyPrefix}-user`,
        )

        const url = `${Env.apiURL}order/setReject/${id}`;

        const { data } = await api.put(
            url,
            {
                "description" : "Rejeitado"
            }, 
            await config   
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Avaliar
    /* ---------------------------------------------- */

    static rating = async (values: any) => {
        const config = this.generateAuthenticationHeader()

        const { data } = await api.post(
            `${Env.apiURL}rating/customer`, values,
            await config,
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Ordens Agendadas do dia
    /* ---------------------------------------------- */

    static getScheduledOrdersToday = async () => {
        const config = this.generateAuthenticationHeader()

        const { data } = await api.get(
            `${Env.apiURL}order/scheduleToday/customer`,
            await config,
        )

        return data
    }

    /* ---------------------------------------------- */
    /*  Lista de Solicitações Agendadas
    /* ---------------------------------------------- */
    
    static getAllOrdersScheduled = async () => {
        const config = this.generateAuthenticationHeader()
       
        const { data } = await api.get(
            `${Env.apiURL}order/schedulePending/customer`,
            await config
        )

        return data
    }


    /* ---------------------------------------------- */
    /*  Enviar gorjeta
    /* ---------------------------------------------- */

    static OrderSendTip = async (payload: any) => {
        const config = this.generateAuthenticationHeader()

        const { data } = await api.post(
            `${Env.apiURL}order/sendTip/${payload?.orderId}/${payload?.value}`,{},
            await config,
        )

        return data
    }


}
