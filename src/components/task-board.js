import { Box, Button, Stack } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Column from "./columns";
import { columnsData, tasksData } from "../data";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const TaskBoard = () => {
    const [columns, setColumns] = useState(() => JSON.parse(localStorage.getItem('columns')) || columnsData || []);
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || tasksData || []);

    const createNewColumn = () => {
        const newColumn = {
            id: uuidv4(),
            title: `Column ${columns.length + 1}`,
        };
        setColumns([...columns, newColumn]);
    };

    const deleteColumn = (colId) => {
        const filteredColumns = columns?.filter((col) => col.id !== colId);
        setColumns(filteredColumns);

        const filteredTasks = tasks?.filter(task => task.columnId !== colId);
        setTasks(filteredTasks);
    };

    const updateColumn = (colId, value) => {
        const newColumns = columns.map((col) => {
            if (col.id !== colId) return col;
            return { ...col, title: value };
        });
        setColumns(newColumns);
    };

    const createTask = (columnId) => {
        const newTask = {
            id: uuidv4(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId) => {
        const newTasks = tasks?.filter((task) => task.id !== taskId);

        setTasks(newTasks);
    };

    const updateTask = (taskId, value) => {
        const newTasks = tasks?.map((task) => {
            if (task.id !== taskId) return task;
            return { ...task, content: value };
        });
        setTasks(newTasks);
    };

    useEffect(() => {
        const cols = columns?.length ? columns : columnsData
        const newTasks = tasks?.length ? tasks : tasksData
        localStorage.setItem('columns', JSON.stringify(cols))
        localStorage.setItem('tasks', JSON.stringify(newTasks))
    }, [columns, tasks])

    return (
        <Box p={4} sx={{ height: "100vh", backgroundColor: "#edf0f5" }}>
            <Typography variant="h4">Task Board</Typography>
            <Box sx={{ margin: "10px 0" }}>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={createNewColumn}
                    mt={2}
                >
                    Add Column
                </Button>
            </Box>
            <Stack direction={"row"} spacing={2} pb={1} sx={{ overflowY: "scroll" }}>
                {columns?.map((col) => (
                    <Paper sx={{ width: "350px", borderRadius: "10px" }} key={col.id}>
                        <Column
                            column={col}
                            deleteColumn={deleteColumn}
                            updateColumn={updateColumn}
                            createTask={createTask}
                            tasks={tasks?.filter((task) => task.columnId === col.id)}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    </Paper>
                ))}
            </Stack>
        </Box >
    );
};

export default TaskBoard;
