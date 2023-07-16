import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./style";
import { dateFormetter, priceFormatter } from "../../utils/formatter";
import { TransactionsContext } from "../../context/transactionsContext";
import {Trash} from "phosphor-react"

export function Transactions(){

    const {transactions, deleteTransaction} = useContext(TransactionsContext);

    return (
        <>
            <Header/>
            <Summary/>
            <TransactionsContainer>
                <SearchForm/>
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                            <td width="50%">{transaction.title}</td>
                                <td>
                                    <PriceHighlight variant={transaction.type}>
                                        {priceFormatter.format(transaction.amount)}
                                    </PriceHighlight>
                                </td>
                                <td>{transaction.description}</td>
                                <td>{dateFormetter.format(new Date(transaction.created_at))}</td>
                                <td><button onClick={()=>deleteTransaction(transaction.id)}><Trash size={20}/></button></td>
                            </tr>
                        ))}
            
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </>
    )
}