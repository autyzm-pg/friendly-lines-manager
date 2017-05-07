import * as R from "ramda"
import FieldPickerView from "../components/fields/FieldPickerView"
import FieldSimpleView from "../components/fields/FieldSimpleView"

export const Field = (type, defaultSettings = {}) => (settings) => ({
    type,
    def: "",
    verbose: "",
    component: FieldSimpleView,
    ...defaultSettings,
    ...R.dissoc("type", settings)
})

export const TextField = Field("Text")
export const OptionField = Field("Option", {def: 0, options: [], component: FieldPickerView})
export const BoolField = Field("Bool", {def: false})
export const ModelListField = Field("ModelList", {def: [], model: undefined})
export const ChecklistField = Field("Checklist", {def: [], options: []})
export const ImageChecklistField = Field("ImageCheckList", {def: [], options: []})

export const getDefaultModel = R.map(field => field.def)