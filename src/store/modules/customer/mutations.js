export default {
  setName(state, name) {
    state.name = name
  },
  setCanApply(state, canApply) {
    state.canApply = canApply
  },
  setApplied(state, appiled) {
    state.applied = appiled
  },
  clearAll(state) {
    state.name = ''
    state.canApply = false
    state.applied = false
    console.warn("customer: clear store!")
  }
}
