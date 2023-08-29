import "./App.css";
import { TaskForm } from "./components/TaskForm";
import { Card, Col, Checkbox, Tooltip, Button, Input } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/es";
import { PlusOutlined } from "@ant-design/icons";
import { useTask } from "./hooks/useTask";
import { useEffect, useState } from "react";

export const MainPage = () => {
  const [description, setDescriptionText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const { getItemsList, tasks, deleteTask } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    setIsChecked((prevChecked) => ({
      ...prevChecked,
      [value]: checked,
    }));
  };

  const getTaskStatus = (endDate) => {
    const currentDate = moment();
    const taskDate = moment(endDate, "YYYY-MM-DD HH:mm"); 
    const diasActuales = taskDate.diff(currentDate, "days");
    const minutosActuales = taskDate.diff(currentDate, "minutes");

    if (diasActuales < 0) {
      return "vencida";
    } else if (diasActuales === 0 && minutosActuales <= 10) {
      return "porvencer";
    } else {
      return "dentro del tiempo";
    }
  };

  useEffect(() => {
    getItemsList();
  }, [getItemsList]);


  return (
    <>
      <div className="App">
        <h1>Cosas por hacer</h1>
        <button
          className="delete-items"
          onClick={async () => {
            for (const id in isChecked) {
              if (isChecked[id]) {
                await deleteTask(id);
              }
            }
            setIsChecked({});
            getItemsList();
          }}
        >
          Liberar seleccionadas
        </button>

        <Input
          placeholder="Buscar por descripción"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200, marginBottom: "10px" }}
        />

        <div className="container">
          {tasks
            .filter(
              (task) =>
                task.description &&
                task.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((task) => (
              <Col key={task._id} task={task}>
                <Card
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "600px",
                    height: "100px",
                    margin: "0 auto 20px",
                    padding: "10px",
                    border: "2px solid",
                    marginBottom: "15px",
                    backgroundColor:
                      getTaskStatus(task.endDate) === "vencida"
                        ? "#FF6B6B"
                        : getTaskStatus(task.endDate) === "porvencer"
                        ? "#FFD700"
                        : "#6BFF6B",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      style={{ marginRight: "10px" }}
                      value={task._id}
                      checked={isChecked[task._id] || false}
                      onChange={handlecheckbox}
                    />
                    <span style={{ marginRight: "10px" }}>
                      {task.description}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        marginBottom: "5px",
                        marginRight: "200px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip
                        title={moment(task.startDate).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                      >
                        <CalendarOutlined
                          style={{ marginRight: "5px", fontSize: "30px" }}
                        />
                      </Tooltip>
                      {moment(task.startDate).format("DD-MM-YYYY HH:mm:ss")}
                    </div>
                    <div
                      style={{
                        marginRight: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {task.endDate && (
                        <Tooltip
                          title={moment(task.endDate).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                        >
                          {task.endDate && (
                            <ClockCircleOutlined
                              style={{ fontSize: "30px", marginRight: "30px" }}
                            />
                          )}
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
        </div>
        <div className="container">
          {showTaskForm && (
            <div>
              <TaskForm
                setDescriptionText={setDescriptionText}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                description={description}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          )}
          <Card
            style={{
              margin: "35px",
              padding: "10px",
              marginRight: "500px",
              marginLeft: "500px",
              border: "2px solid",
              marginBottom: "15px",
            }}
          >
            <Button
              style={{ color: "black", fontSize: 0 }}
              onClick={() => setShowTaskForm(true)} 
            >
              <PlusOutlined style={{ color: "black", fontSize: 25 }} />
            </Button>
          </Card>

          <div></div>
        </div>
      </div>
    </>
  );
};
