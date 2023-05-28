import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
import { UserEdit } from "./views/UserEdit";

const user = User.buildUser({ name: "NAME", age: 20 });
const root = document.getElementById("root");

if (root) {
  const userForm = new UserForm(root, user);
  const userEdit = new UserEdit(root, user);
  console.log("root found");
  console.log(userEdit);
  userEdit.render();
} else {
  throw new Error("Root element not found");
}
