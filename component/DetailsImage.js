import React ,{Component} from 'react'
import {SafeAreaView,ActivityIndicator,View,TouchableOpacity,ToastAndroid,Alert,Button,Share,PermissionsAndroid } from 'react-native'
import styled from 'styled-components'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import axios from 'axios'
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import Icon from 'react-native-vector-icons/FontAwesome'
import RBSheet from "react-native-raw-bottom-sheet";
import RNFetchBlob from 'rn-fetch-blob';

import { RewardedAd, TestIds, RewardedAdEventType } from '@react-native-firebase/admob';

class DetailImage extends Component {
    constructor(props){
        super(props)
        this._isMounted = false
        this.state ={
            dataDash: [],
            isLoading:true,
            onDownload:false,
            getReward:false
        }
        this.itemId = props.route.params
        this.navigation = props.navigation
    }

    componentDidMount(){
        const setJson = JSON.stringify(this.itemId)
        const id = JSON.parse(setJson)
        axios.get(`https://pixabay.com/api/?key=19491655-3dfabd9a4746ac19b36245e1a&id=` + id.itemId,)
        .then(res => {
            // console.log(res.data)
            const result = res.data.hits  
            this.setState({
                dataDash:result,
                isLoading:false
            })
        })
        this.showRewardAd()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    showRewardAd = () => {
        // Create a new instance
        const rewardAd = RewardedAd.createForAdRequest(`ca-app-pub-4630170485339806/2615160090`);

        // Add event handlers
        rewardAd.onAdEvent((type, error) => {
            if (type === RewardedAdEventType.LOADED) {
                rewardAd.show();
                this.setState({
                  getReward:true
                })
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of 5 lives');
                // Alert.alert(
                //     'Reward Ad',
                //     'You just earned a reward of 5 lives',
                //     [
                //       {text: 'OK', onPress: () => console.log('OK Pressed')},
                //     ],
                //     { cancelable: true }
                //   )
            }
        });

        // Load a new advert
        rewardAd.load();
    }

    render(){

      const Progress = () =>{
        return (
          <View style={{ flex:1,backgroundColor:'rgba(20,20,20,0.7)',position:'absolute',zIndex:999,width:'100%',height:'100%',alignItems:'center',justifyContent:'center' }}>
            <ActivityIndicator size="large" color="white" style={{ marginBottom:10 }} />
              <Text >Downloading.....</Text>
            <TouchableOpacity style={{ marginTop:50 }} onPress={()=> this.setState({onDownload:false})}>
              <Text>Click to download on background</Text>
            </TouchableOpacity>
          </View>
        )
      }

      const checkPermission = async (url) => {
    
        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission
    
        if (Platform.OS === 'ios') {
          downloadImage();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              downloadImage(url);
            } else {
              // If permission denied then show alert
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.warn(err);
          }
        }
      };
    
      const downloadImage = (url) => {
        // Main function to download the image
        this.setState({
          onDownload:true
        })
        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download
        let image_URL = url;    
        // Getting the extention of the file
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir + '/wallpaper HD/';
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              'wp_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'Image',
          },
        };
        config(options)
          .fetch('GET', image_URL)
          .then(res => {
            // Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            ToastMessage('Image Downloaded Successfully.');
            this.setState({
              onDownload:false
            })
          });
      };
    
      const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
                 /[^.]+$/.exec(filename) : undefined;
      };

        const onShare = async (url) => {
          try {
            const result = await Share.share({
              message:
                url,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
        }

     const _setWallpaper = (url,type) => {
        switch(type){
          case 'home':
            ManageWallpaper.setWallpaper(
              {
                uri: url,
              },
              this._callback,
              TYPE.HOME,
            );
            break;
          case 'lock':
            ManageWallpaper.setWallpaper(
              {
                uri: url,
              },
              this._callback,
              TYPE.LOCK,
            );
            break;
          case 'both':
            ManageWallpaper.setWallpaper(
              {
                uri: url,
              },
              this._callback,
              TYPE.BOTH,
            );
            break;
        }
       };

       const ToastMessage = (message) =>{
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
       }

       const click_Wp = (url,type) =>{
         if(!_setWallpaper(url,type)){
          ToastMessage('Set Wallpaper Success....')
         }
       }

        return(
            <SafeAreaView style={{ flex:1,justifyContent:'center',backgroundColor:'#000' }}>
                <FocusAwareStatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />
                    {( this.state.getReward === false ? <ActivityIndicator size="large" color="grey" /> : 
                        <View style={{ flex:1 }}>
                        {this.state.dataDash.map((items) =>{
                              return (
                                  <ImageDetails key={items.id} source={{ uri: items.largeImageURL }} style={{ resizeMode:'cover' }} >
                                    <View style={{paddingTop:5,paddingBottom:5,paddingLeft:16,paddingRight:16,alignItems:'center',justifyContent:'space-evenly',flexDirection:'row',position:'absolute',bottom:0,width:'100%',backgroundColor:"rgba(40,40,40,0.7)",flex:1 }}>
                                        <NavItems>
                                            <TouchableOpacity onPress={()=> checkPermission(items.largeImageURL)}>
                                              <Icon name="download" size={25} color="#fff" />
                                            </TouchableOpacity>
                                        </NavItems>
                                        <NavItems>
                                            {/* <TouchableOpacity onPress={()=> createThreeButtonAlert(items.largeImageURL)}> */}
                                            <TouchableOpacity onPress={() => this.RBSheet.open()}>
                                              <Icon name="picture-o" size={25} color="#fff" />
                                            </TouchableOpacity>
                                        </NavItems>
                                        <NavItems>
                                            <TouchableOpacity onPress={() => onShare(items.pageURL)}>
                                            {/* <TouchableOpacity onPress={() => this.showRewardAd()}> */}
                                              <Icon name="share" size={25} color="#fff" />
                                            </TouchableOpacity>
                                        </NavItems>
                                    </View>
                                    <RBSheet
                                        ref={ref => {
                                          this.RBSheet = ref;
                                        }}
                                        height={180}
                                        openDuration={250}
                                        customStyles={{
                                          container: {
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderTopLeftRadius:25,
                                            borderTopRightRadius:25,
                                          }
                                        }}
                                      >
                                        <Content>
                                            <TouchableOpacity onPress={() => click_Wp(items.largeImageURL,'home')}>
                                              <View style={{ padding:10 }}>
                                                <Text dark heavy style={{ fontSize:18 }}>Set as Home Screen</Text>
                                              </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => click_Wp(items.largeImageURL,'lock')}>
                                              <View style={{ padding:10 }}>
                                                <Text dark heavy style={{ fontSize:18 }}>Set as Lock Screen</Text>
                                              </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => click_Wp(items.largeImageURL,'both')}>
                                              <View style={{ padding:10 }}>
                                                <Text dark heavy style={{ fontSize:18 }}>Both</Text>
                                              </View>
                                            </TouchableOpacity>
                                        </Content>
                                      </RBSheet>
                                      {(this.state.onDownload === true ? <Progress /> : null )}
                                  </ImageDetails>
                              )
                            })}
                        </View>
                    )}
            </SafeAreaView>
        )
    }
}

export default DetailImage;

const ImageDetails = styled.ImageBackground`
width:100%;
height:100%;
align-items:center;
flex:1;
`
const SetWp = styled.View`
border-radius:50px;
padding:10px 40px;
background:rgba(240,240,240,0.7);
`

const Content = styled.View`
width:100%;
padding-left:20;
`

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

const Menubar = styled.View`
  position:absolute;
  align-items:center;
  justify-content:center;
  flex-direction:row;
  width:100%;
  padding: 10px 16px;
  margin-top:30px;
`
const NavItems = styled.View`
    padding: 15px 10px;
    align-items:center;
`