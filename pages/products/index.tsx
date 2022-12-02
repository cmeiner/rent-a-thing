import { NextPage } from 'next';
import { FormEvent, useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { FilterCategory } from '../../src/components/filterCategory/FilterCategory';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { TextField } from '../../src/components/small/textfield/TextField';
import { usePost } from '../../src/utils/Hooks';
import styles from './NewProductPage.module.scss';

const NewProduct: NextPage = () => {
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState({
    title: '',
    desc: '',
    price: '',
    img: '',
    category: 'Övrigt',
    postedBy: currentUser,
  });

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          <InputField
            value={data.img}
            onChange={(e) => setData({ ...data, img: e.target.value })}
            placeholder="Bild URL"
            type="text"
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
