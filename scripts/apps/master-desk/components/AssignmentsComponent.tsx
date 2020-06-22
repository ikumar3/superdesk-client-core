import React from 'react';

import { IDesk } from 'superdesk-api';
import { gettext } from 'core/utils';

import { CardComponent } from './CardComponent';
import { CardListComponent } from './CardListComponent'; 

interface IProps {
    desks: Array<IDesk>;
    tasks: any;
}

interface IState {
    statuses: any;
}

export class AssignmentsComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            statuses: [],
        };
    }

    componentDidMount() {
        const tasks = this.props.tasks;
        this.setState({ statuses: tasks.statuses });
    }

    getTotalItems() {
        return 0;
    }

    render() {
        return (
            <div className="sd-grid-list sd-grid-list--medium sd-grid-list--gap-xl sd-margin-x--5">
                {this.props.desks.map((desk, index) => (
                    <CardComponent desk={desk}
                        label={gettext('unassigned items of')} key={index}>
                        {this.state.statuses.map((status, i) => (
                            <CardListComponent name={status.name} total={0} key={i}/>
                        ))}
                    </CardComponent>
                ))}
            </div>
        );
    }
}
