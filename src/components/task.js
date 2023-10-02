import { Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";


const Task = (props) => {
    const { task, deleteTask, updateTask } = props;
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
        setIsMouseOver(false);
    }

    if (isEditMode) {
        return <Card
            component={"div"}
            sx={{
                padding: "5px",
                backgroundColor: "#edf0f5",
                borderRadius: "5px",
                height: "max-content",
                minHeight: "100px",
                cursor: "pointer",
                boxShadow: "none",
                border: "1px solid #e5eefd"
            }}
        >
            <CardContent sx={{ padding: "5px" }}>
                <TextField
                    id="content"
                    label=""
                    multiline
                    fullWidth
                    rows={4}
                    value={task.content}
                    autoFocus
                    onBlur={toggleEditMode}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey) toggleEditMode()
                    }}
                // defaultValue="Default Value"
                />
            </CardContent>
        </Card>
    }

    return (
        <Card
            onClick={toggleEditMode}
            component={"div"}
            sx={{
                padding: "5px",
                backgroundColor: "#edf0f5",
                borderRadius: "5px",
                height: "max-content",
                minHeight: "100px",
                cursor: "pointer",
                boxShadow: "none",
                border: "1px solid #e5eefd"
            }}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            {/* <CardHeader sx={{ padding: "5px", fontSize: "12px" }} size="small" title={task.content} /> */}
            <CardMedia />
            <CardContent sx={{ padding: "5px" }}>
                <Typography variant="body1" sx={{ height: "auto", whiteSpace: "pre-wrap" }}>{task.content}</Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ float: "right" }}>
                {isMouseOver && <IconButton title={"Delete Task"} aria-label="delete" size="small" onClick={() => { deleteTask(task.id) }}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>}
            </CardActions>
        </Card >
    );
};

export default Task;
