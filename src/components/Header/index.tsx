import { HeaderContent, HeaderContainer, NewTransactionButton } from "./style";
import * as Dialog from "@radix-ui/react-dialog"
import logoImg from '../../assets/Logo(1).svg';
import { NewTransactionModal } from "../NewTransactionModal";

export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="dt money"/>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova Transação</NewTransactionButton>
                    </Dialog.Trigger>
                    <NewTransactionModal/>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}