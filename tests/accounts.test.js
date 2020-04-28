// import { shallowMount, createLocalVue } from '@vue/test-utils'
// import Vuex from 'vuex'
// import Accounts from '@/pages/Accounts/Accounts.vue'

// const localVue = createLocalVue()
// localVue.use(Vuex)

// describe('Accounts.vue', () => {
//   let actions
//   let store
//   let state

//   beforeEach(() => {
//     state = {
//       requestPending: false,
//       accounts: {
//         data: 'somedata'
//       }
//     }
//     actions = {
//       getAccounts: jest.fn()
//     }
//     store = new Vuex.Store({
//       modules: {
//         accounts: {
//           state,
//           store,
//           actions
//         }
//       }
//     })
//   })

//   it('is instance of Vue', () => {
//     const wrapper = shallowMount(Accounts, { store, localVue })
//     expect(wrapper.isVueInstance()).toBeTruthy()
//   })
// })
