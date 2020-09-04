import React from 'react';

import {UserListComponent} from './UserListComponent';
import {IDesk, IUserRole} from 'superdesk-api';

interface IProps {
    desks: Array<IDesk>;
    deskService: any;
    apiService: any;
}

interface IState {
    roles: Array<IUserRole>;
}

export class UsersComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            roles: [],
        };
    }

    componentDidMount() {
        const api = this.props.apiService;

        api('roles').query().then((result) => {
            this.setState({roles: result._items});
        });
    }

    render() {
        return (
            <div className="sd-kanban-list sd-pdding-x--2 sd-padding-t--2">
                {this.props.desks.map((desk, index) =>
                    <div className="sd-board" key={index}>
                        <div className="sd-board__header">
                            <h3 className="sd-board__header-title">{desk.name}</h3>
                        </div>
                        <div className="sd-board__content sd-padding-t--1">
                            {this.state.roles.map((role, i) => (
                                <UserListComponent
                                    key={i}
                                    desk={desk}
                                    role={role}
                                    deskService={this.props.deskService}
                                />
                            ))}
                        </div>
                    </div>,
                )}
            </div>
        );
    }
}
