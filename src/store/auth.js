import { authService } from '@/services/auth.service';

const initialState = {
  data: null,
  isLoading: false,
};

export const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    data: (state) => state.data,
    isLoadingAuth: (state) => state.isLoading,
  },
  mutations: {
    loading(state) {
      state.isLoading = true;
    },
    loadingSuccess(state) {
      state.isLoading = false;
    },
  },
  actions: {
    async loadProfile({ commit }) {
      commit('loading');

      return await authService
        .profile()
        .then((payload) => {
          return Promise.resolve(payload);
        })
        .catch((error) => {
          return Promise.reject(error);
        })
        .finally(() => {
          commit('loadingSuccess');
        });
    },
    async logout() {
      await authService.logout();
    },
  },
};
