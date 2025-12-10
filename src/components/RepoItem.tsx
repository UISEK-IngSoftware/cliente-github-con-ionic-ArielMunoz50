import { RepositoryItem } from '../interfaces/RepositoryItem';
import './RepoItem.css';
import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';

interface RepoProps {
  repo: RepositoryItem;
}

const RepoItem: React.FC<RepoProps> = ({ repo }) => {
  return (
    <IonItem button detail={true}>

      <IonThumbnail slot="start">
        <img 
          src={
            repo.imageUrl ??
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVECgNJqgmhy3RKb3UHY8IBWwPgbJ6AgSzlEezXXxOUkCmxl02-gocTETE3_zH1k64k81BBLiNeMmvKDcQx1wUVrv4ZAhgH8plg3TnBSm13xKUsm8tuzN1Qa8Aey3PFE-yuGpkKi4ZhdQE/s1600/git-logo.png"
          }
          alt={repo.name}
        />
      </IonThumbnail>

      <IonLabel>
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <p>Propietario: {repo.owner}</p>
        <p>Lenguaje: {repo.language}</p>
      </IonLabel>

    </IonItem>
  );
};

export default RepoItem;
