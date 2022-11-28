import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/Firebase';

const postsRef = collection(db, 'posts');
const usersRef = collection(db, 'users');

export interface PostProps {
  title?: string;
  desc?: string;
  img?: string;
  price?: string;
  id?: string;
}

export const usePost = async (api: string, data: {}) => {
  await setDoc(doc(collection(db, api)), {
    data,
  });
  console.log(data, 'added to the database');
};

export const useFetch = (api: string, id?: string) => {
  const [response, setResponse] = useState<[]>([]);

  useEffect(() => {
    if (!id) {
      getDocs(collection(db, api)).then((res) => {
        setResponse(
          res.docs.map((item) => {
            return { ...item.data().data, id: item.id };
          }) as any
        );
      });
    } else {
      const postById = doc(db, api, id);
      getDoc(postById).then((doc) => {
        const singlePost = { ...doc.data()?.data, id: doc.id } as any;
        setResponse(singlePost);
      });
    }
  }, [id]);

  return { response };
};
