export default function ({ store, redirect }) {
  // 检查用户是否已经认证
  if (!store.state.isAuthenticated) {
    return redirect('/auth')
  }
}
