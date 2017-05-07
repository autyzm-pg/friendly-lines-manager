import React from "react"
import {Item, Picker, Text, View} from "native-base"

const styles = {
    "wrapper": {flex: 1, flexDirection: "row", justifyContent: "space-between"}
}

export default FieldPickerView = ({verbose, field, value}) => (
    <View>
        <Text>{verbose}</Text>
        <View>
            <Picker selectedValue={value}
                    mode="dialog"
                    supportedOrientations={['portrait', 'landscape']}>
                {field.options.map(option => <Item label={option} value={option} key={option}/>)}
            </Picker>
        </View>
    </View>
)