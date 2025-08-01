// import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {/* <div className={styles.auth__imageBox}>
        <div className={styles.auth__image}>
          <Image src={"/log-in-sign-up-image.jpg"} alt={""} fill />
        </div>
      </div> */}
      {children}
    </>
  );
}