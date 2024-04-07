export default function Islogin() {
  const islogin = localStorage.getItem("login");
  const token = localStorage.getItem("token");
  const UserCredentials = localStorage.getItem("UserCredentials");
  if (islogin && token !== " " && UserCredentials != {}) {
    const item = JSON.parse(islogin);
    return item;
  } else return false;
}

function UserCredentials() {
  const Credentials = localStorage.getItem("UserCredentials");
  if (Credentials !== "") {
    const item = JSON.parse(Credentials);
    return item;
  } else return {};
}

export { UserCredentials };
