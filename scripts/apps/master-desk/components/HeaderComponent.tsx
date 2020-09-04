import React from 'react';

import {CheckButtonGroup, RadioButton} from 'superdesk-ui-framework/react';
import {IMasterDeskTab, getLabelForMasterDeskTab} from '../MasterDesk';

interface IProps {
    activeTab?: string;
    onTabChange(tab: IMasterDeskTab): void;
}

interface IState {
    currentTab: IMasterDeskTab;
}

export class HeaderComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentTab: IMasterDeskTab.overview,
        };

        this.changeTab.bind(this);
    }

    changeTab(tab: IMasterDeskTab) {
        this.setState({currentTab: tab});
        this.props.onTabChange(tab);
    }

    render() {
        const tabs = Object.values(IMasterDeskTab).map((tab) => ({value: tab, label: getLabelForMasterDeskTab(tab)}));

        return (
            <div className="sd-main-content-grid__header">
                <div className="subnav">
                    <div className="button-group button-group--left button-group--padded">
                        <CheckButtonGroup>
                            <RadioButton
                                value={this.state.currentTab}
                                options={tabs}
                                onChange={(value: IMasterDeskTab) => this.changeTab(value)}
                            />
                        </CheckButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}
