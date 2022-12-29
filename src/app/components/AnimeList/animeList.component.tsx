import * as React from "react";
import AnimeService from "../../sevices/anime.services";

export default class AnimeListComponent extends React.Component<any, any>{

    constructor(props: any, private animeService: typeof AnimeService) {
        super(props);
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}