import { db } from "../firebase/Firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

// const postsRef = collection(db, "posts");
// const usersRef = collection(db, "users");

interface PostProps {
  picture: string;
  title: string;
  desc: string;
  price: string;
}

export const usePost = async (api: string, data: {}) => {
  await setDoc(doc(collection(db, api)), {
    data,
  });
  console.log(data, "added to the database");
};

export const useFetch = async (api: string, id?: string) => {
  const querySnapshot = await getDocs(collection(db, api));
  querySnapshot.forEach((doc) => {
    const response = doc.data();
    console.log(response);
  });
};
