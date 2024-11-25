import Home from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from "@expo/vector-icons/Entypo";
import NewPost from "../screens/NewPost";
import Profile from '../screens/Profile'
import SearchResults from "../screens/SearchResults";


const Tab = createBottomTabNavigator();
const HomeMenu = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />
        }}
      />
      <Tab.Screen
        name="NewPost"
        component={NewPost}
        options={{
          tabBarIcon: () => <FontAwesome name="plus-square-o" size={24} color="black" />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-circle" size={24} color="black" />)
        }}
      />
      <Tab.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          tabBarIcon: () => (
            <AntDesign name="search1" size={24} color="black" />)
        }}
      />
    </Tab.Navigator>
  );
};


export default HomeMenu;