import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "mouseenter:h1": this.onHeaderHover,
      "drag:div": this.onDragDiv,
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick,
    };
  }

  onButtonClick(): void {
    console.log("button was clicked");
  }

  onHeaderHover(): void {
    console.log("H1 was hovered over");
  }

  onDragDiv(): void {
    console.log("Div was dragged");
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input.value;
      this.model.setName(name);
    }
  };

  onSaveClick = (): void => {
    this.model.save();
  };

  template(): string {
    return `
            <div>
                <h1>User Detail</h1>
                <div> User Name: ${this.model.get("name")} </div>
                <div> User Age: ${this.model.get("age")} </div>
                <button class="set-name">Set Name</button>
                <button class="set-age">Set Random Age</button>
                <button class="save-model">Save User</button>
            </div>
        `;
  }
}
