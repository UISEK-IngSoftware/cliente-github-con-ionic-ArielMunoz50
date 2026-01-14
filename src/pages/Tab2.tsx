import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import './Tab2.css';
import { useState } from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { create } from 'ionicons/icons';
import { createRepository } from '../services/GithubService';
import { useHistory } from 'react-router';

const Tab2: React.FC = () => {

  const history = useHistory();

  const RepoFormData : RepositoryItem={
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language:null,
  };


  const setRepoName=(value:string)=>{
    RepoFormData.name=value;
  };

  const setRepoDescription=(value:string)=>{
    RepoFormData.description=value;
  }

  const saveRepository=()=>{
    if (RepoFormData.name.trim() ==='') {
      alert('El nombre del repositorio es obligatorio.');
      return;
    }

    createRepository(RepoFormData)
    .then(() => {history.push('/tab1');})
    .catch(() => {
      alert('Hubo un error al crear el repositorio.');
    });
  }

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
            value={RepoFormData.name}
            onIonChange={(e) => setRepoName(e.detail.value!)}
          />

          <br />

          <IonInput
            label="Descripción del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Ingresar Descripción"
            value={RepoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
          />

        </div>

        <IonButton
          expand="block"
          onClick={saveRepository}
          style={{ padding: '16px', margin: '24px 100px' }}
        >
          Guardar
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
