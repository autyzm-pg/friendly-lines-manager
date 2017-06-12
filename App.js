import React from "react"
import Provider from "react-redux/src/components/Provider"
import store from "./app/config/store"
import Layout from "./app/components/containers/Layout"
import Router from "./app/config/routes"
import Expo from 'expo'

export default class App extends React.Component {
    state = {
        isReady: false,
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        })


        this.setState({isReady: true})
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />
        }

        return (
            <Provider store={store}>
                <Layout>
                    <Router/>
                </Layout>
            </Provider>
        )
    }
}
