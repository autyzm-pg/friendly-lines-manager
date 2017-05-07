import StepListView from "../components/steps/StepListView"
export const Step = (name, fields) => ({type: "Step", name, fields, component: StepListView})
export const FullStep = (name, field) => ({type: "Step", name, fields: [field], component: StepListView})