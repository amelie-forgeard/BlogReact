import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
    //les 2 states qui gèrent le titre + texte de l'article:
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    // variable qui renvoit à la table bdd de firebase avec "posts" le nom de la table que nous avons crée dans le Firestore
    const postsCollectionRef = collection(db, "posts");

    let navigate = useNavigate();

    //fonction qui gère le clic => soumettre les données vers Firebase - fonction asynchrone +++
    //addDoc permet d'ajouter des données dans la bdd Firebase qui prend en argument 1 : le nom de la table de bdd, argument 2: les datas que l'on veut ajouter
    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            // title et postText renvoient au state déclaré au dessus:
            title,
            postText,
            //   je récupère le nom + id de l'auteur via le auth de GoogleAuth:
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
        //je redirige vers page Accueil:
        navigate("/");
    };
    // au rendu du componenent, si le user n'est pas connecté, rediraction vers la page login
    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Créer un article</h1>
                <div className="inputGp">
                    <label> Titre:</label>
                    <input
                        placeholder="Titre..."
                        // le titre saisi mettra à jour le state:
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> Texte:</label>
                    <textarea
                        placeholder="Votre texte..."
                        // le texte saisi mettra à jour le state:
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>
                <button onClick={createPost}> Enregistrer </button>
            </div>
        </div>
    );
}

export default CreatePost