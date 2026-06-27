import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { Repository } from '../interfaces/Repository';
import { fetchRepositories } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';


const Tab1: React.FC = () => {
  const [repositoryList, setRepoitoryList] = React.useState<Repository[]>([]);
  const [loading,setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg]= React.useState('');

  const fetchRepos = async() => {
    setLoading(true);
    try{
      const repos = await fetchRepositories();
      setRepoitoryList(repos);
    } catch(error){
      console.error('Error obteniendo repositorios:', error);
      setErrorMsg('Error obteniendo repositorios'+ (error as Error).message)
    } finally{
      setLoading(false);
    }
  };

  useIonViewWillEnter(()=>{
    fetchRepos();
  });

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

          {repositoryList.map((repo)=>(
            <RepoItem{...repo} key={repo.id}/>
          ))}
 
        </IonList>
        {loading&&<LoadingSpinner ></LoadingSpinner>}
        {errorMsg !='' &&<IonText color="danger">{errorMsg}</IonText>}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
