import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'

const MenuBar = ({name}) =>{
    return(
        <Menubar>
            <Text nav heavy dark>{(name)}</Text>
            {/* <Icon name="moon-o" size={22} color="#4b5d67" /> */}
        </Menubar>
    )
    // "sun-o","moon-o"
}

export default MenuBar;

const Text = styled.Text`
  color: ${(props) => props.dark ? "#000" : "#fff"};
  font-family: 'AvenirNext-Reguler';
  
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
  justify-content:space-between;
  padding: 10px 16px;
  background-color:#fff;
  margin-top:25px;
`
