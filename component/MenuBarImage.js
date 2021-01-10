import * as React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'
import { Link } from "react-router-native";

const MenuBar = ({name}) =>{
    return(
        <Menubar>
            <Link underlayColor="#fff" to={`/`}>
                <Icon name="chevron-left" size={21} color="#686d76" />
            </Link>
            <View style={{ flex:1,justifyContent:'space-between', flexDirection:'row',marginLeft:10,alignItems:'center',justifyContent:'space-between' }}>
                <Text large bold >{(name)}</Text>
                {/* <Icon name="moon-o" size={22} color="#4b5d67" /> */}
            </View>
        </Menubar>
    )
    // "sun-o","moon-o"
}

export default MenuBar;

const Text = styled.Text`
  color: ${(props) => props.dark ? "#000" : "#fff"};
  font-family: 'AvenirNext-Reguler';
  text-transform: capitalize;
  
  ${({title,large,small,nav})=>{
    switch(true){
      case title:
        return `font-size:32px`
      case large:
        return `font-size:20px`
      case small:
        return `font-size:13px`
      case nav:
        return `font-size:25px`
    }
  }}

  ${({bold,heavy})=>{
    switch(true){
      case bold:
        return 'font-weight:600'
      case heavy:
        return 'font-weight:700'
    }
  }}

`

const Menubar = styled.View`
  align-items:center;
  flex-direction:row;
  width:100%;
  padding: 10px 16px;
  margin-top:30px;
`