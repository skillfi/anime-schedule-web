import * as React from "react";
import {IconButton} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import animeServices from "../../sevices/anime.services";
import {finalize} from "rxjs";
import {IAnime} from "../../types/types";

interface SubscribeProps{
    value: boolean;
    row_id: string;
}
export default class SubscribeComponent extends React.Component<SubscribeProps, { sub: boolean }>{

    anime: IAnime = {_id: '', bookmarks: [], title: '', release_date: new Date(), image: '', rating: 0,
    time:0, quality: 0, country: '', subscribe:false, episodes: 0, tag: [], url: '', episode: [] };

    constructor(props: SubscribeProps) {
        super(props);
        this.state = {sub: false}
        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.fetch = this.fetch.bind(this)
    }

    subscribe(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        let data = new FormData()
        data.append('anime_id', this.props.row_id)
        animeServices.subscribe(data)
            .pipe(finalize(()=> {
                this.setState({sub: true})
                this.fetch()
            }))
            .subscribe(() => {})
    }

    fetch(){
        animeServices.getById(this.props.row_id)
            .pipe(finalize(()=>this.setState({sub: this.anime.subscribe})))
            .subscribe((response) => {
                this.anime = response.data.data
        })
    }

    componentDidMount() {
        this.setState({sub: this.props.value})
    }

    unsubscribe(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        animeServices.unsubscribe(this.props.row_id)
            .pipe(finalize(()=> this.fetch()))
            .subscribe(() => {})
    }

    render() {
        return (
            <strong defaultValue={this.props.row_id}>
                {!this.state.sub ? <IconButton onClick={this.subscribe}
                                    defaultValue={this.props.row_id}
                                    color={'secondary'}><AddIcon/></IconButton>: <IconButton defaultValue={this.props.row_id}
                                                                                             onClick={this.unsubscribe}
                                                                                             color={"secondary"}><RemoveIcon/></IconButton>}
            </strong>
        );
    }
}

// export default function SubscribeComponent(props: SubscribeProps){
//     const [sub, setSubscribe] = useState<boolean>(false)
//     const buttonElement = React.useRef<HTMLButtonElement | null>(null);
//
//     function subscribe(event: React.MouseEvent<HTMLButtonElement>) {
//         event.preventDefault()
//         let data = new FormData()
//         data.append('anime_id', props.row_id)
//         animeServices.subscribe(data)
//             .subscribe(() => {}, ((e)=>alert(e)), (()=>setSubscribe(false)))
//     }
//
//     function unsubscribe(event: React.MouseEvent<HTMLButtonElement>) {
//         event.preventDefault()
//         animeServices.unsubscribe(props.row_id)
//             .subscribe(() => {}, ((e)=>alert(e)), (()=>setSubscribe(false)))
//     }
//
//     useEffect(() => {
//         animeServices.getById(props.row_id).subscribe((response) => {
//             setSubscribe(response.data.data.subscribe)
//         })
//     }, [props.row_id, sub])
//
//     return (
//         <strong defaultValue={props.row_id}>
//             {!sub ? <IconButton onClick={subscribe}
//                                 ref={buttonElement}
//                                 defaultValue={props.row_id}
//                                 color={'secondary'}><AddIcon/></IconButton>: <IconButton defaultValue={props.row_id}
//                                ref={buttonElement}
//                                onClick={unsubscribe}
//                                color={"secondary"}><RemoveIcon/></IconButton>}
//         </strong>
//     )
// }