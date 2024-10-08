import { AuthProvider } from "../context/auth.context";
import LoginPage from "./(main_space)/login/login_page"

const IndexPage = () => {
    return (
        <AuthProvider>
            <LoginPage />
        </AuthProvider>
    );
}

export default IndexPage
