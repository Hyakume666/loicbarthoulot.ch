import { createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GamesView from '../views/GameList.vue';
import NewsView from '../views/NewsView.vue';
import ContactView from '../views/ContactView.vue';
import GameList from '../views/GameList.vue';
import GameDetails from '../views/GameDetails.vue';
import NewsDetail from '../views/NewsDetail.vue';
import AdminMessagesView from '../views/AdminMessagesView.vue';
import LoginView from '../views/LoginView.vue';
import FinishSignIn from '../views/FinishSignIn.vue';


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'adminMessagesView',
      component: AdminMessagesView
    },
    {
      path:'/loginview',
      name:'loginview',
      component: LoginView
    },
    {
      path:'/finishsignin',
      name:'finishsignin',
      component: FinishSignIn
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
    path: '/',
    name: 'GameList',
    component: GameList
  },
  {
    path: '/game/:id',
    name: 'GameDetails',
    component: GameDetails,
    props: true
  },
  {
  path: '/news/:id',
  name: 'NewsDetail',
  component: NewsDetail
}
  ]
})

export default router
