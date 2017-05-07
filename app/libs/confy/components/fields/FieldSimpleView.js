import React from "react"
import {Right, Text, View} from "native-base"

export default FieldSimpleView = ({field, value, verbose}) => (
    <View>
        <Text>{verbose}</Text>
        <Right>
            <Text>{value.toString()}</Text>
        </Right>
    </View>
)