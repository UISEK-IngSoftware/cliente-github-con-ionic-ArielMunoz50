import { RepositoryItem } from "../interfaces/RepositoryItem";
import "./RepoItem.css";
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import {
  createOutline,
  trash,
  chevronForwardOutline,
} from "ionicons/icons";
import { useRef, useState } from "react";

interface RepoProps {
  repo: RepositoryItem;
  onEdit: (repo: RepositoryItem) => void;
  onDelete: (repo: RepositoryItem) => void;
}

const RepoItem: React.FC<RepoProps> = ({ repo, onEdit, onDelete }) => {
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* 🔑 CLAVE: toggle usando setIsOpen */
  const toggleSlide = async () => {
    if (!slidingRef.current) return;

    if (isOpen) {
      await slidingRef.current.close();
      setIsOpen(false);
    } else {
      await slidingRef.current.open("end");
      setIsOpen(true);
    }
  };

  const handleEdit = async () => {
    await slidingRef.current?.close();
    setIsOpen(false);
    onEdit(repo);
  };

  const handleDelete = async () => {
    await slidingRef.current?.close();
    setIsOpen(false);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setShowConfirm(false);
    onDelete(repo);
  };

  return (
    <IonItemSliding
      ref={slidingRef}
      onIonDragEnd={(e) => setIsOpen(e.detail.amount > 0)}
    >
      <IonAlert
        isOpen={showConfirm}
        header="Confirmar"
        message="¿Estás seguro de eliminar este repositorio?"
        buttons={[
          { text: "Cancelar", role: "cancel" },
          { text: "OK", handler: confirmDelete },
        ]}
      />

      <IonItemOptions side="end">
        <IonItemOption onClick={handleEdit}>
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonItemOption>
        <IonItemOption color="danger" onClick={handleDelete}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>

      <IonItem button>
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
          <p>{repo.description || "Sin descripción"}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language ?? "N/A"}</p>
        </IonLabel>

        <IonIcon
          icon={chevronForwardOutline}
          className={`slide-hint ${isOpen ? "open" : ""}`}
          onClick={toggleSlide}
        />
      </IonItem>
    </IonItemSliding>
  );
};

export default RepoItem;
