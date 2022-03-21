export default function authHeader() {
  // Adds a header to API calls with the users bearer token.
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}