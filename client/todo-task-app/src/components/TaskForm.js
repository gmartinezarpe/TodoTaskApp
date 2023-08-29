import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTask } from "../hooks/useTask";

export const TaskForm = ({
  setDescriptionText,
  setStartDate,
  setEndDate,
  description,
  startDate,
  endDate,
}) => {
  const { addItem } = useTask();
  const { RangePicker } = DatePicker;
  const onFinish = (value) => {
    addItem({
      description,
      startDate,
      endDate,
    });
  };

  useEffect(() => {
    addItem();
  }, );

  return (
    <div>
      <Card
        style={{
          margin: "35px",
          padding: "50px",
          marginRight: "400px",
          marginLeft: "400px",
          border: "2px solid",
          marginBottom: "15px",
        }}
      >
        <div className="container">
          <Form
            className="form"
            onSubmit={(e) => addItem(e)}
            onFinish={onFinish}
          >
            <Form.Item>
              <Input
                type="text"
                placeholder="add your task"
                value={description}
                onChange={(e) => setDescriptionText(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                value={[startDate, endDate]}
                onChange={(dates) => {
                  setStartDate(dates[0]);
                  setEndDate(dates[1]);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default TaskForm;
