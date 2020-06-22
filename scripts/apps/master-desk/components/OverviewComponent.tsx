import React from 'react';

import { IDesk, IStage } from 'superdesk-api';
import { gettext } from 'core/utils';

import { CardComponent } from './CardComponent';
import { CardListComponent } from './CardListComponent';

interface IProps {
    desks: Array<IDesk>;
    stages: Array<IStage>;
}

export class OverviewComponent extends React.Component<IProps, {}> {
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
                    <CardComponent desk={desk}
                        label={gettext('items in production')} key={index}>
                        {this.props.stages[desk._id] && this.props.stages[desk._id].map((item, i) => (
                            <CardListComponent name={item.name} total={0} key={i} />
                        ))}
                    </CardComponent>
                ))}
            </div>
        );
    }
}
