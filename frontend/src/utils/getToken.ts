export default function getToken() {
  const token = localStorage.getItem('token') || null
  return token
}