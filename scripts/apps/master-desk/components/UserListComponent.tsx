import React from 'react';

import { UserAvatar } from 'apps/users/components/UserAvatar';
import { IDesk, IUserRole } from 'superdesk-api';
import { gettext } from 'core/utils';

interface IProps {
    desk: IDesk;
    role: IUserRole;
    deskService: any;
}

interface IState {
    users: any;
    total: number;
}

export class UserListComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            users: [],
            total: 0,
        };
    }

    componentDidMount() {
        const deskMembers = this.props.deskService.deskMembers[this.props.desk._id];

        let users = [], total = 0;
        deskMembers.forEach((user) => {
            if (this.props.role._id === user.role) {
                users.push(user);
                total = total + 1;
            }
        });

        this.setState({
            users: users,
            total: total,
        });
    }

    render() {
        return (
            this.state.total > 0 ? <React.Fragment>
                <div className="sd-board__subheader">
                    <h5 className="sd-board__subheader-title">{this.props.role.name}</h5>
                </div>
                <ul className="sd-list-item-group sd-shadow--z2">
                    {this.state.users.map((user, index) =>
                        <li className="sd-list-item" key={index}>
                            <div className="sd-list-item__border"></div>
                            <div className="sd-list-item__column sd-list-item__column--no-border sd-padding-x--0-5">
                                <UserAvatar user={user} displayStatus={true} />
                            </div>
                            <div className="sd-list-item__column sd-list-item__column--grow sd-list-item__column--no-border">
                                <div className="sd-list-item__row">
                                    <span className="sd-overflow-ellipsis sd-list-item--element-grow">
                                        {user.display_name}
                                    </span>
                                    {/* <span className="sd-text-icon sd-text-icon--aligned-r user-items--locked"><i className="icon-lock"></i>3</span>
                                    <span className="sd-text-icon sd-text-icon--aligned-r user-items--assigned"><i className="icon-pick"></i>2</span> */}
                                </div>
                            </div>
                            <div className="sd-list-item__action-menu">
                                <button className="icn-btn">
                                    <span className="sd-accessibility__btn-text--invisible">
                                        {gettext('More actions')}
                                    </span>
                                    <i className="icon-dots-vertical"></i>
                                </button>
                            </div>
                        </li>,
                    )}
                </ul>
            </React.Fragment> : null
        );
    }
}
