import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

function Home() {
    const [postLists, setPostList] = useState([]);

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc);

    }

    // variable qui renvoit à la table bdd de firebase avec "posts" le nom de la table que nous avons crée dans le Firestore
    const postsCollectionRef = collection(db, "posts");
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletePost]);
    //on utilise le useEffect pour intégrer les articles de la bdd Firebase => dans le rendu de ma page:
    // useEffect(() => {
    //     // je déclare:  fonction getPost qui récupère les articles de la bdd via getDocs de Firebase qui récupère tous les données de la table posts

    //     const getPosts = async () => {
    //         const data = await getDocs(postsCollectionRef);
    //         // je fais un map sur les datas que je récupère, et pour chaque doc je déverse toutes les datas avec le spread opartor et je crée un Id
    //         // cela permet de récupérer un simple array avec author + id + postText + title
    //         // set PostList fonction de modification qui va afficher ce que j'ai récupé avec le map:

    //         // console.log((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    //         setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    //     // j'appelle la fonction dans le useEffect:

    //     getPosts();
    // }, [deletePost]);

    // deleteDoc fonction de firestore pour supprimer:
    //doc de firestore désigne quelle donnée on veut viser
    // id renvoit au post sur lequel on a cliqué sur la corbeille delete
    return (
        <div className="homePage">
            {
                postLists.map((post) => {
                    return <div className="post">
                        <div className="postHeader">
                            <div className="title">
                                <h1>
                                    {post.title}
                                </h1>
                            </div>
                            <div className="deletePost">
                                <button
                                    onClick={() => {
                                        deletePost(post.id);
                                    }}
                                >
                                    {" "}
                                    &#128465;
                                </button>                            </div>
                        </div>
                        <div className="postTextContainer">
                            {post.postText}
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Home