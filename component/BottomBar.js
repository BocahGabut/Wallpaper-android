import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from './Dashboard'
// import Category from './Category'

const Tab = createBottomTabNavigator();

const BottomBar = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Dashboard} />
            {/* <Tab.Screen name="Contact" component={Category} /> */}
        </Tab.Navigator>
    )
}

export default BottomBar;