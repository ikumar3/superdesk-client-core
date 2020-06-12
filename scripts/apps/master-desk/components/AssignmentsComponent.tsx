import React from 'react';

import { IDesk } from 'superdesk-api';
import { gettext } from 'core/utils';

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
                    <div className="sd-board" key={index}>
                        <div className="sd-board__header sd-board__header--clickable">
                            <h3 className="sd-board__header-title">{desk.name}</h3>
                        </div>
                        <div className="sd-board__content sd-padding-t--1">
                            <div className="sd-board__content-block">
                                <ul className="sd-board__list">
                                    <li className="sd-board__list-item">
                                        <span className="sd-board__item-count--large">30</span>
                                        <p className="sd-board__count-label sd-board__count-label--l">
                                            {gettext('unassigned items of')}
                                            <strong>98</strong>
                                            {gettext('in production')}
                                        </p>
                                    </li>
                                    {this.state.statuses.map((status, i) => (
                                        <li className="sd-board__list-item" key={i}>
                                            <h6 className={
                                                'sd-board__list-item-title sd-board__list-item-title--' + status._id
                                            }>
                                                {status.name}
                                            </h6>
                                            <span className="badge orange--600 sd-margin-r--0-5">{0}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
