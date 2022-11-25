import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from "../../src/components/big/header/Header";
import { InputField } from "../../src/components/small/inputfield/InputField";
import { PrimaryButton } from "../../src/components/small/primarybtn/PrimaryBtn";
import styles from "./LoginPage.module.scss";

const Login: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className={styles.loginPage}>
        <form onSubmit={(e) => e.preventDefault()} className={styles.loginForm}>
          <div className={styles.formHeader}>
            <KeyboardBackspaceIcon
              className={styles.goBack}
              onClick={() => router.back()}
            />
            <h2 className={styles.loginTitle}>Logga in</h2>
          </div>
          <InputField placeholder="Email" type="Email" />
          <InputField placeholder="Password" type="Password" />
          <PrimaryButton
            text="Logga in"
            onClick={() => console.log("knappt")}
          />
          <p className={styles.toRegister}>
            <Link href="/register"> Skapa konto </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
