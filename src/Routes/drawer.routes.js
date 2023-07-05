import { StyleSheet } from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import HomePage from "../Pages/Home";
import CreateSticker from "../Pages/CreateSticker";

function StyledDrawer(props) {
	return (
		<DrawerContentScrollView style={styles.container} {...props}>
			<DrawerItemList style={styles.box} {...props} />
		</DrawerContentScrollView>
	);
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
	return (
		<Drawer.Navigator
			initialRouteName="Notas"
			screenOptions={{
				headerShown: false,
				drawerItemStyle: styles.box,
				drawerActiveTintColor: "#D8E2DC",
				drawerInactiveTintColor: "#9D8189",
			}}
			useLegacyImplementation
			drawerContent={(props) => <StyledDrawer {...props} />}
		>
			<Drawer.Screen name="Notas" component={HomePage} />
			<Drawer.Screen name="Etiquetas" component={CreateSticker} />
		</Drawer.Navigator>
	);
}

export default MyDrawer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D8E2DC",
	},
	box: {
		width: 250,
		height: 45,
		borderRadius: 10,
		backgroundColor: "#F4ACB7",
	},
});
