import { useToast } from '@chakra-ui/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextPage } from 'next';
import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
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
  const [disabled, setDisabled] = useState(false);
  const [imageUpload, setImageUpload] = useState();
  const { user } = GetUser();
  const toast = useToast();

  const [data, setData] = useState({
    title: '',
    desc: '',
    price: '',
    img: '',
    category: 'Övrigt',
    available: true,
    timesRented: 0,
    postedBy: user.id,
  });

  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setData({ ...data, img: url });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUpload]);

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usePost('posts', data);
    setData({
      title: '',
      desc: '',
      price: '',
      img: '',
      category: 'Övrigt',
      available: true,
      timesRented: 0,
      postedBy: '',
    });
    toast({
      title: 'Annons tillagd.',
      duration: 2000,
      status: 'success',
      onCloseComplete: () => Router.back(),
    });
  };

  const handlePrice = () => {
    if (disabled) {
      setData({ ...data, price: '' });
    } else {
      setData({ ...data, price: 'Gratis' });
    }
    setDisabled(!disabled);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.newItemHeader}>
          <KeyboardBackspaceIcon
            className={styles.goBack}
            onClick={() => Router.back()}
          />
          <h1 className={styles.title}>Ny Annons</h1>
        </div>
        <form
          onSubmit={HandleSubmit}
          className={styles.formStyle}
          id="productForm"
        >
          <InputField
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Titel"
            type="text"
            id="productTitle"
          />
          <TextField
            value={data.desc}
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            placeholder="Beskrivning"
            id="productDescription"
          />
          <InputField
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            placeholder="Pris"
            type="text"
            disabled={disabled}
            id="productPrice"
          />
          <div className={styles.freeOfChargeContainer}>
            <p className={styles.freeText}>Annonsen ska vara gratis</p>
            <input
              className={styles.freeInput}
              type="checkbox"
              onChange={handlePrice}
            ></input>
          </div>
          <FilterCategory
            onChange={(e) => setData({ ...data, category: e.target.value })}
            id="productCategory"
          />
          <FilesInput
            onChange={(e) => setImageUpload(e.currentTarget.files[0])}
            type="file"
            id="productImage"
          />
          <PrimaryButton submit text="Lägg till" disabled={!data.img} />
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
