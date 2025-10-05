import Image from "next/image";
import styles from "./page.module.css";
import Wallet from "./component/wallet/page.jsx";
import AnnouncementPage from "./page/announcement/page.jsx";
import BottomTabNav from "./component/navigation/page";

export default function Home() {
  return (
    <>
      <Wallet />
      <AnnouncementPage />
    </>
  );
}
