# Task Tracker CLI

## Overview

**Task Tracker CLI** is a simple command-line application used to track and manage tasks. It allows you to add, update, delete, and monitor tasks directly from the terminal.
This project focuses on core programming fundamentals such as filesystem handling, user input parsing, and building a CLI tool without external dependencies.

## Features

The application allows you to:

- Add, update, and delete tasks
- Mark tasks as **todo**, **in-progress**, or **done**
- List all tasks
- Filter tasks by status:

  - Done
  - Not done (todo)
  - In progress

## Requirements

- Runs entirely from the command line
- Accepts user actions and inputs via positional command-line arguments
- Stores tasks in a JSON file in the current directory
- Automatically creates the JSON file if it does not exist
- Uses only the native filesystem module of the chosen programming language
- No external libraries or frameworks
- Handles errors and edge cases gracefully

## Task Properties

Each task contains the following properties:

- **id**: Unique task identifier
- **description**: Short task description
- **status**: `todo`, `in-progress`, or `done`
- **createdAt**: Date and time when the task was created
- **updatedAt**: Date and time when the task was last updated

These properties are stored and maintained in the JSON file.

## Usage

### Add a New Task

```bash
task-cli add "Buy groceries"
```

**Output:**

```text
Task added successfully (ID: 1)
```

### Update or Delete a Task

```bash
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1
```

### Mark Task Status

```bash
task-cli mark-in-progress 1
task-cli mark-done 1
```

### List Tasks

```bash
task-cli list
```

### List Tasks by Status

```bash
task-cli list done
task-cli list todo
task-cli list in-progress
```

## Purpose

This project is designed to strengthen practical programming skills:

- Command-line argument handling
- JSON-based data persistence
- File system operations
- Defensive coding and error handling

Simple by design. Useful by execution. Built for discipline.
