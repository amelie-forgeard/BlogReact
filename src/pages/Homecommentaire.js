import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
    const [postLists, setPostList] = useState([]);

    // variable qui renvoit à la table bdd de firebase avec "posts" le nom de la table que nous avons crée dans le Firestore
    const postsCollectionRef = collection(db, "posts");

    //on utilise le useEffect pour intégrer les articles de la bdd Firebase => dans le rendu de ma page:
    useEffect(() => {
        // je déclare:  fonction getPost qui récupère les articles de la bdd via getDocs de Firebase qui récupère tous les données de la table posts
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            // je fais un map sur les datas que je récupère, et pour chaque doc je déverse toutes les datas avec le spread opartor et je crée un Id
            // cela permet de récupérer un simple array avec author + id + postText + title
            // set PostList fonction de modification qui va afficher ce que j'ai récupé avec le map:
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        // j'appelle la fonction dans le useEffect:
        getPosts();
    }, [deletePost]);

    const deletePost = async (id) => {
        const postDoc = doc(db, 'posts-database', id)
        await deleteDoc(postDoc)
        window.location.reload()
    }
    return (
        <div className="homePage">
            {/* // je map sur postList, pour chq post je return une div  */}
            {postLists.map((post) => {
                return (
                    <div className="post">
                        <div className="postHeader">
                            <div className="title">
                                {/* j'intègre le post.title dans un h1 */}
                                <h1> {post.title}</h1>
                            </div>
                            <div className="deletePost">
                                {isAuth && post.author.id === auth.currentUser.uid && (
                                    <button
                                        onClick={() => {
                                            deletePost(post.id);
                                        }}
                                    >
                                        {" "}
                                        &#128465;
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="postTextContainer"> {post.postText} </div>
                        <h3>@{post.author.name}</h3>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;