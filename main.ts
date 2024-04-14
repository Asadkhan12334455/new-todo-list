#! /usr/bin/env node

import inquirer from "inquirer";  

import chalk from "chalk";  

console.log(chalk.yellowBright("\n \t Welcome to the Todo List: \n"))

let todosList: string[] = [];
let loop = true; 
async function todos() {
    while (loop) { 
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "TODO",
                message: chalk.blue("What would you like to do with your todo list?"),
                choices: ["Add a new task", "Delete an existing task", "Mark a task as completed", "View your todo list", "Quit"]
            }
        ]);
        switch (answers.TODO) {
            case "Add a new task":
                console.log(chalk.yellow("\n \t Please enter a new task: \n"));
                let addTask = await inquirer.prompt(
                    {
                        type: "input",
                        name: "task",
                        message: chalk.blue("Enter your new task: ")
                    }
                );
                todosList.push(addTask.task); 
                console.log(chalk.yellow(`The tasks ${addTask.task} has been succesfully added to the TODO List `));
                break;
            case"Delete an existing task":
                console.log(chalk.red("\n \t Please select the task you would like to delete: \n"));
                let deleteTask = await inquirer.prompt([
                    {
                        type: "list",
                        name: "delete",
                        message: chalk.yellow("Which task would you like to delete? "),
                        choices: todosList,  // Provide the list of current tasks as choices
                    }
                ]
                );

                const indexToDelete = todosList.indexOf(deleteTask.delete);  // Find the index of the task to delete
                if (indexToDelete !== -1) {
                    todosList.splice(indexToDelete, 1);  
                    console.log(chalk.red(`The task ${deleteTask.delete} has been succesfully deleted from the todo list.`));
                } else {
                    console.log(chalk.red("Task not found!"));
                }
                break;
            case "Mark a task as completed":
                console.log(chalk.yellow("\n \t Please enter the index of the task you would like to mark as completed: \n"));
                let markTask = await inquirer.prompt(
                    {
                        type: "list",
                        name: "mark",
                        message: chalk.blue("Which task you would like to mark as completed? "),
                        choices: todosList, // Provide the list of current tasks as choices
                    }
                );
                todosList[markTask.mark] = "Completed";   // Mark the selected task as completed
                const markIndex = todosList.indexOf(markTask.mark);  // Find the index of the marked task
                if (markIndex !== -1) {

                    // Update the task's status to indicate it's completed

                    todosList[markIndex] = `${todosList[markIndex]} (Completed);`
                    console.log(chalk.blue(`The task "${markTask.mark}" has been successfully marked as completed.`));


                } else {
                    console.log(chalk.blue("Task not found!"));
                }
                break;

            // View your todo list:

            case "View your todo list":

                console.log(chalk.yellow("\n \t Here are your tasks: \n"));

                // Display the list of tasks

                todosList.forEach((task, index) => {
                    console.log(chalk.yellow(`${index + 1}. ${task}`));

                }
                );
                break;
            case "Quit":
                loop = false;      
                console.log(chalk.cyan("See you later Goodbye!"));  
                break;
            default:
                console.log(chalk.red("Invalid choice, Please choose a valid option."));  

        }
    }
}

todos();