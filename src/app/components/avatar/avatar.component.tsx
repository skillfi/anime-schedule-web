import React, {FC, Component} from 'react';
import {Avatar} from "@mui/material";

export interface ILoadImage{
    src: string;
    alt?: string;
    onLoad?(): void;
}

export interface ImageState{
    load: boolean
}

export default class AvatarComponent extends Component<ILoadImage, ImageState>{

    constructor(props: ILoadImage) {
        super(props);
    }

    render() {
        return <Avatar src={this.props.src}/>;
    }
}