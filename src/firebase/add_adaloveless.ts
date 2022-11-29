import { addDoc, collection } from 'firebase/firestore';
import { store } from './Firebase';

// Changed ts-config to ESNext from ES5 to supress await error

// type PostContent = 'user' | 'advertisement'
// type Info = UserContent | AdContent

// type AdContent = {
//   picture: string;
//   title: string;
//   desc: string;
//   price: string;
// }

// type UserContent = {
//   name: string;
//   email: string;
//   password: string;
// }

export const addUser = async (/* type: PostContent, info: Info  */) => {
  try {
    const docRef = await addDoc(collection(store, 'users'), {});
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
