import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { db } from '../firebase/Firebase';

export interface ProductProps {
  title: string;
  desc: string;
  img: string;
  price: string;
  available: boolean;
  category: string;
  id?: string;
  postedBy: string;
  timesRented: number;
}

export interface UserProps {
  email: string;
  id: string;
  displayName: string;
  photoURL: string;
  description: string;
}

export interface RequestProps {
  id?: string;
  productData: {
    title: string;
    desc: string;
    img: string;
    price: string;
    available: boolean;
    category: string;
    id?: string;
    timesRented: number;
    postedBy: string;
  };
  days: number;
  requestedBy: {
    email: string;
    id: string;
    displayName: string;
    photoURL: string;
  };
  connectedOwnersId: string;
}

export const updatePost = async (id: string, data: {}) => {
  const updateAvailable = doc(db, 'posts');
  await updateDoc(updateAvailable, {
    isAvailable: true,
  });
};

export const usePost = async (api: string, data: any) => {
  await setDoc(doc(collection(db, api)), data);
  console.log(data, 'added to the database');
};

export const useFetch = (api: string, id?: string, userId?: string) => {
  const [response, setResponse] = useState<[]>([]);

  useEffect(() => {
    if (!userId) {
      if (!id) {
        getDocs(collection(db, api)).then((res) => {
          setResponse(
            res.docs.map((item) => {
              return { ...item.data(), id: item.id };
            }) as any
          );
        });
      } else {
        const postById = doc(db, api, id);
        getDoc(postById).then((item) => {
          setResponse({ ...item.data(), id: item.id } as any);
        });
      }
    } else {
      const q = query(collection(db, 'posts'), where('postedBy', '==', userId));

      getDocs(q).then((res) => {
        setResponse(
          res.docs.map((item) => {
            return { ...item.data(), id: item.id };
          }) as any
        );
      });
    }
  }, [api, id, userId]);

  return { response };
};

// spreads user-state (use user.id to check if user is logged in)
export const GetUser = () => {
  const { currentUser } = useContext(AuthContext);
  const user = { ...(currentUser as UserProps) };

  return { user };
};
