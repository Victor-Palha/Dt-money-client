import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./style";
import { priceFormatter } from "../../utils/formatter";
import { useContext } from "react";
import { TransactionsContext } from "../../context/transactionsContext";


export function Summary(){
    const {summary} = useContext(TransactionsContext);
    return (
        <SummaryContainer>

            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e"/>
                </header>
                <strong>{summary.income ? priceFormatter.format(summary.income.amount) : "R$ 00,00"}</strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68"/>
                </header>
                <strong>{summary.outcome? priceFormatter.format(summary.outcome.amount) : "R$ 00,00"}</strong>
            </SummaryCard>
            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff"/>
                </header>
                <strong>
                    {summary.summary ? priceFormatter.format(summary.summary.amount) : "R$ 00,00"}
                </strong>
            </SummaryCard>
        </SummaryContainer>
    )
}