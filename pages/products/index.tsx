import { NextPage } from "next";
import { Header } from "../../src/components/big/header/Header";
import { InputField } from "../../src/components/small/inputfield/InputField";
import { PrimaryButton } from "../../src/components/small/primarybtn/PrimaryBtn";
import { TextField } from "../../src/components/small/textfield/TextField";
import styles from "./NewProductPage.module.scss";

const NewProduct: NextPage = () => {
    const handleSubmit = (e: any) => {
      e.preventDefault()
        console.log("submit")
    }
  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <h1 className={styles.title}>Ny Annons</h1>
      <form onSubmit={handleSubmit} className={styles.formStyle}>
        <InputField placeholder="Bild URL" type="text"/>
        <InputField placeholder="Titel" type="text"/>
        <TextField placeholder="Beskrivning" />
        <InputField placeholder="Pris" type="text"/>
        <InputField placeholder="Kategori *ska vara dropdown senare*" type="text"/>
       <PrimaryButton submit={true} text="Lägg till"  /> 
      </form>
      </div>
    </div>
  );
};

export default NewProduct;