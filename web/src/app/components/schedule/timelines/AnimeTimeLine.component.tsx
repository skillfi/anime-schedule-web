import * as React from "react";
import {EpisodeTimeLine, IAnime} from "../../../types/types";
import {Box, TableCell, TableRow} from "@mui/material";
import {Timeline} from "@mui/lab";

interface AnimeTimeLineProps<IAnime>{
    timeline: EpisodeTimeLine[];
    renderTimeline: (timeline: EpisodeTimeLine) => JSX.Element;
    date: Date;
    sortBy: 'Previous Month' | 'Previous Week' | 'Today' | 'Tomorrow' | 'Next Week' | 'Next Month' | 'Current Month';
}

export default function AnimeTimeLineComponent<IAnime>(props: AnimeTimeLineProps<IAnime>) {
    const {timeline, renderTimeline, date, sortBy} = props
    const now = new Date();

    function sortByDate(){
        const sorted = new Array<EpisodeTimeLine>();
        timeline.map((line)=>{
            const air_date = new Date(line.air_date)
            if (sortBy === 'Previous Month' && line.anime.title_en && Number(line.eid)){
                if (air_date.getMonth() === date.getMonth() && air_date.getFullYear() === date.getFullYear()){
                    sorted.push(line)
                }

            }
            if (sortBy === 'Previous Week' && line.anime.title_en && Number(line.eid)){
                if (air_date.getDate() === date.getDate() && air_date.getMonth() === date.getMonth() && air_date.getFullYear() === date.getFullYear()){
                    sorted.push(line)
                }

            }
            if (sortBy === 'Today' && line.anime.title_en && Number(line.eid)){
                if (air_date.getDate() === now.getDate() && air_date.getMonth() === now.getMonth() && air_date.getFullYear() === now.getFullYear()){
                    sorted.push(line)
                }

            }
            if (sortBy === 'Tomorrow' && line.anime.title_en && Number(line.eid)){
                if (air_date.getDate() === date.getDate() && air_date.getMonth() === date.getMonth() && air_date.getFullYear() === date.getFullYear()){
                    sorted.push(line)
                }

            }
            if (sortBy === 'Next Week' && line.anime.title_en && Number(line.eid)){
                if (air_date.getDate() === date.getDate() && air_date.getMonth() === date.getMonth() && air_date.getFullYear() === date.getFullYear()){
                    sorted.push(line)
                }
            }
            if (sortBy === 'Current Month' && line.anime.title_en && Number(line.eid)){
                if (air_date.getMonth() === date.getMonth() && air_date.getFullYear() === date.getFullYear()){
                    sorted.push(line)
                }

            }
            if (sortBy === 'Next Month' && line.anime.title_en && Number(line.eid)){
                if (air_date.getMonth() === date.getMonth() && air_date.getFullYear() === date.getFullYear()){
                    sorted.push(line)
                }

            }

        })
        return sorted
    }

    return (
        <TableCell align={'center'}>
            {sortByDate().map(renderTimeline)}
        </TableCell>)
}