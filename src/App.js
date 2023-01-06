import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import TimelinePage from "./pages/TimeLinePage/TimelinePage";
import PageView from "./components/View/View";
import { TokenContextProvider } from "./contexts/TokenContext";
import { UserContextProvider } from "./contexts/UserContext";
import PostsByHashtagPage from "./pages/PostsByHashtagPage/PostsByHashtagPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {
  return (
    <BrowserRouter>
      <PageView>
        <GlobalStyle />
        <UserContextProvider>
          <TokenContextProvider>
            <Routes>
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/" element={<SignInPage />} />
              <Route
                path="/hashtag/:hashtag"
                element={<PostsByHashtagPage />}
              />
            </Routes>
          </TokenContextProvider>
        </UserContextProvider>
      </PageView>
    </BrowserRouter>
  );
}

export default App;
