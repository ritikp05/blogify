export default function Islogin() {
  const islogin = localStorage.getItem("login");
  const token = localStorage.getItem("token");
  const UserCredentials = localStorage.getItem("UserCredentials");
  const user = JSON.parse(UserCredentials);
  if (islogin && token && user.hasOwnProperty("name")) {
    const item = JSON.parse(islogin);
    return item;
  } else return false;
}

function UserCredentials() {
  const Credentials = localStorage.getItem("UserCredentials");
  const user =  JSON?.parse(Credentials);
  if (user?.hasOwnProperty("name")) {
    const item = JSON.parse(Credentials);
    return item;
  } else {
    localStorage.removeItem("UserCredentials", "token", "login");
  return {}
  }
}

export { UserCredentials };
