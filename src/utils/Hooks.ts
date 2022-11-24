import { db } from "../firebase/Firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const postsRef = collection(db, "posts");
const usersRef = collection(db, "users");

interface FetchProps {
  api: string;
  id?: string;
}

export interface PostProps {
  api: string;
  data: DataProps;
}

interface DataProps {
  picture: string;
  title: string;
  desc: string;
  price: string;
}

export const usePost = async ({ api, data }: PostProps) => {
  await setDoc(doc(postsRef), {
    data,
  });
  console.log("added data to database :)");
};

export const useFetch = async ({ api, id }: FetchProps) => {
  const querySnapshot = await getDocs(collection(db, api));
  querySnapshot.forEach((doc) => {
    const response = doc.data();
    console.log(response);
  });
};
