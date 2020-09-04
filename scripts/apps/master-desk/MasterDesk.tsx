import React from 'react';
import {IDesk, IStage} from 'superdesk-api';
import {
    HeaderComponent,
    OverviewComponent,
    UsersComponent,
    AssignmentsComponent,
} from 'apps/master-desk/components';
import {assertNever} from 'core/helpers/typescript-helpers';
import {gettext} from 'core/utils';

export enum IMasterDeskTab {
    overview = 'overview',
    users = 'users',
    assignments = 'assignments',
}

export function getLabelForMasterDeskTab(tab: IMasterDeskTab): string {
    switch (tab) {
    case IMasterDeskTab.overview:
        return gettext('Overview');
    case IMasterDeskTab.users:
        return gettext('Users');
    case IMasterDeskTab.assignments:
        return gettext('Assignments');
    default:
        return assertNever(tab);
    }
}

interface IProps {
    desks: any;
    api: any;
    tasks: any;
}

interface IState {
    desks: Array<IDesk>;
    stages: Array<IStage>;
    currentTab: IMasterDeskTab;
}

export class MasterDesk extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentTab: IMasterDeskTab.overview,
            desks: [],
            stages: [],
        };
    }

    componentDidMount() {
        const desks = this.props.desks;

        desks.initialize().then(() => {
            this.setState({desks: desks.desks._items});
            this.setState({stages: desks.deskStages});
        });
    }

    render() {
        return (
            <div className="sd-content-wrapper__main-content-area sd-main-content-grid">
                <HeaderComponent onTabChange={(tab) => this.setState({currentTab: tab})} />
                <div className="sd-main-content-grid__content">
                    <div className="sd-main-content-grid__content-inner">
                        {(() => {
                            switch (this.state.currentTab) {
                            case IMasterDeskTab.overview:
                                return (
                                    <OverviewComponent
                                        desks={this.state.desks}
                                        stages={this.state.stages}
                                    />
                                );
                            case IMasterDeskTab.users:
                                return (
                                    <UsersComponent
                                        desks={this.state.desks}
                                        apiService={this.props.api}
                                        deskService={this.props.desks}
                                    />
                                );
                            case IMasterDeskTab.assignments:
                                return (
                                    <AssignmentsComponent
                                        desks={this.state.desks}
                                        tasks={this.props.tasks}
                                    />
                                );
                            default:
                                return assertNever(this.state.currentTab);
                            }
                        })()}
                    </div>
                </div>
            </div>
        );
    }
}
