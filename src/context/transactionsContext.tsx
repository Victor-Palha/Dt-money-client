import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface ITransactionsContext {
    transactions: Transactions[]
    summary: SummaryInterface
    loadDataApi(): Promise<void>
    searchData(search: string): Promise<void>
    deleteTransaction(id: string): Promise<void>
}
interface Transactions{
    id: string;
    title: string;
    amount: number;
    description: string;
    type: "credit" | "debit";
    created_at: string;
}
export interface SummaryInterface{
    summary?: {
        amount: number;
    }
    outcome?: {
        amount: number;
    }
    income?: {
        amount: number;
    }
}

interface ITransactionsContextProvider {
    children: ReactNode
}
export const TransactionsContext = createContext({} as ITransactionsContext)

export function TransactionsProvider({children}: ITransactionsContextProvider) {

    const [transactions, setTransactions] = useState<Transactions[]>([]);
    const [summary, setSummary] = useState<SummaryInterface>({} as SummaryInterface);

    async function loadDataApi(){
        const reponseTransactions = await api.get('/transactions',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('@TdMoney:sessionId')}`
            }
        })
        const responseSummary = await api.get('/transactions/summary',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('@TdMoney:sessionId')}`
            }
        })

        setSummary(responseSummary.data);
        setTransactions(reponseTransactions.data.transactions);

    }

    async function searchData(search: string){
        const response = await api.get(`/transactions/query?search=${search}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('@TdMoney:sessionId')}`
            }
        })
        setTransactions(response.data.transactions);
    }

    async function deleteTransaction(id: string){
        await api.delete(`/transactions/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('@TdMoney:sessionId')}`
            }
        })
        loadDataApi();
    }

    useEffect(()=>{
        loadDataApi();
    }, [])

    return (
        <TransactionsContext.Provider value={{loadDataApi, summary, transactions, searchData, deleteTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}