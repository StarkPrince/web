import axios from "axios";

import { User } from "./models/User";

const user = new User({ id: 1 });

user.set({ name: "new name", age: 999 });
user.save();

console.log(user.get("name"));
