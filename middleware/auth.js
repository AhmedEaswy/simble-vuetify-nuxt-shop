export default function ({redirect, store}) {
  let isAuthenticated = store.state.auth.user ? true : false
  if (!isAuthenticated) {
    redirect({name: '/'})
  }
}
