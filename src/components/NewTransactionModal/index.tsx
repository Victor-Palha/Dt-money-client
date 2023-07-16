import * as Dialog from "@radix-ui/react-dialog";
import { Close, Content, Overlay, TransactionType, TransactionTypeButton } from "./style";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as zod from "zod"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import { useContext } from "react";
import { TransactionsContext } from "../../context/transactionsContext";


const newTransactionFormSchema = zod.object({
    title: zod.string(),
    amount: zod.number(),
    description: zod.string(),
    type: zod.enum(["credit", "debit"])
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>


export function NewTransactionModal(){
    const {loadDataApi} = useContext(TransactionsContext);

    const {register, handleSubmit, control, reset} = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues:{
            type: "credit"
        }
    })

    async function handleNewTransactionForm(data: NewTransactionFormInputs){
        if(localStorage.getItem("@TdMoney:sessionId")){
            await api.post("/transactions", {
                title: data.title,
                amount: data.amount,
                description: data.description,
                type: data.type
            }, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("@TdMoney:sessionId")}`
                }
            })
        }else{
            const response = await api.post("/transactions", {
                title: data.title,
                amount: data.amount,
                description: data.description,
                type: data.type
            })
            console.log(response.data)
            localStorage.setItem("@TdMoney:sessionId", response.data.token)
        }

        loadDataApi();
        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                <Close>
                    <X size={24}/>
                </Close>
                <form onSubmit={handleSubmit(handleNewTransactionForm)}>
                    <input type="text" placeholder="Descrição" required {...register('title')}/>
                    <input type="number" placeholder="Preço" required {...register('amount', {valueAsNumber: true})}/>
                    <input type="text" placeholder="Categoria" required {...register('description')}/>

                    <Controller control={control}
                    name="type"
                    render={({field})=>{
                        return (
                            <TransactionType onValueChange={(value: NewTransactionFormInputs['type'])=> field.onChange(value)} value={field.value}>
                                <TransactionTypeButton variant="income" value="credit">
                                    <ArrowCircleUp size={24}/>
                                    Entrada
                                </TransactionTypeButton>
                                <TransactionTypeButton variant="outcome" value="debit">
                                    <ArrowCircleDown size={24}/>
                                    Saída
                                </TransactionTypeButton>
                            </TransactionType>
                        )
                    }}
                    />

                    <button type="submit">Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}