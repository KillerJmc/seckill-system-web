import {Token} from "@/auth/token";

export default {
  setToken(state) {
    state.token = Token.get()
  },
  setName(state, name) {
    state.name = name
  },
  setCanApply(state, canApply) {
    state.canApply = canApply
  },
  setApplied(state, appiled) {
    state.applied = appiled
  }
}
