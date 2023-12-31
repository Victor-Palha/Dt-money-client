import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyles } from "./styles/global";
import { Transactions } from "./pages/Transactions";
import { TransactionsProvider } from "./context/transactionsContext";

export function App() {

  return (
      <ThemeProvider theme={defaultTheme}>
        <TransactionsProvider>
          <Transactions/>
        </TransactionsProvider>
        <GlobalStyles/>
      </ThemeProvider>
  )
}
