import React from "react";
import Container from 'react-bootstrap/Container';

import { FormComponent } from "./formComponent";
import { GameInfoTableComponent, iGameInfo } from "./gameInfoTableComponent"

interface iApp {
    gameInfo: iGameInfo
}

export class App extends React.Component<{}, iApp> {

    constructor(props: any) {
        super(props);
        this.state = {
            gameInfo: null,
        };
    
    }

    setGameInfo (gameInfo: iGameInfo){
        this.setState({gameInfo: gameInfo});
    }

    render(): React.ReactNode {
        return (
            <Container className="p-3">
                <h1 className="header">Welcome</h1>
                <FormComponent setGameInfo={this.setGameInfo.bind(this)}/>
                {this.state.gameInfo && <GameInfoTableComponent gameInfo={this.state.gameInfo} />}
            </Container>
        );
    }
}
