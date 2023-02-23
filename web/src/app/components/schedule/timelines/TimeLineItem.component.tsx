import * as React from 'react';
import {EpisodeTimeLine} from "../../../types/types";
import {Card, CardActionArea, CardContent, CardMedia, Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Tools} from "../../../../tools";
import ViewEpisodeComponent from "../../../ui/buttons/view-episode.component";

interface AnimeTimeLineItemProps<T> {
    cell: EpisodeTimeLine
}

export default function TimeLineItemComponent<T>(props: AnimeTimeLineItemProps<T>) {
    const {cell} = props
    const navigate = useNavigate()

    return (
        <Card>
            <CardActionArea onClick={()=>navigate(`/anime/${cell.anime_id}`)}>
                <CardMedia component={'img'} height={100} width={200} image={cell.anime.image} alt={cell.anime.title}/>
                <CardContent sx={{p: 1}}>
                    <ViewEpisodeComponent viewers={Tools.getProperty(cell, 'viewed')}
                                          row_id={Tools.getProperty(cell, '_id')}
                                          view={Tools.getProperty(cell, 'view')}/>
                    <Typography variant="subtitle2" fontSize={15} fontFamily={'Consolas'} textAlign={'center'} >
                        {cell.title}
                    </Typography>
                    <Divider/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}