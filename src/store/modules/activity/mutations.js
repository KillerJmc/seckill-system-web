export default {
  setActivity(state, activity) {
    state.activity = activity
  },
  clearAll(state) {
    state.activity = {
      startTime: '',
        product: {
        name: '',
          info: ''
      },
      amount: 0,
        activityInfo: '',
        rule: {
        "workStatus": true,
          "inCreditBlacklist": false,
          "minAge": 0,
          "maxAge": 0,
          "maxOverdueTimes": 0,
          "maxOverdueDays": 0,
          "maxOverdueMoney": 0,
      }
    }
    console.warn("apply: clear store!")
  }
}
