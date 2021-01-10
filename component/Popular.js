import React, { Component } from 'react'
import {View,TextInput,FlatList,Image,Dimensions,ActivityIndicator,RefreshControl, SafeAreaView } from 'react-native'
import styled from 'styled-components'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import MenuBar from '../component/MenuBar'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TestAds from './TestAds'

const screenWidth = Math.round((Dimensions.get('window').width / 2) - 26 );

class Popular extends Component{
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
    axios.get(`https://pixabay.com/api/?key=19491655-3dfabd9a4746ac19b36245e1a&order=popular&safesearch=true&per_page=120&image_type=photo&page=${this.state.page}`)
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

    return (
        <SafeAreaView style={{ flex:1 }}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" />
            <Container>
              {(this.state.isLoading === true ? <ActivityIndicator size="large" color="grey" /> : 
                <View styled={{ width:'100%' }}>
                            <MenuBar name="Popular" />
                          <FlatList style={{ flexWrap:'wrap',paddingLeft:16,paddingRight:16,marginTop:10,width:'100%'}}
                         data={this.state.dataDash}
                         horizontal={false}
                         numColumns={2}
                         renderItem={this._renderItem}
                         keyExtractor={(item) => item.id}
                         onEndReached={this.handleMore}
                         onEndReachedThreshold={0} />
                  <TestAds iklan="ca-app-pub-4630170485339806/4775038128" />
                  </View>
              )} 
            </Container>
          </SafeAreaView>
      )
  }
}

export default Popular;

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