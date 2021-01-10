import React from 'react'
import { SafeAreaView, View } from 'react-native'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import MenuBar from './MenuBar'
import styled from 'styled-components'
import TestAds from './TestAds'

const About = () =>{
    return(
        <SafeAreaView style={{ flex:1,backgroundColor:'#fff' }}>
            <FocusAwareStatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)" />
            <MenuBar name="About" />
            <View style={{ flex:1,backgroundColor:'#fff',paddingLeft:20,paddingRight:16 }}>
                <Text dark large heavy>Name</Text>
                <Text dark small>  Wallpaper application</Text>
                <Text dark large heavy style={{ marginTop:10 }}>Version</Text>
                <Text dark small>  2.0</Text>
                <Text dark large heavy style={{ marginTop:10 }}>Copyright</Text>
                <Text dark small>  ©2020 wallpaperHD. All rights reserved.</Text>
                <Text dark large heavy style={{ marginTop:10 }}>Powered by</Text>
                <Text dark small>  pixabay.com</Text>
                <Text dark large heavy style={{ marginTop:10 }}>Code & design by</Text>
                <Text dark small>  @boch_gabut</Text>
            </View>
            <View style={{ position:'absolute',bottom:0 }}>
              <TestAds iklan="ca-app-pub-4630170485339806/7306473320" />
            </View>
        </SafeAreaView>
    )
}

export default About;

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
        return `font-size:16px`
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