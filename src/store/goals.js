import api from '../api'

export default {
  namespaced: true,
  state: {
    items: [],
    selectedId: null
  },
  mutations: {
    setGoals(state, goals) {
      state.items = goals
      if (goals.length > 0 && !state.selectedId) {
        state.selectedId = goals[0].id
      }
    },
    setSelectedGoalId(state, id) {
      state.selectedId = id
    },
    addGoal(state, goal) {
      state.items.unshift(goal)
      state.selectedId = goal.id
    },
    updateGoal(state, updated) {
      const index = state.items.findIndex(g => g.id === updated.id)
      if (index !== -1) state.items[index] = updated
    },
    removeGoal(state, id) {
      state.items = state.items.filter(g => g.id !== id)
      if (state.selectedId === id) {
        state.selectedId = state.items[0]?.id || null
      }
    }
  },
  actions: {
    async fetchGoals({ commit }) {
      const res = await api.get('/api/goals')
      commit('setGoals', res.data)
    },
    async createGoal({ commit }, { title, description }) {
      const res = await api.post('/api/goals', { title, description })
      commit('addGoal', res.data)
    },
    async updateGoal({ commit }, { id, title, description }) {
      const res = await api.put(`/api/goals/${id}`, { title, description })
      if (res.data.updated) {
        commit('updateGoal', { id, title, description })
      }
    },
    async deleteGoal({ commit }, id) {
      await api.delete(`/api/goals/${id}`)
      commit('removeGoal', id)
    }
  },
  getters: {
    allGoals(state) {
      return state.items
    },
    selectedGoal(state) {
      return state.items.find(g => g.id === state.selectedId) || null
    },
    selectedGoalId(state) {
      return state.selectedId
    }
  }
}