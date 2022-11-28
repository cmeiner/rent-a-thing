import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Firebase";

const postsRef = collection(db, "posts");
const usersRef = collection(db, "users");

export interface PostProps {
  title?: string;
  desc?: string;
  picture?: string;
  price?: string;
  id?: string;
}

export const usePost = async (api: string, data: {}) => {
  await setDoc(doc(collection(db, api)), {
    data,
  });
  console.log(data, "added to the database");
};

// export const useFetch = async (api: string, id?: string) => {
//   const querySnapshot = await getDocs(collection(db, api));
//   querySnapshot.forEach((doc) => {
//     const response = doc.data();
//     console.log(response);
//   });
// };

export const useFetch = (api: string, id?: string) => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getDocs(collection(db, api)).then((res) => {
      setResponse(
        res.docs.map((item) => {
          return { ...item.data().data };
        }) as any
      );
    });
  }, []);

  return { response };
};
