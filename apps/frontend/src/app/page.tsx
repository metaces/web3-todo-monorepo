"use client";
import { StakeCard } from "@/components/common/stakeCard";
import { StatusCard } from "@/components/common/statusCard";
import { TaskCard } from "@/components/common/taskCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contractAbi, contractAddress } from "@/lib/abi";
import { getWalletClient, publicClient } from "@/lib/client";
import { Task } from "@/types/task";
import { PlusIcon, WalletIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Address, getContract } from "viem";

const tasks = [
  {
    title: "Tarefa 1",
    description: "Descrição da tarefa 1",
    createdAt: "2023-10-01",
    dueDate: "2023-10-05",
    stake: 100,
  },
  {
    title: "Tarefa 2",
    description: "Descrição da tarefa 2",
    createdAt: "2023-10-02",
    dueDate: "2023-10-06",
    stake: 200,
  },
  {
    title: "Tarefa 3",
    description: "Descrição da tarefa 3",
    createdAt: "2023-10-03",
    dueDate: "2023-10-07",
    stake: 150,
  },
];


export default function Home() {

  // UseState for account address of type Address from viem
  const [accountAddress, setAccountAddress] = useState<Address>();
  // UseState for contract 
  const [contract, setContract] = useState<any>(null);
  // UseState for array of type Task
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // UseEffect to initialize the contract
  useEffect(() => {
    const walletClient = getWalletClient();
    if (walletClient) {
      const contractInstance = getContract({
        address: contractAddress,
        abi: contractAbi,
        client: { public: publicClient, wallet: walletClient },
      });
      setContract(contractInstance);
      console.log("Wallet client initialized successfully.");
    } else {
      console.error("Failed to initialize wallet client.");
    }
  }, []);
  // Function to connect to the MetaMask wallet
  const connect = async () => {
    try {
      // Connect from getWalletClient from client.ts
      const walletClient = await getWalletClient();
      // Set the account address
      const [address] = await (walletClient as any).requestAddresses();
      setAccountAddress(address);
      console.log("Connected to wallet:", address);
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
      alert("Failed to connect to wallet. Please try again.");
    }
  };

  // Function to disconnect the wallet
  const disconnect = async () => {
    setAccountAddress(undefined);
    console.log("Disconnected from wallet");
    alert("Wallet disconnected.");
  };

  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Web3 Todo List</h1>
          <p className="text-sm text-muted-foreground">A decentralized task management application</p>
          <p className="text-sm text-muted-foreground">Powered by Ethereum and Viem</p>
        </div>
        {!accountAddress? (
        <Button 
          onClick={connect}>
          <WalletIcon />
          <span>Connect Wallet</span>
        </Button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">{accountAddress}</span>
            <Button 
              onClick={disconnect}>
              <XIcon/>
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <StatusCard 
          title="Total de Tarefas "
          value={15}
        />
        <StatusCard 
          title="Tarefas Concluídas"
          value={10}
        />
        <StatusCard 
          title="Tarefas Pendentes"
          value={2}
        />
        <StatusCard 
          title="Tarefas em stake"
          value={3}
        />
      </div>
      <div className="flex items-center justify-between  p-4">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button><PlusIcon/>
              <span>
                Adicionar Tarefa
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogDescription className="flex flex-col gap-4">
                <Label className="block text-sm font-medium text-gray-700">
                  Nome da Tarefa
                </Label>
                <Input
                  type="text"
                  placeholder="Digite o nome da tarefa"
                  className="border border-gray-300 rounded p-2 w-full"
                />
                <Label className="block text-sm font-medium text-gray-700">
                  Descrição
                </Label>
                <Textarea 
                  placeholder="Digite a descrição da tarefa"
                  className="border border-gray-300 rounded p-2 w-full"
                  rows={4}
                />
                <Label className="block text-sm font-medium text-gray-700">
                  Data de Vencimento
                </Label>
                <Input 
                  type="datetime-local"
                  placeholder="Digite a data de vencimento"
                  className="border border-gray-300 rounded p-2 w-full"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StakeCard />
                  <StakeCard />
                  <StakeCard />
                  <StakeCard />
                </div>
                <Button className="mt-4 w-full">
                  <PlusIcon className="mr-2" />
                  Criar Tarefa
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {
          tasks.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <p>Nenhuma tarefa</p>
            </div>
        )
        }
        {tasks.map((task) => (
          <TaskCard 
            key={task.title}
            title={task.title}
            description={task.description}
            createdAt={task.createdAt}
            dueDate={task.dueDate}
            stake={task.stake}
          />
        ))}
      </div>
    </div>
  );
}
