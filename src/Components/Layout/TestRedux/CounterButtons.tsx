import React from "react";
import { Button, Space } from "antd"; // Import Ant Design UI
import { useAppDispatch } from "@redux/store";
import { increment, decrement } from "@redux/reducers/test";

const CounterButtons: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Space>
      <Button type="primary" onClick={() => dispatch(increment())}>
        Increase
      </Button>
      <Button type="default" onClick={() => dispatch(decrement())}>
        Decrease
      </Button>
    </Space>
  );
};

export default CounterButtons;
