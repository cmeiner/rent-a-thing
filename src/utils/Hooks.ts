import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { db } from '../firebase/Firebase';

export interface PostProps {
  title: string;
  desc: string;
  img: string;
  price: string;
  category: string;
  postedBy: UserProps;
  id?: string;
}

export interface UserProps {
  email: string;
  id: string;
  displayName: string;
  photoUrl: string;
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
  }, [api, id]);

  return { response };
};

// spreads user-state (use user.id to check if user is logged in)
export const GetUser = () => {
  const { currentUser } = useContext(AuthContext);
  const user = { ...(currentUser as UserProps) };

  return { user };
};
