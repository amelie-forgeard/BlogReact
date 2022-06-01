import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
    //state qui gère si le user est authentifié ou non:
    //on passe le state aux autres componenets via les props setIsAuth
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    //pour se déconnecter, j'uilise la fct signOut de FB
    const signUserOut = () => {
        signOut(auth).then(() => {
            //j'efface le localstorage:
            localStorage.clear();
            //je rdeconnecte le user en modifiant le state à false:
            setIsAuth(false);
            // je redirige vers la page se connecter:
            //ici je ne peux pas utiliser useNavigate car je suis à l'extR du <Router></Router>
            window.location.pathname = "/login";
        });
    };

    return (
        <Router>
            <nav>
                <Link to="/"> Home </Link>
                {/* si je ne suis pas connecté, je vois le lien pour se logger: 
et à l'inverse quand je suis connecté, je ne vois plus le lien Se connecter */}
                {!isAuth ? (
                    <Link to="/login"> Login </Link>
                ) : (
                    <>
                        {/* et si je suis connecté, montrer le bouton Se déconnecter: */}
                        <Link to="/createpost"> Create Post </Link>
                        <button onClick={signUserOut}> Log Out</button>
                    </>
                )}
            </nav>
            <Routes>
                <Route path="/" element={<Home isAuth={isAuth} />} />
                <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
                <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
        </Router>);
}

export default App;
