import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../context/transactionsContext";

const searchFormSchema = zod.object({
    query: zod.string()
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm(){
    const {searchData} = useContext(TransactionsContext)
    
    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    function handleSearchTransaction(data: SearchFormInputs){
        searchData(data.query)
    }
    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
            <input type="text" placeholder="Busque por transações" {...register('query')}/>
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormContainer>
    )
}