import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Logo from "./assets/logo.svg"
import Chart from './components/Chart'

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: '#232425',
      paddingVertical: 64,
      paddingHorizontal: 24,
    },
    input: {
      alignSelf: 'stretch',
      backgroundColor: '#ffffff',
      padding: 12,
      borderRadius: 24,
      marginBottom: 12,
      textAlign: 'center',
    },
   button: {
    backgroundColor: '#0070EA',
    padding: 4,
    borderRadius: 24,
  },
  
    logoContainer: {
      height: 32,
      paddingBottom: 32,
      justifyContent: 'center',
      alignItems: 'center',
     },
     inputContainer: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     }
  });

export default function App() {
  
  const [isFetching, setIsFetching] = useState(false)
  const [locale, setLocale] = useState("fi")
  const [siteToAnalyze, setSiteToAnalyze] = useState("")
  
  const [lighthouseData, setLighthouseData] = useState(null)
  
  const baseUrl = "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed"
  const categories = "category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=SEO"
  const apiKey = "AIzaSyBLNILulyvlDDDmYg8uYBqp3vC7upw5EHY"
  
  const dataReceived = (data) => {
    setLighthouseData(data)
    setIsFetching(false)
  
    console.log(data)
  
  }
  
  const fetchData = () => {
    const url = `${baseUrl}?${categories}&locale=${locale}&url=${encodeURIComponent(siteToAnalyze)}&key=${apiKey}`
    setIsFetching(true)
    
    fetch(url)
      .then(response => response.json())
      .then(data => dataReceived(data))
    
    console.log(url)
  }
  
  return (
    <View style={styles.view}>
      <View style={styles.logoContainer}>
        <Logo width={150} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={siteToAnalyze}
          onChangeText={text => setSiteToAnalyze(text)}
          placeholder="https://example.com"
        />
        <View style={styles.button}>
          <Button
            color={'#ffffff'}
            title={isFetching === true ? "Analysoidaan..." : "Analysoi"}
            onPress={() => fetchData()}
          />
        </View>
      </View>
      {lighthouseData !== null &&
      <Chart categoryData={lighthouseData.lighthouseResult.categories}/>
      }
      {lighthouseData === null &&
      <Chart categoryData={
        {
          "performance": {score: 0, label: "Suoritus"},
          "seo": {score: 0, label: ""},
          "accessibility": {score: 0, label: ""},
          "best-practices": {score: 0, label: ""}
        }}
      />
      }
    </View>
  );
}
