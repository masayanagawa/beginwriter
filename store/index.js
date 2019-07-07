export const state = () => ({
    authEmail: null,
    authUser: null,
    articlelist: [],
    article: [],
    userprofile: []
})

export const mutations = {
    setAuth (state, email) {
        state.authEmail = email
    },
    setUser (state, user) {
        state.authUser = user
    },
    setArticleList (state, list) {
        state.articlelist = list
    },
    setArticle (state, item) {
        state.article = item
    },
    setProfile (state, item) {
        state.userprofile = item
    }
}

export const actions = {
    authSet(state, value) {
        state.commit('setAuth', value)
    },
    userSet(state, value) {
      state.commit('setUser', value)
    },
    articleListSet(state, value) {
        state.commit('setArticleList', value)
    },
    articleSet(state, value) {
        state.commit('setArticle', value)
    },
    profileSet(state, value) {
        state.commit('setProfile', value)
    }
}