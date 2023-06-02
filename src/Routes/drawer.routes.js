import { StyleSheet } from "react-native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerView,
} from "@react-navigation/drawer";
import HomePage from "../Pages/Home";
import CreateList from "../Pages/CreateList";

function StyledDrawer(props) {
	return (
		<DrawerContentScrollView style={styles.container} {...props}>
			<DrawerItemList style={styles.box} {...props}>
				<DrawerView style={styles.circle} />
			</DrawerItemList>
		</DrawerContentScrollView>
	);
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
	return (
		<Drawer.Navigator
			initialRouteName="HomePage"
			screenOptions={{
				headerShown: false,
				drawerItemStyle: styles.box,
				drawerActiveTintColor: "#D8E2DC",
				drawerInactiveTintColor: "#9D8189",
			}}
			useLegacyImplementation
			drawerContent={(props) => <StyledDrawer {...props} />}
		>
			<Drawer.Screen name="HomePage" component={HomePage} />
			<Drawer.Screen name="CreateList" component={CreateList} />
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
