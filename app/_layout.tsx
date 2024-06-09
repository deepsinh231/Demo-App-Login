import { Slot, Stack } from "expo-router";
import { AuthProvider } from "./provider/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot></Slot>
    </AuthProvider>
  );
}
