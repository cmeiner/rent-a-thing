import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 } from 'uuid';
import { Header } from '../../src/components/big/header/Header';
import { FilterCategory } from '../../src/components/filterCategory/FilterCategory';
import { FilesInput } from '../../src/components/small/filesInput/FilesInput';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { TextField } from '../../src/components/small/textfield/TextField';
import { storage } from '../../src/firebase/Firebase';
import { GetUser, usePost } from '../../src/utils/Hooks';
import styles from './NewProductPage.module.scss';

const NewProduct: NextPage = () => {
  const [imageUpload, setImageUpload] = useState();
  const { user } = GetUser();

  const postedBy = {
    displayName: user.displayName,
    email: user.email,
    id: user.id,
    photoURL: user.photoURL,
  };

  const [product, setProduct] = useState({
    title: '',
    desc: '',
    price: '',
    img: '',
    category: 'Övrigt',
  });

  const data = { product, postedBy };

  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProduct({ ...product, img: url });
      });
    });
  }, [imageUpload]);

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usePost('posts', data);
    setProduct({
      title: '',
      desc: '',
      price: '',
      img: '',
      category: 'Övrigt',
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
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Titel"
            type="text"
          />
          <TextField
            value={product.desc}
            onChange={(e) => setProduct({ ...product, desc: e.target.value })}
            placeholder="Beskrivning"
          />
          <InputField
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Pris"
            type="text"
          />
          <FilterCategory
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
          <PrimaryButton
            submit={true}
            text="Lägg till"
            disabled={!product.img}
          />
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
