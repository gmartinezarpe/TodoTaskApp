import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAddNewTask, onDeleteTask, onLoadTasks } from "../store/taskSlice";

export const useTask = () => {
  const dispatch = useDispatch();
  const { tasks, active } = useSelector((state) => state.task);

  const getItemsList = async () => {
    try {
      const {data} = await axios.get("http://localhost:5500/api/items");
      const tasks = data
      dispatch(onLoadTasks(tasks));
      console.log(tasks)
    
    } catch (err) {
      console.log.apply(err);
    }
  };
  const addItem = async (e) => {
    try {
      const {data} = await axios.post("http://localhost:5500/api/item", e)
      console.log({data})
      dispatch(onAddNewTask({...e,id:data.task.id}))
      getItemsList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const data = await axios.delete(
        `http://localhost:5500/api/item/${id}`
      );
      console.log(data)
      dispatch(onDeleteTask({id:data.task._id}))
      
       
    } catch (err) {
      console.log(err);
    }
  };

 
 




  return { tasks, active, getItemsList, addItem, deleteTask };
};
