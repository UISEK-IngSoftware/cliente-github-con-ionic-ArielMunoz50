import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter
} from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useState } from 'react';
import './Tab3.css';

import { fetchUserInfo } from '../services/GithubService';
import { Userinfo } from '../interfaces/Userinfo';

const Tab3: React.FC = () => {

  const [userInfo, setUserInfo] = useState<Userinfo | null>(null);

  const loadUserInfo = async () => {
    const info = await fetchUserInfo();
    setUserInfo(info);
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          {userInfo && (
            <>
              <img
                src={userInfo.avatar_url}
                alt={userInfo.name}
                style={{ width: '120px', borderRadius: '50%', margin: '16px auto', display: 'block' }}
              />

              <IonCardHeader>
                <IonCardTitle>{userInfo.name}</IonCardTitle>
                <IonCardSubtitle>@{userInfo.login}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                {userInfo.bio}
              </IonCardContent>
            </>
          )}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
