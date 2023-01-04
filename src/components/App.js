import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "../global/globalStyle.js"
import SignUpComponent from "./signUpComponent.js";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUpComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;