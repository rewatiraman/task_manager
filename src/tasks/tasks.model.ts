import { Interface } from "readline";

export interface Task{
id:string,
title:string,
description:string,
status: TaskStatus
}

export enum TaskStatus{
  NEW  = "New",
  IN_PROCESS = "In_Process",
  DONE = "Done"
}