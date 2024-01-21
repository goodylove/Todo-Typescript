import FullList from "../model/FullList";

interface DomList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DomList {
  static instance: ListTemplate = new ListTemplate();

  ul: HTMLUListElement;
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((listItem) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = listItem.id;
      check.checked = listItem.checked;
      check.tabIndex = 0;
      li.append(check);
      check.addEventListener("change", () => {
        listItem.checked = !listItem.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = listItem.id;
      label.textContent = listItem.item;
      li.append(label);
      const button = document.createElement("button") as HTMLButtonElement;
      button.textContent = "X";
      button.className = "btn";
      li.append(button);
      button.addEventListener("click", () => {
        fullList.removeItem(listItem.id);
        this.render(fullList);
      });
      this.ul.append(li);
    });
  }
}
