import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter, useIonAlert } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { Repository } from '../interfaces/Repository';
import { fetchRepositories, updateRepository, deleteRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repositoryList, setRepoitoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [presentAlert] = useIonAlert();

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const repos = await fetchRepositories();
      setRepoitoryList(repos);
    } catch (error) {
      console.error('Error obteniendo repositorios:', error);
      setErrorMsg('Error obteniendo repositorios: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  const handleUpdate = (owner: string, repoName: string, currentDesc: string) => {
    presentAlert({
      header: 'Editar Repositorio',
      inputs: [
        { name: 'name', type: 'text', value: repoName, placeholder: 'Nuevo nombre' },
        { name: 'description', type: 'textarea', value: currentDesc, placeholder: 'Nueva descripción' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.name.trim() === '') {
              alert('El nombre del repositorio no puede estar en blanco.');
              return false; 
            }
            setLoading(true);
            
            updateRepository(owner, repoName, { name: data.name, description: data.description })
              .then(() => {
                alert('Repositorio actualizado con éxito!');
                fetchRepos();
              })
              .catch((error) => {
                const errorStr = String(error);
                if (errorStr.includes('422')) {
                  alert('El nombre ingresado ya existe o es inválido.');
                } else if (errorStr.includes('404')) {
                  alert('No se encontró el repositorio a modificar.');
                } else {
                  alert('Hubo un problema al actualizar. Inténtalo más tarde.');
                }
              })
              .finally(() => {
                setLoading(false);
              });
          }
        }
      ]
    });
  };

  const handleDelete = (owner: string, repoName: string) => {
    const confirm = window.confirm(`¿Seguro que deseas eliminar ${repoName}?`);
    if (!confirm) return;

    setLoading(true);
    
    deleteRepository(owner, repoName)
      .then(() => {
        alert('Repositorio eliminado con éxito!');
        fetchRepos(); 
      })
      .catch((error) => {
        const errorStr = String(error);
        if (errorStr.includes('403') || errorStr.includes('401')) {
          alert('No tienes permisos suficientes para eliminar este repositorio.');
        } else if (errorStr.includes('404')) {
          alert('El repositorio no existe o ya fue eliminado.');
        } else {
          alert('Error al eliminar el repositorio. Inténtalo más tarde.');
        }
        console.error("Error al eliminar el repositorio: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repositoryList.map((repo) => (
            <RepoItem 
              {...repo} 
              key={repo.id}
              onDelete={() => handleDelete(repo.owner.login, repo.name)}
              onEdit={() => handleUpdate(repo.owner.login, repo.name, repo.description || '')}
            />
          ))}
        </IonList>
        
        {loading && <LoadingSpinner />}
        {errorMsg !== '' && <IonText color="danger">{errorMsg}</IonText>}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;