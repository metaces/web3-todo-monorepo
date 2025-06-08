export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your actual contract address

export const contractAbi = [
    {
      type: "function",
      name: "completeTask",
      inputs: [
        { name: "_id", type: "uint256", internalType: "uint256" }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "createTask",
      inputs: [
        { name: "_title", type: "string", internalType: "string" },
        { name: "_description", type: "string", internalType: "string" },
        { name: "_dueDate", type: "uint256", internalType: "uint256" }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "getTask",
      inputs: [
        { name: "_id", type: "uint256", internalType: "uint256" }
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct TaskManager.Task",
          components: [
            { name: "id", type: "uint256", internalType: "uint256" },
            { name: "createAt", type: "uint256", internalType: "uint256" },
            { name: "completedAt", type: "uint256", internalType: "uint256" },
            { name: "dueDate", type: "uint256", internalType: "uint256" },
            { name: "title", type: "string", internalType: "string" },
            { name: "description", type: "string", internalType: "string" },
            { name: "isCompleted", type: "bool", internalType: "bool" },
            { name: "owner", type: "address", internalType: "address" },
            { name: "stake", type: "uint256", internalType: "uint256" }
          ]
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "getTaskCount",
      inputs: [],
      outputs: [
        { name: "", type: "uint256", internalType: "uint256" }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "tasks",
      inputs: [
        { name: "", type: "uint256", internalType: "uint256" }
      ],
      outputs: [
        { name: "id", type: "uint256", internalType: "uint256" },
        { name: "createAt", type: "uint256", internalType: "uint256" },
        { name: "completedAt", type: "uint256", internalType: "uint256" },
        { name: "dueDate", type: "uint256", internalType: "uint256" },
        { name: "title", type: "string", internalType: "string" },
        { name: "description", type: "string", internalType: "string" },
        { name: "isCompleted", type: "bool", internalType: "bool" },
        { name: "owner", type: "address", internalType: "address" },
        { name: "stake", type: "uint256", internalType: "uint256" }
      ],
      stateMutability: "view"
    },
    {
      type: "event",
      name: "TaskCreated",
      inputs: [
        { name: "id", type: "uint256", indexed: false, internalType: "uint256" },
        { name: "createAt", type: "uint256", indexed: false, internalType: "uint256" },
        { name: "completedAt", type: "uint256", indexed: false, internalType: "uint256" },
        { name: "dueDate", type: "uint256", indexed: false, internalType: "uint256" },
        { name: "title", type: "string", indexed: false, internalType: "string" },
        { name: "description", type: "string", indexed: false, internalType: "string" },
        { name: "isCompleted", type: "bool", indexed: false, internalType: "bool" },
        { name: "owner", type: "address", indexed: false, internalType: "address" },
        { name: "stake", type: "uint256", indexed: false, internalType: "uint256" }
      ],
      anonymous: false
    }
  ];