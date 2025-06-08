// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// This contract is a placeholder for the TaskManager functionality.
// It can be expanded with functions to manage tasks, such as adding a task, get a task and updating a task.
contract TaskManager {
    // Struct to represent a task
    struct Task {
        uint256 id;
        uint256 createAt;
        uint256 completedAt;
        uint256 dueDate;
        string title;
        string description;
        bool isCompleted;
        address owner;
        uint256 stake;
    }

    // create a array to store tasks
    Task[] public tasks;// public for simplicity, but consider using a mapping for better performance
    
    // create a function to create a task
    // This function allows users to create a new task with a title, description, and due date.
    /// @notice Creates a new task with the given title, description, and due date.
    function createTask(
        string memory _title,
        string memory _description,
        uint256 _dueDate
    ) public payable {
        Task memory newTask = Task({
            id: tasks.length,
            createAt: block.timestamp,
            completedAt: 0,
            dueDate: _dueDate,
            title: _title,
            description: _description,
            isCompleted: false,
            owner: msg.sender,
            stake: msg.value
        });
        tasks.push(newTask);

        // Emit an event to notify that a task has been created with all fields.
        emit TaskCreated(
            newTask.id, 
            newTask.createAt, 
            newTask.completedAt ,
            newTask.dueDate, 
            newTask.title, 
            newTask.description,
            newTask.isCompleted,
            newTask.owner,
            newTask.stake
        );
    }

    // Event to notify that a task has been created
    event TaskCreated(
        uint256 id,
        uint256 createAt,
        uint256 completedAt,
        uint256 dueDate,
        string title,
        string description,
        bool isCompleted,
        address owner,
        uint256 stake
    );

    // create a function to get a task by id
    /// @notice Retrieves a task by its ID.Returns the task if it exists, otherwise returns an empty struct.
    function getTask(uint256 _id) public view returns (Task memory) {
        require(_id < tasks.length, "Task does not exist");
        return tasks[_id];
    }

    // create a function to complete a task
    /// @notice Marks a task as completed by its ID.
    function completeTask(uint256 _id) public {
        require(_id < tasks.length, "Task does not exist");
        Task storage task = tasks[_id];
        require(!task.isCompleted, "Task is already completed");
        // require(task.owner == msg.sender, "Only the owner can complete the task");

        task.isCompleted = true;
        task.completedAt = block.timestamp;
    }

    // create a function to count the number of tasks
    /// @notice Returns the total number of tasks.
    function getTaskCount() public view returns (uint256) {
        return tasks.length;
    }
}
