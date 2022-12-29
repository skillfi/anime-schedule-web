import * as React from "react";

export default class SidebarTogglerComponent extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={'sidebar-toggler ml-auto mr-3'} style={{marginLeft: 'auto', marginRight: '1.5rem'}}>
                <a className={'btn nav-link'}></a>
            </div>
        );
    }
}