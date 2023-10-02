import { useState } from "react";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Task from "./task";

const Column = (props) => {
    const {
        column,
        deleteColumn,
        updateColumn,
        createTask,
        tasks,
        deleteTask,
        updateTask,
    } = props;
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <Stack
            direction={"column"}
            justifyContent={"space-between"}
            spacing={2}
            sx={{
                padding: "4px",
                width: "350px",
                height: "500px",
                maxHeight: "500px",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
            }}
        >
            {/* Column title */}
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={1}
                sx={{
                    padding: "2px 0px 2px 8px",
                    backgroundColor: "#e5eefd",
                    // border: "1px solid #edf0f5",
                    borderTopLeftRadius: "7px",
                    borderTopRightRadius: "7px",
                }}
            >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Box component="div">{tasks?.length}</Box>
                    <Box onClick={() => setIsEditMode(true)}>
                        {!isEditMode ? (
                            column.title
                        ) : (
                            <TextField
                                size="small"
                                value={column.title}
                                onChange={(e) => updateColumn(column.id, e.target.value)}
                                fullWidth
                                label=""
                                id="fullWidth"
                                hiddenLabel
                                autoFocus
                                onBlur={() => setIsEditMode(false)}
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter") return;
                                    setIsEditMode(false);
                                }}
                            />
                        )}
                    </Box>
                </Stack>
                <IconButton title={"Delete Column"} aria-label="delete" onClick={() => deleteColumn(column.id)}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Stack>

            {/* Column task container */}
            <Stack
                component="div"
                sx={{
                    height: "100%",
                    padding: "2px",
                    overflowX: "hidden",
                    overflowY: "auto",
                }}
                direction={"column"}
                spacing={1}
            >
                {tasks?.map((task) => (
                    <Stack component="div" direction="column" key={task.id}>
                        <Task task={task} deleteTask={deleteTask} updateTask={updateTask} />
                    </Stack>
                ))}
            </Stack>
            {/* Column footer */}
            <Stack>
                <Button
                    size="small"
                    variant="text"
                    onClick={() => createTask(column.id)}
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                >
                    Add Task
                </Button>
            </Stack>
        </Stack>
    );
};

export default Column;
