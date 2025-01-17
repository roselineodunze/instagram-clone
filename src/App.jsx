import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import AuthPage from "./pages/authpage/AuthPage";
import PageLayout from "./layouts/PageLayout";
import Profilepage from "./pages/userprofile/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";


function App() {
  const [authUser] = useAuthState(auth);

  return (
    <>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={authUser ? <Navigate to="/" /> : <AuthPage />}
          />
          <Route
            path="/:username"
            element={<Profilepage />}
          />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
