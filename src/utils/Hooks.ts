import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
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
  category: string;
  id?: string;
}

export interface PostedByProps {
  email: string;
  id: string;
  displayName: string;
  photoURL: string;
}

export const usePost = async (api: string, data: {}) => {
  await setDoc(doc(collection(db, api)), {
    data,
  });
  console.log(data, 'added to the database');
};

export const useFetch = (api: string, id?: string, userId?: string) => {
  const [product, setProduct] = useState<[]>([]);
  const [postedBy, setPostedBy] = useState<[]>([]);
  const response = { product, postedBy };

  useEffect(() => {
    if (!userId) {
      if (!id) {
        getDocs(collection(db, api)).then((res) => {
          setProduct(
            res.docs.map((item) => {
              return { ...item.data().data.product, id: item.id };
            }) as any
          );
          setPostedBy(
            res.docs.map((item) => {
              return { ...item.data().data.postedBy };
            }) as any
          );
        });
      } else {
        const postById = doc(db, api, id);
        getDoc(postById).then((item) => {
          setProduct({ ...item.data()?.data.product, id: item.id } as any);
          setPostedBy({ ...item.data()?.data.postedBy } as any);
        });
      }
    } else {
      const q = query(
        collection(db, 'posts'),
        where('data.postedBy.id', '==', userId)
      );

      getDocs(q).then((res) => {
        setProduct(
          res.docs.map((item) => {
            return { ...item.data().data.product, id: item.id };
          }) as any
        );
        setPostedBy(
          res.docs.map((item) => {
            return { ...item.data().data.postedBy };
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
  const user = { ...(currentUser as PostedByProps) };

  return { user };
};
