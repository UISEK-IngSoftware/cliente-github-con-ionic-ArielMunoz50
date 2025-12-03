import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del ususario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Ariel Munoz" src="https://desdelaventana.com.ar/zixpanel/cache/med-fecha_2022-06-18_hora_08-28hs_nro-random_840.jpg" />
      <IonCardHeader>
        <IonCardTitle>Ariel Muñoz</IonCardTitle> 
        <IonCardSubtitle>ArielMunoz50</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Estudiante de informática UISEK</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
