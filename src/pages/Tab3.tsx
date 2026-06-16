import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard className="card">
            <img
              src="https://avatars.githubusercontent.com/u/191403266?v=4&size=64"
              alt="imagen de perfil"
            ></img>
          </IonCard>
          <IonCardHeader>
            <IonCardTitle>Braulio Castillo</IonCardTitle>
            <IonCardSubtitle>blcastillop</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Estudiante de desarrollo de software</p>
            <p>Universidad Catolica del Ecuador</p>
          </IonCardContent>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
