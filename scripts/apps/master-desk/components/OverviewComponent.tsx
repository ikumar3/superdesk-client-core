import React from 'react';

import { IDesk, IStage } from 'superdesk-api';
import { gettext } from 'core/utils';

interface IProps {
    desks: IDesk[];
    stages: IStage[];
}

interface IState { }

export class OverviewComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    getTotalItems(desk: IDesk) {
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
                                        <span className="sd-board__item-count--large">{this.getTotalItems(desk)}</span>
                                        <p className="sd-board__count-label">{gettext('items in production')}</p>
                                        <div className="sd-board__doughnut-chart">
                                            <span className="sd-board__doughnut-chart-number">{this.getTotalItems(desk)}</span>
                                        </div>
                                    </li>
                                    {this.props.stages && this.props.stages[desk._id] ? this.props.stages[desk._id].map((stage, index) => (
                                        <li className="sd-board__list-item" key={index}>
                                            <h6 className="sd-board__list-item-title">{stage.name}</h6>
                                            <span className="badge orange--600 sd-margin-r--0-5">{stage.total || 0}</span>
                                        </li>
                                    )) : null}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
