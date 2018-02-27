import React from "react"
import {Button, Icon, List, ListItem, Text, View} from "native-base"
import * as R from "ramda"
import {Field} from "../../../libs/confy/fields/fields"
import {ScrollView, TouchableOpacity} from "react-native"
import styles from "./styles"
import {styled} from "../../../libs/styled"
import {connect} from "react-redux"
import {Modal} from "../../../components/modal/Modal"
import {Model} from "../../../libs/confy/models"
import {ActionItem} from "../../../components/containers/ActionsMenu"
import {Cell, Row, Table} from "../../../components/table/Table"
import {withLink} from "../../../libs/confy/libs/withState"
import {withLog} from "../../../libs/confy/libs/debug"


const onWordAddClick = (resources, onSubmit) =>
    Modal.show(
        <View>
            <Text>Wybierz słowo, które chcesz dodać</Text>
            <ScrollView style={{marginTop: 10}}>
                <List>
                    {resources
                        .map(resource => (
                            <ListItem onPress={() => {
                                Modal.hide()
                                onSubmit(resource)
                            }}>
                                <Text>{resource.name}</Text>
                            </ListItem>
                        ))}
                </List>
            </ScrollView>
        </View>
    )

const AddButton = styled(Button, {
    position: "absolute",
    right: 0,
    bottom: 0,
})

const createNewMaterial = R.curry((model, word) => ({
    ...model.getDefaultConfig(),
    word
}))

const onFieldChange = R.curry((onChange, currentValue, index, fieldName, newValue) => onChange(R.set(
    R.lensPath([index, fieldName]),
    newValue,
    currentValue
)))

const SelectableRow = styled(Row, ({isSelected}) => ({
    backgroundColor: isSelected ? 'rgba(0,0,0, 0.2)' : 'transparent'
}))

const MaterialsTable = ({materials, fields, onRowChange, onRowDelete, selected, onSelect}) => (
    <Table>
        <Row style={styles.tableHeader}>
            <Cell><Text>Słowo</Text></Cell>
            <Cell><Text>W uczeniu</Text></Cell>
            <Cell><Text>W teście</Text></Cell>
            <Cell><Text>Usuń</Text></Cell>
        </Row>
        {materials.map((material, index) => (
            <SelectableRow isSelected={index === selected}
                           key={material.word.name}>
                <Cell>
                    <TouchableOpacity onPress={() => onSelect(index)}>
                        <Text>{material.word.name}</Text>
                    </TouchableOpacity>
                </Cell>
                <Cell>
                    {fields.isInLearningMode.renderField(
                        R.always(material.isInLearningMode),
                        onRowChange(index)
                    )}
                </Cell>
                <Cell>
                    {fields.isInTestMode.renderField(
                        R.always(material.isInTestMode),
                        onRowChange(index)
                    )}
                </Cell>
                <Cell>
                    <ActionItem
                        onSelect={() => onRowDelete(material)}>
                        <Icon name="trash"/>
                    </ActionItem>
                </Cell>
            </SelectableRow>
        ))}
    </Table>
)

const MaterialDetails = ({material = undefined, renderField}) => (
    <ScrollView>
        {!material ? <Text>Wybierz materiał w tabeli obok</Text> :
            <View>
                {renderField(material)}
            </View>
        }
    </ScrollView>
)

const getIndex = (selected, all) => R.findIndex(R.pathEq(['word', 'name'], selected.word.name), all)
const onImagesChange = (onChange, material, all) => (newImages) => onChange(R.assocPath([getIndex(material, all), 'images'], newImages, all))

const _MaterialsArrayInput = ({value, onChange, resources, materialModel, selectedMaterialIndex, selectedMaterialIndexChange, path, config}) => (
    <View style={styles.container}>
        <View style={styles.listContainer}>
            <View>
                <MaterialsTable
                    materials={value}
                    onSelect={selectedMaterialIndexChange}
                    selected={selectedMaterialIndex}
                    onRowChange={onFieldChange(onChange, value)}
                    onRowDelete={material => onChange(value.filter(materialInArray => materialInArray.word.name !== material.word.name))}
                    fields={materialModel.fields}/>
            </View>
            <AddButton onPress={() => onWordAddClick(
                resources.filter(({name}) => !R.contains(name, value.map(R.path(['word', 'name'])))),
                R.pipe(
                    createNewMaterial(materialModel),
                    R.append(R.__, value),
                    onChange
                ))}>
                <Text>Dodaj</Text>
            </AddButton>
        </View>
        <View style={styles.detailsContainer}>
            <MaterialDetails
                material={value[selectedMaterialIndex]}
                renderField={material => materialModel.fields.images.renderField(
                    R.always(material.images),
                    () => onImagesChange(withLog(onChange), material, value),
                    config,
                    [...path, getIndex(material, value), 'images']
                )}
            />
        </View>
    </View>
)

const mapStateToProps = (state, {materialModel}) => ({
    resources: materialModel.fields.word.props.model.mapStateToList(state)
})

const MaterialsArrayInput = R.compose(
    connect(mapStateToProps),
    withLink("selectedMaterialIndex", undefined)
)(_MaterialsArrayInput)

export const MaterialsArrayField = (materialModel) => Field(MaterialsArrayInput, {
    def: [],
    materialModel: Model("Material", materialModel)
})()

