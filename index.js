#!/usr/bin/env node

let argv = process.argv;
let cmd = argv[2];
let input = argv.slice(3).join(" ");
const fs = require("fs");
const fileName = "tasks.json";

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const time = new Date().getHours();
const minute = new Date().getMinutes();
const seconds = new Date().getSeconds();

if (verifyUserInput()) {
  process.stdout.write("Please give right input");
  process.exit(1);
} else {
  if (cmd == "add") {
    addTask();
  } else if (cmd == "update") {
    updateTask();
  } else if (cmd == "delete") {
    deleteTask();
  } else if (cmd == "mark-done") {
    markDone();
  } else if (cmd == "mark-in-progress") {
    markInProgress();
  } else if (cmd == "list") {
    list();
  } else if (cmd == "list-done") {
    listDone();
  } else if (cmd == "list-todo") {
    listTodo();
  } else if (cmd == "list-in-progress") {
    listInProgress();
  }
}
function addTask() {
  const task = input;
  let data = isFileExist([]);
  let id = createId(data);
  const obj = {
    id,
    description: task,
    status: "todo",
    createdAt: `${day}/${month}/${year}, ${time}:${minute}:${seconds}`,
    updatedAt: `${day}/${month}/${year}, ${time}:${minute}:${seconds}`,
  };
  if (Array.isArray(data[0])) {
    data[0].push(id);
  } else {
    data[0] = [id];
  }
  data.push(obj);
  updateFile(data, id);
}
function updateTask() {
  const id = Number(input);
  if (Number.isNaN(id)) {
    process.stdout.write("Please give right ID of the task");
    process.exit(1);
  } else {
    let data = isFileExist([]);
    if (data.length <= 0) {
      process.stdout.write("There are no task availble");
      process.exit(1);
    }
    let isIdExist = false;

    let i = 1;
    while (data.length > i) {
      if (data[i].id == id) {
        isIdExist = true;
        data[i].description = input.split(" ").slice(1).join(" ");
        data[
          i
        ].updatedAt = `${day}/${month}/${year}, ${time}:${minute}:${seconds}`;
        break;
      }
      i++;
    }
    if (!isIdExist) {
      process.stdout.write("Please give right ID of the task");
      process.exit(1);
    }
    updateFile(data, id);
  }
}
function markInProgress() {
  const id = Number(input);
  if (Number.isNaN(id)) {
    process.stdout.write("Please give right ID of the task");
    process.exit(1);
  } else {
    let data = isFileExist([]);
    if (data.length <= 0) {
      process.stdout.write("There are no task availble");
      process.exit(1);
    }
    let isIdExist = false;

    let i = 1;
    while (data.length > i) {
      if (data[i].id == id) {
        isIdExist = true;
        data[i].status = "in-progress";
        data[
          i
        ].updatedAt = `${day}/${month}/${year}, ${time}:${minute}:${seconds}`;
        break;
      }
      i++;
    }
    if (!isIdExist) {
      process.stdout.write("Please give right ID of the task");
      process.exit(1);
    }
    updateFile(data, id);
  }
}
function markDone() {
  const id = Number(input);
  if (Number.isNaN(id)) {
    process.stdout.write("Please give right ID of the task");
    process.exit(1);
  } else {
    let data = isFileExist([]);
    if (data.length <= 0) {
      process.stdout.write("There are no task availble");
      process.exit(1);
    }
    let isIdExist = false;

    let i = 1;
    while (data.length > i) {
      if (data[i].id == id) {
        isIdExist = true;
        data[i].status = "done";
        data[
          i
        ].updatedAt = `${day}/${month}/${year}, ${time}:${minute}:${seconds}`;
        break;
      }
      i++;
    }
    if (!isIdExist) {
      process.stdout.write("Please give right ID of the task");
      process.exit(1);
    }
    updateFile(data, id);
  }
}
function list() {
  let data = isFileExist([]);
  if (data.length <= 0) {
    process.stdout.write("There are no task availble");
    process.exit(1);
  }
  data = data.splice(1);
  console.log(data);
}
function listDone() {
  let data = isFileExist([]);
  if (data.length <= 0) {
    process.stdout.write("There are no task availble");
    process.exit(1);
  }
  data = data.splice(1);
  data = data.filter((item) => item.status == "done");
  console.log(data);
}
function listTodo() {
  let data = isFileExist([]);
  if (data.length <= 0) {
    process.stdout.write("There are no task availble");
    process.exit(1);
  }
  data = data.splice(1);
  data = data.filter((item) => item.status == "todo");
  console.log(data);
}
function listInProgress() {
  let data = isFileExist([]);
  if (data.length <= 0) {
    process.stdout.write("There are no task availble");
    process.exit(1);
  }
  data = data.splice(1);
  data = data.filter((item) => item.status == "in-progress");
  console.log(data);
}
function deleteTask() {
  const id = Number(input);
  if (Number.isNaN(id)) {
    process.stdout.write("Please give right ID of the task");
    process.exit(1);
  } else {
    let data = isFileExist([]);
    console.log(data[0].includes(id), data[0], "id: ", id);
    if (data.length < 0 || !data[0].includes(id)) {
      process.stdout.write("There are no task with this id");
      process.exit(1);
    }
    let isIdExist = false;

    data[0] = data[0].filter((nm) => nm != id);
    data = data.filter((item) => {
      console.log("item", item);
      if (item.id == id) {
        isIdExist = true;
      } else {
        return item;
      }
    });

    if (!isIdExist) {
      process.stdout.write("Please give right ID of the task");
      process.exit(1);
    }
    updateFile(data, id);
  }
}
function isFileExist(data) {
  if (fs.existsSync("tasks.json")) {
    try {
      const fileData = fs.readFileSync(fileName, "utf-8");
      data = JSON.parse(fileData);
      return data;
    } catch (error) {
      process.stdout.write(`Error creating file: ${error.message}`);
      process.exit(1);
    }
  }
  return [];
}
function updateFile(data, id) {
  fs.writeFile(fileName, JSON.stringify(data), (err) => {
    if (err) {
      process.stdout.write(`Error creating file: ${err.message}`);
      process.exit(1);
    } else {
      process.stdout.write(`# Output: Task (ID: ${id})`);
      process.exit(0);
    }
  });
}
function createId(data) {
  let id = Math.floor(Math.random() * data.length + 1);
  while (Array.isArray(data[0]) && data[0]?.includes(id)) {
    id = Math.floor(Math.random() * (data.length + 1) * 100);
  }
  return id;
}
function verifyUserInput() {
  if (cmd.length <= 0) {
    console.log("1");
    return true;
  } else if (
    cmd != "add" &&
    cmd != "update" &&
    cmd != "delete" &&
    cmd != "mark-in-progress" &&
    cmd != "mark-done" &&
    cmd != "list" &&
    cmd != "list-todo" &&
    cmd != "list-todo" &&
    cmd != "list-in-progress"
  ) {
    console.log("2");
    return true;
  } else {
    console.log("3");
    return false;
  }
}
