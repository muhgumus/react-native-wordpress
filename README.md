React Native Native App Component for Wordpress sites
=========

Wordpress Native App for IOS and ANDROID  

## Installation
Step 1 

    `npm install react-native-vector-icons` 

    `react-native link`

Step 2    

    `npm install react-native-wordpress`

## Usage

    import Wordpress from 'react-native-wordpress';

Basic
     
     <Wordpress url={siteUrl}  />

Advanced

    let strings={
        categories:"Categories", 
        pages:"Pages", 
        searchText:"Write anything for search", 
        homepage:"Home", 
        warningText:"Ops someting is wrong", 
        nowordpressText:"Your address may not be a Wordpress site", 
        noexternalUseText:"Your address is Wordpress site but not accepted external use",  tryanother:"TRY ANOTHER"
        };
       
    <Wordpress url={siteUrl} 
                    color={mainColor} 
                    onLoad={this._onLoad} 
                    strings={strings} />
                    

## Preview 

![alt text](https://github.com/muhgumus/react-native-wordpress/blob/master/preview.gif?raw=true)


## Showcase 
Who using this component ? 

Explorer for Wordpress<br>
![alt text](https://github.com/muhgumus/react-native-wordpress/blob/master/explorer_icon.png?raw=true)

    ANDROID 
    https://play.google.com/store/apps/details?id=com.mx.explorer
   

    IOS 
    Coming soon
