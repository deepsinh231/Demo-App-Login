import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";
import { useAuth } from "../../../provider/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Settings() {
  const { user, logout } = useAuth(); // Access the user and logout function from the auth context
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Make a request to your backend API to fetch user info based on authentication token
        const response = await fetch("http://192.168.31.117:3000/user-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        setUserInfo(data); // Set the user info in state
      } catch (error) {
        console.error("Failed to fetch user info:", error.message);
        Alert.alert("Error", "Failed to fetch user info");
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      // After logout, you can navigate to the login screen or perform any other action
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  console.log(userInfo);
  return (
    <View>
      <Text>Welcome {userInfo?.fullName}</Text>
      <Text>Type is {userInfo?.userType}</Text>
      <Text>ddd</Text>
      <Button
        title="Sign Out"
        onPress={async () => {
          await logout();
          await AsyncStorage.removeItem("@user");
        }}
      />
    </View>
  );
}
