import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "../provider/AuthProvider";

export default function Homelayout() {
    const { user } = useAuth()

    if (!user) {
        return <Redirect href={"/(auth)/login"} />
    }
    return (
        <>
            <Slot
                // screenOptions={{
                //     headerStyle: {
                //         backgroundColor: 'white',
                //     },
                //     headerTitleAlign: 'center',
                //     headerTintColor: "black",
                //     headerTitleStyle: {
                //         fontWeight: "bold"
                //     },
                //     headerShown: true,
                // }}
            >
            </Slot>
        </>
    );
}
