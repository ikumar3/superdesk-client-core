import React from 'react';

import {IDesk, IStage} from 'superdesk-api';
import {gettext} from 'core/utils';

import {CardComponent} from './CardComponent';
import {CardListComponent} from './CardListComponent';

interface IProps {
    desks: Array<IDesk>;
    stages: Array<IStage>;
}

export class OverviewComponent extends React.Component<IProps, {}> {
    getTotalItems(desk: IDesk) {
        return 0;
    }

    render() {
        return (
            <div className="sd-grid-list sd-grid-list--medium sd-grid-list--gap-xl sd-margin-x--5">
                {this.props.desks.map((desk, index) => (
                    <CardComponent
                        key={index}
                        desk={desk}
                        label={gettext('items in production')}
                    >
                        {
                            (this.props.stages?.[desk._id] ?? []).map((item, i) => (
                                <CardListComponent
                                    key={i}
                                    name={item.name}
                                    total={0}
                                />
                            ))
                        }
                    </CardComponent>
                ))}
            </div>
        );
    }
}
