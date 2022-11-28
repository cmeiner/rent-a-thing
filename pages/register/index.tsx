import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Header } from "../../src/components/big/header/Header";
import { InputField } from "../../src/components/small/inputfield/InputField";
import { PrimaryButton } from "../../src/components/small/primarybtn/PrimaryBtn";
import { useFetch, usePost } from "../../src/utils/Hooks";
import styles from "./RegisterPage.module.scss";

const Register: NextPage = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    setData(data);
    usePost("users", data);
    setData({ username: "", email: "", password: "" });
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Skapa konto</h1>
        <form onSubmit={HandleSubmit} className={styles.formStyle}>
          <InputField
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            placeholder={"Name"}
            type={"text"}
          />
          <InputField
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder={"Email"}
            type={"text"}
          />
          <InputField
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder={"Password"}
            type={"text"}
          />
          <div className={styles.button}>
            <PrimaryButton submit={true} text="Skapa konto" />
          </div>
        </form>
        <Link href="/login" className={styles.link}>
          Logga in
        </Link>
      </div>
    </div>
  );
};

export default Register;
