import React, { Component } from 'react'
import { BannerAdSize,BannerAd  } from '@react-native-firebase/admob';

export default class AdmobAds extends Component {
    constructor(props){
        super(props)
        this.state ={
            loaded:false,
            setLoaded:false
        }
        this.IklanID = this.props.iklan
    }

    render(){
          
        return(
                <BannerAd
                    unitId={this.IklanID}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                    requestNonPersonalizedAdsOnly: true,}}
                    onAdLoaded={() => {
                    console.log('Advert loaded');}}
                    onAdFailedToLoad={(error) => {
                    console.error('Advert failed to load: ', error);}}
                />
        )
    }
}