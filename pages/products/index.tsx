import { NextPage } from 'next';
import { useContext, useState } from 'react';
import { AuthContext } from '../../src/auth/AuthContext';
import { Header } from '../../src/components/big/header/Header';
import { FilterCategory } from '../../src/components/filterCategory/FilterCategory';
import { InputField } from '../../src/components/small/inputfield/InputField';
import { PrimaryButton } from '../../src/components/small/primarybtn/PrimaryBtn';
import { TextField } from '../../src/components/small/textfield/TextField';
import { usePost, UserProps } from '../../src/utils/Hooks';
import styles from './NewProductPage.module.scss';

const NewProduct: NextPage = () => {
  const [data, setData] = useState({
    title: '',
    desc: '',
    price: '',
    img: '',
    category: '',
  });
  const { currentUser } = useContext(AuthContext);
  const user = { ...(currentUser as UserProps) };

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    setData(data);
    usePost('posts', data, user);
    setData({
      title: '',
      desc: '',
      price: '',
      img: '',
      category: '',
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
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
