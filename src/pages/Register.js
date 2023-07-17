import {
  Stack,
  TextInput,
  Card,
  Divider,
  Button,
  Title,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import CryptoJS from "crypto-js";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const registerForm = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(ShowLoading());
      // check if email already exists
      const qry = query(
        collection(fireDb, "users"),
        where("email", "==", registerForm.values.email)
      );
      const existingUsers = await getDocs(qry);

      if (existingUsers.size > 0) {
        showNotification({
          title: "User already exists",
          color: "red",
        });
        return;
      } else {
        // encrypt password
        const encryptedPassword = CryptoJS.AES.encrypt(
          registerForm.values.password,
          "financial-tracker"
        ).toString();

        const response = await addDoc(collection(fireDb, "users"), {
          ...registerForm.values,
          password: encryptedPassword,
        });
        if (response.id) {
          showNotification({
            title: "User created successfully",
            color: "green",
          });
        } else {
          showNotification({
            title: "User creation failed",
            color: "red",
          });
        }
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      showNotification({
        title: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card
        sx={{
          width: 400,
          padding: "sm",
        }}
        shadow="lg"
        withBorder
      >
        <Title order={3} align="center">
          Register
        </Title>

        <Divider variant="dotted" my="sm" />

        <form action="" onSubmit={onSubmit}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              name="name"
              {...registerForm.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              name="email"
              type="email"
              {...registerForm.getInputProps("email")}
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              {...registerForm.getInputProps("password")}
            />

            <Button type="submit" color="teal">
              Register
            </Button>
            <Anchor href="/login">Already have an account? Login.</Anchor>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default Register;
