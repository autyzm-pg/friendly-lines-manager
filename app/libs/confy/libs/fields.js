import * as R from "ramda"
import FieldPickerView from "../components/fields/FieldPickerView"
import FieldSimpleView from "../components/fields/FieldSimpleView"
import {notImplementedFunc} from "../../funcs"

export const Field = (defaultSettings = {}, component=FieldSimpleView) => (settings) => ({
    component,
    props: {
        def: undefined,
        verbose: "",
        ...defaultSettings,
        ...settings
    }
})

export const TextField = Field()
export const OptionField = Field({def: 0, options: []}, FieldPickerView)
export const BoolField = Field({def: false})
export const ModelListField = Field({def: [], model: undefined})
export const ChecklistField = Field({def: [], options: []})
export const ImageChecklistField = Field({def: [], options: []})
export const ArrayField = Field({def: []})
export const ObjectField = Field({def: {}})
export const ForeignField = Field()
export const Select = notImplementedFunc
export const MultiOptionField = Field({options: []})
export const UriField = Field({def: ""})
export const IntegerField = Field({def: 0})
export const MultiImageOptionField = Field({options: []})
export const MultiColorField = Field({options: []})
export const MultiSizeField = Field({options: []})

export const getDefaultModel = R.map(field => field.def)