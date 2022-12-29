import * as React from "react";
import {CaretUp, UserCircle, CaretDown, Alien, SignOut} from 'phosphor-react'

interface BProps {
    text?: string
}
export default class AnHeaderButtonComponent extends React.Component<BProps, any>{

    constructor(props: BProps) {
        super(props);
    }

    render() {
        return (
            <button>
                <UserCircle/>
                {this.props.text}
                <CaretDown/>
            </button>
        );
    }
}