import React from 'react';

interface IProps {
    name: string;
    total: number;
}

export class CardListComponent extends React.Component<IProps, {}> {
    render() {
        return (
            <li className="sd-board__list-item">
                <h6 className="sd-board__list-item-title">{this.props.name}</h6>
                <span className="badge orange--600 sd-margin-r--0-5">
                    {this.props.total || 0}
                </span>
            </li>
        );
    }
}
