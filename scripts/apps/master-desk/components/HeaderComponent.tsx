import React from 'react';

import { CheckButtonGroup, RadioButton } from 'superdesk-ui-framework/react';
import { gettext } from 'core/utils';

interface IProps {
    activeTab?: string;
    onTabChange(tab: string): void;
}

interface IState {
    currentTab: string;
}

export class HeaderComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentTab: 'overview'
        };

        this.changeTab.bind(this);
    }

    changeTab(tab: string) {
        this.setState({ currentTab: tab });
        this.props.onTabChange(tab);
    }

    render() {
        return (
            <div className="sd-main-content-grid__header">
                <div className="subnav">
                    <div className="button-group button-group--left button-group--padded">
                        <CheckButtonGroup>
                            <RadioButton value={this.state.currentTab} options={[
                                { value: 'overview', label: gettext('Overview') },
                                { value: 'users', label: gettext('Users') },
                                { value: 'assignments', label: gettext('Assignments') }
                            ]} onChange={(value) => this.changeTab(value)} />
                        </CheckButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}
