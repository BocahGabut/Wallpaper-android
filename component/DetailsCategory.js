import React, { Component } from 'react'
import {View,FlatList,Image,Dimensions,ActivityIndicator,RefreshControl,TouchableOpacity, SafeAreaView } from 'react-native'
import styled from 'styled-components'
import axios from 'axios'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import TestAds from './TestAds'

const screenWidth = Math.round((Dimensions.get('window').width / 2) - 20 );

class DetailsCategory extends Component{
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
      axios.get(`https://pixabay.com/api/?key=19491655-3dfabd9a4746ac19b36245e1a&${this.props.route.params.typ}=${this.props.route.params.itemId}&safesearch=true&per_page=120&page=${this.state.page}`)
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

    return(
      <SafeAreaView style={{ flex:1 }}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" />
        <Container>
          {(this.state.isLoading === true ? <ActivityIndicator size="large" color="grey" /> : 
             <View styled={{ width:'100%' }}>
                  <Menubar>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-left" size={18} color="#393e46" />
                      </TouchableOpacity> */}
                      <View style={{ flex:1,justifyContent:'space-between', flexDirection:'row',marginLeft:10,alignItems:'center',justifyContent:'space-between' }}>
                        <Text large heavy dark>{this.props.route.params.itemId}</Text>
                    </View>
                  </Menubar>
                          <FlatList style={{ flexWrap:'wrap',paddingLeft:16,paddingRight:16,marginTop:10,width:'100%'}}
                         data={this.state.dataDash}
                         horizontal={false}
                         numColumns={2}
                         renderItem={this._renderItem}
                         keyExtractor={(item) => item.id}
                         onEndReached={this.handleMore}
                         onEndReachedThreshold={0} />
                         <TestAds iklan="ca-app-pub-4630170485339806/8522711446" />
            </View>
          )} 
      </Container>
      </SafeAreaView>
    )
  }
}

export default DetailsCategory;

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

const Text = styled.Text`
  color: ${(props) => props.dark ? "#000" : "#fff"};
  font-family: 'AvenirNext-Reguler';
  text-transform:capitalize;

  ${({title,large,small,nav})=>{
    switch(true){
      case title:
        return `font-size:32px`
      case large:
        return `font-size:22px`
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