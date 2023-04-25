# To-do list
by Juho Simojoki

This site is deployed @ [link](https://lucent-cendol-50e6f3.netlify.app/)

## Description

The app is not yet quite finished. The ui is missing some things such as possibiity to navigate backwards from a single task view. The index.js also is quite massive with many functions, but it is divided into parts: Variables, Event listeners and Functions, which makes the navigation a bit easier. Still there are some event listeners that could and should be made more concise.

You can edit single tasks and remove them. This app was my first app ever done with webAPI, of which I am pretty proud. It's not perfect but there is some potential to it.

## Requirements
```
Create a simple application to let users add/remove/edit tasks.
Tasks should have: title, deadline, status
```

Status is made as a border color left to the task:
1. Green: Done
2. Yellow: In progress
3. Red: Not started

## Project tree
```
├── add_task.png
├── edit_task.png
├── package.json
├── README.md
├── src
│   ├── index.html
│   ├── scripts
│   │   └── index.js
│   ├── style.css
│   ├── style.css.map
│   └── styles
│       ├── common-properties
│       │   ├── _buttons.scss
│       │   └── _layout.scss
│       ├── style.scss
│       └── variables
│           ├── _colors.scss
│           └── _fonts.scss
└── task_list.png

```
