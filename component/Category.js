import React, { Component } from 'react'
import MenuBar from '../component/MenuBar'
import {Alert,SafeAreaView,View,ScrollView,Dimensions,Image,TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import TestAds from './TestAds'

import Bird from '../image/Single-Bird-PNG-Image-with-Transparent-Background.png'
import Flower from '../image/flowers-37403.png'
import Ball from '../image/ball.png'
import Plane from '../image/pngaaa.com-1084190.png'
import Food from '../image/klipartz.com.png'
import Piano from '../image/pngfind.com-music-instruments-png-271984.png'

const dataCategory = [
    {
        id:1,
        key:'backgrounds'
    },
    {
        id:2,
        key:'fashion'
    },
    {
        id:3,
        key:'nature'
    },
    {
        id:4,
        key:'science'
    },
    {
        id:5,
        key:'education'
    },
    {
        id:6,
        key:'feelings'
    },
    {
        id:8,
        key:'health'
    },
    {
        id:9,
        key:'people'
    },
    {
        id:10,
        key:'religion'
    },
    {
        id:11,
        key:'places'
    },
    {
        id:12,
        key:'animals'
    },
    {
        id:13,
        key:'industry'
    },
    {
        id:14,
        key:'computer'
    },
    {
        id:15,
        key:'food'
    },
    {
        id:16,
        key:'sports'
    },
    {
        id:17,
        key:'transportation'
    },
    {
        id:18,
        key:'travel'
    },
    {
        id:19,
        key:'buildings'
    },
    {
        id:20,
        key:'business'
    },
    {
        id:21,
        key:'music'
    },
]

const dataColor = [
    {
        id:1,
        name:'gray',
        color:'#808080'
    },
    // {
    //     id:2,
    //     name:'transparent'
    // },
    {
        id:3,
        name:'red',
         color:'#ff0000'
    },
    {
        id:4,
        name:'orange',
        color:'#ff8000'
    },
    {
        id:5,
        name:'yellow',
        color:'#ffff00'
    },
    {
        id:6,
        name:'green',
        color:'#b7e785'
    },
    {
        id:7,
        name:'turquoise',
        color:'#40e0d0'
    },
    {
        id:8,
        name:'blue',
        color:'#63b5f8'
    },
    {
        id:9,
        name:'lilac',
        color:'#C8A2C8'
    },
    {
        id:10,
        name:'pink',
        color:'#ee72eb'
    },
    {
        id:11,
        name:'white',
        color:'#fff'
    },
    {
        id:13,
        name:'black',
        color:'#000'
    },
    {
        id:14,
        name:'brown',
        color:'#a52a2a'
    },
    // {
    //     id:99,
    //     name:'awds',
    //     color:'#fff'
    // },
]

const dataLast = [
    {
        id:1,
        mode:'stretch',
        image: Bird,
        count:'200',
        color:'#93b5e1',
        name:'Animals',
        key:'animals'
    },
    {
        id:2,
        mode:'cover',
        image: Flower,
        count:'390',
        color:'#f3a1c7',
        name:'Nature',
        key:'nature'
    },
    {
        id:3,
        mode:'stretch',
        image: Piano,
        count:'390',
        color:'#3b6978',
        name:'Music',
        key:'music'
    },
    {
        id:4,
        mode:'cover',
        image: Ball,
        count:'390',
        color:'#ff847c',
        name:'Sports',
        key:'sports'
    },
    {
        id:5,
        mode:'cover',
        image: Food,
        count:'390',
        color:'#a8df65',
        name:'Food',
        key:'food'
    },
    {
        id:6,
        mode:'cover',
        image: Plane,
        count:'390',
        color:'#b2ebf2',
        name:'Travel',
        key:'travel'
    },
]

const screenWidth = Math.round((Dimensions.get('window').width / 2 ) - 20);
const type = Math.round((Dimensions.get('window').width / 4 + 20));

class Category extends Component {
    constructor(props) {
        super(props)
        this.navigation = props.navigation
    }

    render(){
        return(
            <SafeAreaView key={1} style={{ backgroundColor:'#fff',flex:1,paddingLeft:10 }}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" />
            <MenuBar name="Category" />
            <TestAds iklan="ca-app-pub-4630170485339806/6088119799" />
            <ScrollView vertical={true}>
                <ScrollView style={{ display:'flex',marginTop:5,paddingTop:5,paddingBottom:10 }} horizontal={true} automaticallyAdjustContentInsets={true} centerContent={true} alwaysBounceHorizontal={true} indicatorStyle='white' showsHorizontalScrollIndicator={false}>
                    {dataCategory.map((items) => {
                        return(
                           <TouchableOpacity onPress={()=> this.navigation.navigate('DetailCategory',{itemId: items.key,typ:'category'})}>
                                <CatList key={items.id}>
                                    <Text dark heavy small>{items.key}</Text>
                                </CatList>
                           </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <ScrollView style={{ display:'flex',paddingRight:20,marginTop:5,paddingTop:5,paddingBottom:10 }} horizontal={true} automaticallyAdjustContentInsets={true} centerContent={true} alwaysBounceHorizontal={true} indicatorStyle='white' showsHorizontalScrollIndicator={false}>
                {dataColor.map((items) => {
                        return(
                            <TouchableOpacity onPress={()=> this.navigation.navigate('DetailCategory',{itemId: items.name,typ:'colors'})}>
                                <ColorList key={items.id} color={items.color}  />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <ScrollView style={{ display:'flex',paddingRight:20,marginTop:5,paddingTop:5,paddingBottom:10,marginBottom:5 }} horizontal={true} automaticallyAdjustContentInsets={true} centerContent={true} alwaysBounceHorizontal={true} indicatorStyle='white' showsHorizontalScrollIndicator={false}>
                    
                    <TouchableOpacity onPress={() => this.navigation.navigate('DetailCategory',{itemId: 'all',typ:'image_type'})}>
                        <TypeList size={type}>
                            <Text dark heavy small >All</Text>
                        </TypeList>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>  this.navigation.navigate('DetailCategory',{itemId: 'photo',typ:'image_type'})}>
                        <TypeList size={type}>
                            <Text dark heavy small >Photo</Text>
                        </TypeList>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>  this.navigation.navigate('DetailCategory',{itemId: 'illustration',typ:'image_type'})}>
                        <TypeList size={type}>
                            <Text dark heavy small >Illustration</Text>
                        </TypeList>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>  this.navigation.navigate('DetailCategory',{itemId: 'vector',typ:'image_type'})}>
                        <TypeList size={type}>
                            <Text dark heavy small >Vector</Text>
                        </TypeList>
                    </TouchableOpacity>
                    
                </ScrollView>
                <View style={{ marginLeft:5 }}><Text dark heavy nav>Recommend</Text></View>
                <View style={{ marginBottom:10,marginTop:10,display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center' }}>
                    {/* <ScrollView style={{ display:'flex',paddingRight:20,marginTop:5,paddingTop:5,paddingBottom:10 }} horizontal={true} automaticallyAdjustContentInsets={true} centerContent={true} alwaysBounceHorizontal={true} indicatorStyle='white' showsHorizontalScrollIndicator={false}> */}
                    {dataLast.map((items) => {
                            return(
                                <TouchableOpacity onPress={()=> this.navigation.navigate('DetailCategory',{itemId: items.key,typ:'category'})}>
                                    <CatLast bg={items.color} size={screenWidth}>
                                        <Image style={{ width:screenWidth - 30,height:140, resizeMode: items.mode,marginTop:-20,marginBottom:5 }} source={items.image}/>
                                        <Text heavy large>{items.name}</Text>
                                        {/* <Text small>{items.count}</Text> */}
                                    </CatLast>
                                </TouchableOpacity>
                            )
                        })}
                    {/* </ScrollView> */}
                </View>
            </ScrollView>
        </SafeAreaView>
        )
    }
}

export default Category;

const CatList = styled.View`
padding:8px 14px;
border-radius:6px;
/* background-color: #e6e6e6; */
border: 2px solid #f1f1f1;
margin: 0 5px;
align-items:center;
justify-content:center;
`

const TypeList = styled.View`
width:${(props) => props.size};
border: 2px solid #f1f1f1;
margin: 0 5px;
align-items:center;
border-radius:6px;
justify-content:center;
padding:8px 0;
`

const CatLast = styled.View`
    height:180px;
    width:${(props) => props.size};
    background-color:#ffb;
    margin-right:10px;
    padding-left: 20px;
    padding-bottom:10px;
    margin-top:30px;
    border-radius:15px;
    flex-direction:column;
    justify-content:space-evenly;
    display:flex;
    background-color: ${(props) => props.bg};
`

const ColorList = styled.View`
    width:45px;
    height:45px;
    background-color:${(props) => props.color};
    margin: 0 3px;
    border-radius:8px;
    border: 2px solid #f1f1f1;
`

const Text = styled.Text`
  color: ${(props) => props.dark ? "#000" : "#fff"};
  font-family: 'AvenirNext-Reguler';
  text-transform:capitalize;
  
  ${({title,large,small,nav})=>{
    switch(true){
      case title:
        return `font-size:32px`
      case large:
        return `font-size:20px`
      case small:
        return `font-size:16px`
      case nav:
        return `font-size:23px`
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