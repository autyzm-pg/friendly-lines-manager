import React from "react"
import {Item, List, ListItem, Picker, Right, Text, View} from "native-base"
import * as R from "ramda"

export default StepListView = ({step, model, activeConfig}) => (
    <View>
        <List>
            {
                step.fields.map(fieldName => {
                    const field = model[fieldName]
                    const FieldComponent = field.component
                    return (
                        <ListItem key={fieldName}>
                            <FieldComponent verbose={field.verbose} field={R.dissoc("component", field)} value={activeConfig[fieldName]}/>
                        </ListItem>
                    )
                })
            }

        </List>
    </View>
)