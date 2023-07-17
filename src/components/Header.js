import { Card, Group, Text } from "@mantine/core";
import React from "react";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Card  p={20}>
        <div className="flex justify-between items-center">
          <Text size={20} color="teal" weight="bold">
            Financial Tracker
          </Text>
          <Group>
          <Text>{user?.name}</Text>
          <i className="ri-logout-circle-r-line"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}></i>
          </Group>
        </div>
      </Card>
    </div>
  );
}

export default Header;
