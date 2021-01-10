import React, { Component,useState,useEffect  } from 'react'
import {View,TextInput,Image,Dimensions,ActivityIndicator, SafeAreaView,FlatList } from 'react-native'
import styled from 'styled-components'
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import MenuBar from '../component/MenuBar'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Category from './Category'
import Popular from './Popular'
import About from './About'
import TestAds from './TestAds'

const screenWidth = Math.round((Dimensions.get('window').width / 2) - 26 );

class Dashboard extends Component{
  constructor(props){
    super(props);
    this._isMounted = false
    this.state = {
      dataDash: [],
      isLoading:true,
      refreshing:false,
      page:1
    }
    this.navigation = props.navigation
  }
  
    componentDidMount(){
      this._getData()
    }

    _getData = async () =>{
      this._isMounted = true;
      axios.get(`https://pixabay.com/api/?key=19491655-3dfabd9a4746ac19b36245e1a&order=latest&safesearch=true&per_page=120&image_type=photo&page=${this.state.page}`)
        .then(res => {
          // console.log(res.data)
          const result = res.data.hits  
          this.setState({
            dataDash:this.state.dataDash.concat(result),
            isLoading: false,
            // page: this.state.page + 1
          })
        })
    }

    _renderItem = ({item}) =>{
      return(
        <TouchableOpacity key={item.id} onPress={() => this.navigation.navigate('Details',{
          itemId: item.id
        })}>
          <Card width={screenWidth} height={220}>
          <Image style={{ flex:1,resizeMode: 'cover',width:'100%' }} source={{ uri: item.webformatURL }} />
          </Card>
        </TouchableOpacity>
      )
    }

    handleMore = () =>{
      this.setState({
        page:this.state.page + 1
      })
      this._getData
    }
    
    componentWillUnmount() {
      this._isMounted = false;
    }

    render(){
      const Tab = createBottomTabNavigator();
      
      const Main = () =>{
      const [text, setText] = useState('');
      return (
        <SafeAreaView style={{ flex:1,width:'100%' }}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" />
            <Container>
              {(this.state.isLoading === true ? <ActivityIndicator size="large" color="grey" /> : 
                  <View styled={{ width:'100%' }}>
                            <MenuBar name="Dashboard" />
                            <ContainerSearch>
                                <Icon name="search" size={15} color="#bbbbbb" />
                                <TextInput style={{ marginLeft:5,padding:2 , flex:1 }} placeholder="Search" keyboardType="default" onSubmitEditing={()=> this.navigation.navigate('DetailCategory',{itemId: text,typ:'q'})} onChangeText={text => setText(text)} value={text} />
                        </ContainerSearch>
                          <FlatList style={{ flexWrap:'wrap',paddingLeft:16,paddingRight:16,marginTop:10,width:'100%'}}
                         data={this.state.dataDash}
                         horizontal={false}
                         numColumns={2}
                         renderItem={this._renderItem}
                         keyExtractor={(item) => item.id}
                         onEndReached={this.handleMore}
                         onEndReachedThreshold={0} />
                        <TestAds iklan="ca-app-pub-4630170485339806/5030975411" />
                  </View>
              )} 
            </Container>
          </SafeAreaView>
      )
      }

    return(
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 20;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? 'columns'
              : 'columns';
          } else if (route.name === 'Popular') {
            iconName = focused ? 'star-half-empty' : 'star-half-empty';
            paddingUp = 0;
            paddingDown = 0;
          } else if (route.name === 'Category') {
            iconName = focused ? 'magic' : 'magic';
          } else if (route.name === 'About') {
            iconName = focused ? 'info' : 'info';
          }
  
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
          // return <Navbar icons={iconName} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ffa45b',
        inactiveTintColor: '#bbbbbb',
        labelStyle:{
          fontSize:12
        },
        style:{
          height:60,
          paddingTop:10,
          paddingBottom:10,
          alignItems:'center',
        },
        
      }}
    // tabBar={(props) => <Navbar color="#bbbbbb" />}
    //options={{ tabBarVisible: false }}
    >
      <Tab.Screen name="Dashboard" component={Main} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Popular" component={Popular} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
    )
  }
}

export default Dashboard;

const ContainerSearch = styled.View`
  margin: 0 16px;
  padding: 0 10px;
  height: 39px; 
  border-radius:10px;
  flex-direction:row;
  align-items:center;
  background-color: #f1f1f1;
`
const ContainerMain = styled.View`
  /* margin:10px 16px; */
  /* background-color:red; */
  /* flex:1; */
  justify-content:center;
  flex-direction:row;
  flex-wrap:wrap;
`

const Card = styled.View`
  width: ${(props) => props.width + 'px'};
  height: ${(props) => props.height + 'px'};
  margin: 2px;
  border-radius: 10px;
`

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content:center;
  align-items:center;
`