import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//je récupère le state setIsAUth via les props
function Login({ setIsAuth }) {
    let navigate = useNavigate();

    //se connecter via Goggle:
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            //je stocke la paire clé/valeur dans le localstorage:   setItem(nomClé, valeurClé) => Inspecteur - Appli - LocalStorage
            localStorage.setItem("isAuth", true);
            //quand on est connecté, on passe le setIsAuth à TRUE:
            setIsAuth(true);
            //après connexion on est redirigé sur la page Accueil /
            navigate("/");
        });
    };

    return (
        <div className="loginPage">
            <p>Connectez-vous avec Google</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;