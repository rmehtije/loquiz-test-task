import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface iForm {
    setGameInfo: Function
}


export class FormComponent extends React.Component<iForm, {gameId: string}> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            gameId: 'FK5TS3QAB',
        };
    
    }

    handleChange(event: InputEvent) {
        this.setState({gameId: event.target.value});
    }

    handleClick() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameId: this.state.gameId })
        };

        fetch('/', requestOptions)
            .then(response => response.json())
            .then(data => this.props.setGameInfo(data));

    }

    render(): React.ReactNode {
        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Game ID"
                    aria-label="Game ID"
                    aria-describedby="basic-addon2"
                    value={this.state.gameId}
                    onChange={this.handleChange.bind(this)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={this.handleClick.bind(this)}>
                    Fetch game info
                </Button>
            </InputGroup>
        )
    }
}