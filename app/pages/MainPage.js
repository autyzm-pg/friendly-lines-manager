import React from "react"

import {
    Container,
    Content,
    Header,
    Body,
    Title,
    Button,
    Text,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    Left,
    Right,
    Footer,
    FooterTab
} from 'native-base'

import {connect} from "react-redux"
import ToastExt from "../libs/ToastExt"
import {Modal} from "../components/modal/Modal"
import {ModeTypes} from "../db/format"


const MainPage = ({history, location, activeConfig}) => (
    <Container>
        <Header>
            <Body>
            <Title>Przyjazne Linie - Menadzer</Title>
            </Body>
        </Header>
        <Content>
            <Button block light onPress={() => {
                history.push("/configurations")
            }}>
                <Text>Konfiguracje</Text>
            </Button>
            <Button block light disabled>
                <Text>Zasoby</Text>
            </Button>
        </Content>
        <Footer>
            <Text>Aktywna konfiguracja: {activeConfig.name} ({activeConfig.mode === ModeTypes.learning ? "uczenie" : "test"})</Text>
            <Body>
            <Button full light  onPress={() =>{
                Modal.textAsk("Huehe?", "TEST").then(resp => console.log("response!!", resp))
            }}>
                <Body><Text>Przejdz do aplikacji</Text></Body>
                <Right><Icon name="arrow-round-forward"/></Right>
            </Button>
            </Body>
        </Footer>
    </Container>
)

const stateToProps = ({configurations}) => ({
    activeConfig: {
        id: configurations.active.id,
        mode: configurations.active.mode,
        name: configurations.all.find(config => config.id === configurations.active.id).name
    }
})

export default connect(stateToProps)(MainPage)