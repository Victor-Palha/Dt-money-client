import { styled } from "styled-components";

export const TransactionsContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5em;

    @media(max-width: 685px){
        padding: 0 5px;
    }
`
export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;
    td{
        padding: 1.25rem 2rem;
        background: ${props => props.theme["gray-700"]};

        &:first-child{
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child{
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
    td button{
        cursor: pointer;
        background: transparent;
        border: 0;
        svg{
            color: ${props => props.theme["red-300"]};
        }
        &:hover svg{
            transition: 0.2s;
            transform: scale(1.2);
        }
    }

    @media (max-width: 685px){
        td{
            padding: 0.75rem;
        }
    }
`
interface PriceHighlightProps{
    variant: 'credit' | 'debit'
}
export const PriceHighlight = styled.span<PriceHighlightProps>`
    color: ${props => props.variant === 'credit' ? props.theme["green-300"] : props.theme["red-300"]};
`