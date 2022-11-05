import Vue from 'vue';
import VueRouter from 'vue-router';
import FreetsPage from './components/Freet/FreetsPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import NotFound from './NotFound.vue';
import CollectionsPage from './components/Collections/CollectionsPage.vue';
import CollectionList from './components/Collections/CollectionListPage.vue';
import CommunitiesPage from './components/Communities/CommunitiesPage.vue'
import ProfilePage from './components/Profile/ProfilePage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: FreetsPage },
  { path: '/account', name: 'Account', component: AccountPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '*', name: 'Not Found', component: NotFound },
  { path: '/collections', name: 'Collections', component: CollectionsPage },
  { path: '/collections/:collectionId', name: 'CollectionList', component: CollectionList },
  { path: '/communities', name: 'Communities', component: CommunitiesPage },
  { path: '/profile/:username', name: 'Profile', component: ProfilePage }
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({ name: 'Account' }); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({ name: 'Login' }); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});

export default router;
