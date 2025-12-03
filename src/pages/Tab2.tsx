import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario del repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario del repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="center-vertical">
          <IonInput
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="solid"
            placeholder="Ingresar Nombre"
          ></IonInput>

          <br />

          <IonInput
            label="Descripción del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Ingresar Descripción"
          ></IonInput>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
