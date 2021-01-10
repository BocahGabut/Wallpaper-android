import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'

const Navbar = ({color,icons}) =>{
    return(
        <View style={{paddingTop:5,paddingBottom:5,paddingLeft:16,paddingRight:16,alignItems:'center',justifyContent:'space-between',flexDirection:'row' }}>
            <NavItems>
                <Icon name={(icons)} size={20} color={ (color) } />
                <Text heavy small >Dashboard</Text>
            </NavItems>
        </View>
    )
}

export default Navbar;

const Text = styled.Text`
  color: ${(props) => props.dark ? "#000" : "#ffa45b"};
  font-family: 'AvenirNext-Reguler';
  
  ${({title,large,small,nav})=>{
    switch(true){
      case title:
        return `font-size:32px`
      case large:
        return `font-size:20px`
      case small:
        return `font-size:11px`
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

const NavItems = styled.View`
    /* padding: 15px 10px; */
    align-items:center;
`