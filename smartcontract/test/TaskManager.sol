// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TaskManager} from "../src/TaskManager.sol";

contract TaskManagerTest is Test {
    TaskManager public taskManager;

    function setUp() public {
        taskManager = new TaskManager();
    }

    // Test to check if a task can be created successfully
    function testCreateTask() public {
        address owner = address(0xff);
        vm.label(owner, "owner");
        vm.prank(owner);
        vm.expectEmit();

        emit TaskManager.TaskCreated(
            0, // id
            block.timestamp, // createAt
            0, // completedAt
            0, // dueDate
            "Test Task", // title
            "This is a test task", // description
            false, // isCompleted
            owner, // owner
            0 // stake
        );
        taskManager.createTask("Test Task", "This is a test task", 0);

        // get the task from the task manager using the function getTask
        TaskManager.Task memory task = taskManager.getTask(0);
        // Check if the task was created with the correct values
        assertEq(task.id, 0);
        assertEq(task.createAt, block.timestamp);
        assertEq(task.completedAt, 0);
        assertEq(task.dueDate, 0);
        assertEq(task.title, "Test Task");
        assertEq(task.description, "This is a test task");
        assertEq(task.isCompleted, false);
        assertEq(task.owner, owner);
        assertEq(task.stake, 0); // reward should be zero since no ether was sent
    }

    // test if a task is completed successfully
    function testCompleteTask() public {
        address owner = address(0xff);
        vm.label(owner, "owner");
        vm.prank(owner);
        vm.expectEmit();

        emit TaskManager.TaskCreated(
            0, // id
            block.timestamp, // createAt
            0, // completedAt
            0, // dueDate
            "Test Task", // title
            "This is a test task", // description
            false, // isCompleted
            owner, // owner
            0 // stake
        );
        taskManager.createTask("Test Task", "This is a test task", 0);

        // Complete the task
        taskManager.completeTask(0);
        

        // get the task from the task manager using the function getTask
        TaskManager.Task memory task = taskManager.getTask(0);
        // Check if the task was completed with the correct values
        assertEq(task.isCompleted, true);
        assertGt(task.completedAt, 0); // completedAt should be greater than 0
    }
}
