import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { Repository } from '../interfaces/Repository';
import './RepoItem.css';
import React from 'react';
import { pencil, trash } from 'ionicons/icons';

const RepoItem: React.FC<Repository>= (repository) =>{
    return(
            <IonItemSliding>
            <IonItem>
              <IonThumbnail slot="start">
                <img 
                src={repository.owner.avatar_url} 
                alt='Avatar'
                />
              </IonThumbnail>
              <IonLabel>
                <h3>{repository.name}</h3>
                <p>{repository.description}</p>
                {repository.language&&(
                  <p>
                    <strong>Lenguaje:</strong>{repository.language}
                  </p>
                )}
              </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption>
                <IonIcon icon={pencil} slot="icon-only"></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger">
                <IonIcon icon={trash} slot="icon-only"></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
    )

};

export default RepoItem;
