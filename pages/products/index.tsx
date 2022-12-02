import { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { FilterCategory } from '../../src/components/filterCategory/FilterCategory';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { TextField } from '../../src/components/small/textfield/TextField';
import { usePost, UserProps } from '../../src/utils/Hooks';
import styles from './NewProductPage.module.scss';
import { storage } from '../../src/firebase/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { FilesInput } from '../../src/components/small/filesInput/FilesInput';

const NewProduct: NextPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [imageUpload, setImageUpload] = useState();

  const [data, setData] = useState({
    title: '',
    desc: '',
    price: '',
    img: '',
    category: 'Övrigt',
    postedBy: currentUser,
  });

  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setData({ ...data, img: url });
      });
    });
    console.log(data);
  }, [imageUpload]);

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    setData(data);
    usePost('posts', data);
    setData({
      title: '',
      desc: '',
      price: '',
      img: '',
      category: 'Övrigt',
      postedBy: currentUser,
    });
    toast.success('Annons tillagd', {
      position: 'bottom-center',
    });
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Ny Annons</h1>
        <form onSubmit={HandleSubmit} className={styles.formStyle}>
          <FilesInput
            onChange={(e) => setImageUpload(e.currentTarget.files[0])}
            type="file"
          />
          <InputField
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Titel"
            type="text"
          />
          <TextField
            value={data.desc}
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            placeholder="Beskrivning"
          />
          <InputField
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            placeholder="Pris"
            type="text"
          />
          <FilterCategory
            onChange={(e) => setData({ ...data, category: e.target.value })}
          />
          <PrimaryButton submit={true} text="Lägg till" />
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
