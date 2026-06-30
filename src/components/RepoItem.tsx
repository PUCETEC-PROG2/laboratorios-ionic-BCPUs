import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { Repository } from '../interfaces/Repository';
import './RepoItem.css';
import React from 'react';
import { pencil, trash } from 'ionicons/icons';

interface RepoItemProps extends Repository {
  onDelete?: () => void;
  onEdit?: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ onDelete, onEdit, ...repository }) => {
  return (
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
          {repository.language && (
            <p>
              <strong>Lenguaje:</strong> {repository.language}
            </p>
          )}
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption onClick={onEdit}>
          <IonIcon icon={pencil} slot="icon-only"></IonIcon>
        </IonItemOption>
        <IonItemOption color="danger" onClick={onDelete}>
          <IonIcon icon={trash} slot="icon-only"></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
};

export default RepoItem;