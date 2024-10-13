import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { FIREBASE_AUTH } from "../../config/firebase_config";
;

export const LoginWithEmailPassword = async (email: string, password: string): Promise<any> => {
    try {
        const result = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        const idToken = await result.user.getIdToken();
        const response = await axios.post("http://10.87.20.109:8080/login", {
            token: idToken,
        });
        return response.data
    } catch (error) {
        return error
    }
};
