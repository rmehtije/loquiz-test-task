import React from "react";
import Table from 'react-bootstrap/Table';

export interface iTeam {
    name: string;
    odometer: number;
    playTime: string;
    totalScore: number;
}

export interface iGameInfo {
    gameTitle: string;
    teams: iTeam[];
}

interface iGameInfoProps {
    gameInfo: iGameInfo;
}

export class GameInfoTableComponent extends React.Component<iGameInfoProps, any> {

    render(): React.ReactNode {
        const { gameInfo } = this.props;

        return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Teams</th>
                            <th>Odometer</th>
                            <th>Playtime</th>
                            <th>Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameInfo.teams.map((team: iTeam, i: number) => {
                            return (
                                <tr>
                                    {i == 0 && <td rowSpan={gameInfo.teams.length}>{gameInfo.gameTitle}</td>}
                                    <td>{team.name}</td>
                                    <td>{team.odometer}</td>
                                    <td>{team.playTime}</td>
                                    <th>{team.totalScore}</th>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
        );
    }
}
