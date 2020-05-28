import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

const styles = StyleSheet.create({
   view: {
     flex: 2,
    justifyContent: 'center',
   },
  container: {
     height: 300,
    flexWrap: 'wrap',
    alignContent: 'stretch',
  },
  cell: {
     padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
     color: '#ffffff',
    textAlign: 'center',
  }
  });

export default function Chart(props) {
  const { categoryData } = props;
  
  const data = [
    {
      value: categoryData.performance.score,
      label: categoryData.performance.title,
    },
    {
      value: categoryData.accessibility.score,
      label: categoryData.accessibility.title,
    },
    {
      value: categoryData["best-practices"].score,
      label: categoryData["best-practices"].title,
    },
    {
      value: categoryData.seo.score,
      label: categoryData.seo.title,
    },
  ]
  
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        {data.map(item =>
          <View style={styles.cell}>
            <ProgressCircle
              style={ { height: 100, width: 100, } }
              progress={ item.value }
              progressColor={'rgb(134, 65, 244)'}
              startAngle={ -Math.PI * 0.8 }
              endAngle={ Math.PI * 0.8 }
            />
            <Text style={styles.label}>{ item.label }</Text>
          </View>
        )}
      </View>
    </View>
  );
}
