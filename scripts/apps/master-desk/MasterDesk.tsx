import React from 'react';

import { IDesk, IStage } from 'superdesk-api';

import {
    HeaderComponent,
    OverviewComponent,
    UsersComponent,
    AssignmentsComponent
} from 'apps/master-desk/components';

interface IProps {
    desks: any;
    api: any;
    tasks: any;
}

interface IState {
    desks: IDesk[];
    stages: IStage[];
    currentTab: string;
}

export class MasterDesk extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentTab: 'overview',
            desks: [],
            stages: []
        };
    }

    componentDidMount() {
        const desks = this.props.desks;

        desks.initialize().then(() => {
            this.setState({ desks: desks.desks._items });
            this.setState({ stages: desks.deskStages });
        });
    }

    renderComponent() {
        switch (this.state.currentTab) {
            case 'overview':
                return <OverviewComponent desks={this.state.desks} stages={this.state.stages} />;
            case 'users':
                return <UsersComponent desks={this.state.desks} apiService={this.props.api} deskService={this.props.desks} />
            case 'assignments':
                return <AssignmentsComponent desks={this.state.desks} tasks={this.props.tasks} />

            default:
                return <OverviewComponent desks={this.state.desks} stages={this.state.stages} />;
        }
    }

    render() {
        return (
            <div>
                <HeaderComponent onTabChange={(tab) => this.setState({ currentTab: tab })} />
                <div className="sd-main-content-grid__content">
                    <div className="sd-main-content-grid__content-inner">
                        {this.renderComponent()}
                    </div>
                </div>
            </div>
        );
    }
}
