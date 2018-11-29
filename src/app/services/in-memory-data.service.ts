import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '@models/user';
import { ApiResponse } from '@models/api-response';
import { Conversation } from '@models/conversation';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users_get_all: ApiResponse = {
      type: 'members',
      code: 'T0004',
      description: 'Liste des utilisateurs inscrits',
      payload: [
        {id: 1, login: 'Martin', status: {id: 1, name: 'Connecté(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/men/61.jpg'},
        {id: 2, login: 'Martine', status: {id: 3, name: 'Déconnecté(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/women/62.jpg'},
        {id: 3, login: 'Jade', status: {id: 1, name: 'Connecté(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/women/63.jpg'},
        {id: 4, login: 'Thibault', status: {id: 3, name: 'Déconnecté(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/men/64.jpg'},
        {id: 5, login: 'Jimmy', status: {id: 2, name: 'Absent(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/men/65.jpg'},
        {id: 6, login: 'Manuel', status: {id: 2, name: 'Absent(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/men/66.jpg'},
      ],
    };

    const users_get_onlines: ApiResponse = {
      type: 'members',
      code: 'T0005',
      description: 'Liste des utilisateurs connectés',
      payload: [
        {id: 3, login: 'Jade', status: {id: 2, name: 'Absent(e)'}},
        {id: 4, login: 'Thibault', status: {id: 1, name: 'Connecté(e)'}},
        {id: 5, login: 'Jimmy', status: {id: 2, name: 'Absent(e)'}},
        {id: 6, login: 'Manuel', status: {id: 1, name: 'Connecté(e)'}},
      ],
    };

    const discussions: Conversation[] = [
      {id: 1, status: 'member', label: 'Blagues'},
      {id: 2, status: 'creator', label: 'Trucs sérieux'},
      {id: 3, status: 'member', label: 'Yolo'},
    ];

    const discussions_list: ApiResponse = {
      type: 'discussion',
      code: 'T0011',
      description: 'Liste des discussions auxquelles vous prenez part',
      payload: [
        {id: 1, status: 'member', label: 'Blagues'},
        {id: 2, status: 'creator', label: 'Trucs sérieux'},
        {id: 3, status: 'member', label: 'Yolo'},
      ],
    };

    const discussions_get_messages: ApiResponse = {
      type: 'discussion',
      code: 'T0012',
      description: 'Récupération des messages de la discussion',
      payload: [
        {id: 1, author: 'Jade', dateTime: '2018-11-01'},
        {id: 2, author: 'Jimmy', dateTime: '2018-11-01'},
        {id: 3, author: 'Thibault', dateTime: '2018-11-01'},
        {id: 4, author: 'Thibault', dateTime: '2018-11-01'},
        {id: 5, author: 'Manuel', dateTime: '2018-11-01'},
      ],
    };

    const discussions_get_or_create: ApiResponse = {
      type: 'discussion',
      code: 'T0006',
      description: 'Récupération d\'une discussion existante',
      payload: {
        id: 4,
        label: 'Super conv',
        status: 'creator',
        members: [
          {id: 4, login: 'Thibault', status: {id: 3, name: 'Déconnecté(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/men/64.jpg'},
          {id: 5, login: 'Jimmy', status: {id: 2, name: 'Absent(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/men/65.jpg'},
          {id: 6, login: 'Manuel', status: {id: 2, name: 'Absent(e)'}, avatar: 'https://randomuser.me/api/portraits/thumb/men/66.jpg'},
        ],
        lastMessages: [],
      },
    };

    return {
      users_get_all,
      users_get_onlines,
      discussions,
      discussions_list,
      discussions_get_messages,
      discussions_get_or_create,
    };
  }
}
