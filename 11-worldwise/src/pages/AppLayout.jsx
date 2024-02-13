import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
      doloribus aperiam inventore quos soluta dolor adipisci quisquam ad, fugit
      facere suscipit fugiat! Aspernatur sed maiores impedit, saepe quisquam
      adipisci harum?
    </div>
  );
}

export default AppLayout;
