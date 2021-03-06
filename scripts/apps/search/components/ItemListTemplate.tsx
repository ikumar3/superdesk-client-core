import React from 'react';
import {ListTypeIcon} from './ListTypeIcon';
import {ListPriority} from './ListPriority';
import {ListItemInfo, IPropsItemListInfo} from './ListItemInfo';

interface IPropsItemsListTemplate extends IPropsItemListInfo {
    selectingDisabled: boolean;
    getActionsMenu: () => any;
    onMultiSelect: () => any;
}

export class ListItemTemplate extends React.Component<IPropsItemsListTemplate> {
    render() {
        const {item} = this.props;

        return (
            <div>
                <span className="state-border" />
                <ListTypeIcon
                    item={item}
                    onMultiSelect={this.props.onMultiSelect}
                    selectingDisabled={this.props.selectingDisabled}
                />
                {
                    item.priority || item.urgency
                        ? <ListPriority item={item} singleLine={this.props.singleLine} />
                        : null
                }
                <ListItemInfo
                    item={item}
                    openAuthoringView={this.props.openAuthoringView}
                    desk={this.props.desk}
                    ingestProvider={this.props.ingestProvider}
                    highlightsById={this.props.highlightsById}
                    markedDesksById={this.props.markedDesksById}
                    profilesById={this.props.profilesById}
                    swimlane={this.props.swimlane}
                    versioncreator={this.props.versioncreator}
                    narrow={this.props.narrow}
                    isNested={this.props.isNested}
                    showNested={this.props.showNested}
                    toggleNested={this.props.toggleNested}
                    singleLine={this.props.singleLine}
                    customRender={this.props.customRender}
                    viewType={this.props.viewType}
                />
                {this.props.getActionsMenu()}
            </div>
        );
    }
}
