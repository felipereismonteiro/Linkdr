import {BrowserRouter, Routes, Route} from "react-router-dom"
import GlobalStyle from "./GlobalStyle";
import TimelinePage from "./TimelinePage";
import PageView from "./View";
import SignUpComponent from "./signUpComponent/signUpComponent"
import SignInComponent from "./signInComponent/signInComponent";
// import { TokenContextProvider } from "../contexts/TokenContext";
// import { UserContextProvider } from "../contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <PageView>
        <GlobalStyle />
        {/* <UserContextProvider>
        <TokenContextProvider> */}
          <Routes>
            <Route path="/timeline" element={<TimelinePage/>}/>
            <Route path="/signup" element={<SignUpComponent />} /> 
            <Route path="/" element={<SignInComponent />} /> 
          </Routes>
        {/* </TokenContextProvider>
        </UserContextProvider> */}

      </PageView>
    </BrowserRouter>
  );
}

export default App;