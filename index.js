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
    addTask(input);
  } else if (cmd == "update") {
    updateTask();
  } else if (cmd == "mark-in-progress") {
    console.log(24);
  } else if (cmd == "mark-done") {
    console.log(26);
  } else if (cmd == "list") {
    console.log(28);
  }

  function addTask(task) {
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
}
function updateTask() {
  const id = Number(input[0]);
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
function del() {
  const id = Number(input[0]);
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
      process.stdout.write(`# Output: Task added successfully (ID: ${id})`);
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
  if (input.length <= 0 || cmd.length <= 0) {
    console.log("1");
    return true;
  } else if (
    cmd != "add" &&
    cmd != "update" &&
    cmd != "delete" &&
    cmd != "mark-in-progress" &&
    cmd != "mark-done" &&
    cmd != "list"
  ) {
    console.log("2");
    return true;
  } else {
    console.log("3");
    return false;
  }
}
