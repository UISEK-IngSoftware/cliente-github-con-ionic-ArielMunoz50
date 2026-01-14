import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardSubtitle,
  useIonViewDidEnter,
  IonModal,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonToast,
} from "@ionic/react";

import { useState } from "react";
import "./Tab1.css";

import { RepositoryItem } from "../interfaces/RepositoryItem";
import {
  deleteRepository,
  fetchRepositories,
  updateRepository,
} from "../services/GithubService";

import RepoItem from "../components/RepoItem";

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryItem | null>(
    null
  );
  const [originalRepoName, setOriginalRepoName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: "", color: undefined as string | undefined });

  const loadRepos = async () => {
    setLoading(true);
    try {
      const data = await fetchRepositories();
      setRepos(data);
    } finally {
      setLoading(false);
    }
  };

  useIonViewDidEnter(loadRepos);

  const handleEdit = (repo: RepositoryItem) => {
    setSelectedRepo({ ...repo });
    setOriginalRepoName(repo.name);
    setShowModal(true);
  };

  const handleDelete = async (repo: RepositoryItem) => {
    if (!repo.owner) return;

    setLoading(true);
    try {
      await deleteRepository(repo.owner, repo.name);
      setRepos((prev) => prev.filter((r) => r.name !== repo.name));
      setShowToast({ show: true, message: "Tu repositorio ha sido eliminado correctamente", color: "success" });
    } catch (error) {
      setShowToast({
        show: true,
        message: "Error al eliminar el repositorio.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedRepo || !selectedRepo.owner) return;

    const description = selectedRepo.description?.trim() || "";

    setLoading(true);
    try {
      console.log("Updating repository with:", { description });
      await updateRepository(selectedRepo.owner, originalRepoName, {
        description,
      });

      setShowModal(false);
      setSelectedRepo(null);
      setOriginalRepoName("");

      await loadRepos();
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
        <IonCardSubtitle>Estos son los repositorios:</IonCardSubtitle>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={loading} message="Procesando..." />

        <IonToast
          isOpen={showToast.show}
          onDidDismiss={() => setShowToast({ show: false, message: "", color: undefined })}
          message={showToast.message}
          color={showToast.color}
          duration={2000}
        />

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar repositorio</IonTitle>
              <IonButton slot="end" onClick={() => setShowModal(false)}>
                Cerrar
              </IonButton>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            {selectedRepo && (
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    value={selectedRepo.name}
                    disabled={true}
                    onIonChange={(e) =>
                      setSelectedRepo({
                        ...selectedRepo,
                        name: e.detail.value ?? "",
                      })
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Descripción</IonLabel>
                  <IonInput
                    value={selectedRepo.description ?? ""}
                    onIonChange={(e) =>
                      setSelectedRepo({
                        ...selectedRepo,
                        description: e.detail.value ?? "",
                      })
                    }
                  />
                </IonItem>
              </IonList>
            )}

            <IonButton expand="full" onClick={handleSave}>
              Guardar
            </IonButton>
          </IonContent>
        </IonModal>

        <IonList>
          {repos.map((repo) => (
            <RepoItem
              key={`${repo.owner}-${repo.name}`}
              repo={repo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
