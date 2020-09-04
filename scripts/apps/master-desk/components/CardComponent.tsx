import React from 'react';

import {IDesk} from 'superdesk-api';

interface IProps {
    desk: IDesk;
    label: string;
}

export class CardComponent extends React.Component<IProps, {}> {
    getTotalItems(desk: IDesk) {
        return 0;
    }

    render() {
        return (
            <div className="sd-board">
                <div className="sd-board__header sd-board__header--clickable">
                    <h3 className="sd-board__header-title">{this.props.desk.name}</h3>
                </div>
                <div className="sd-board__content sd-padding-t--1">
                    <div className="sd-board__content-block">
                        <ul className="sd-board__list">
                            <li className="sd-board__list-item">
                                <span className="sd-board__item-count--large">
                                    {this.getTotalItems(this.props.desk)}
                                </span>
                                <p className="sd-board__count-label">{this.props.label}</p>
                                <div className="sd-board__doughnut-chart">
                                    <span className="sd-board__doughnut-chart-number">
                                        {this.getTotalItems(this.props.desk)}
                                    </span>
                                </div>
                            </li>
                            {this.props.children}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
