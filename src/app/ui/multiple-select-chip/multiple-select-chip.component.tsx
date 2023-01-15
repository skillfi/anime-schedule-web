import {
    Box, Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent, Theme,
    useTheme
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import UserListService from "../../sevices/user_list.services";
import {finalize} from "rxjs";
import {IAnime} from "../../types/types";
import animeServices from "../../sevices/anime.services";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 2 + ITEM_PADDING_TOP,
            width: 50,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface MultiplyProps{
    bookmarks: string[];
    row_id: string;
}

export default function MultipleSelectChip(props: MultiplyProps) {
    const theme = useTheme();
    const [bookmark, setBookmark] = useState<string[]>([]);
    const [bookmarks, setBookmarks] = useState<string[]>([])
    const formData = new FormData()

    useEffect(()=>{
        let lists: string[] = []
        UserListService.get_lists_names(props.row_id)
            .pipe(finalize(()=>setBookmark(lists)))
            .subscribe((response)=>{
            if (response.status === 200){
                response.data.data.map((mark)=>{
                    lists.push(mark.bookmark_name)
                })
            }
            else if(response.status === 401){
                // eslint-disable-next-line no-restricted-globals
                location.reload()
            }
        })
    }, [props.row_id])

    const handleChange = (event: SelectChangeEvent<typeof bookmark>) => {
        event.preventDefault()
        const list = event.target.value
        const data = {
            anime_id: props.row_id,
            anime_list: list
        }
        UserListService.updateMyList(data)
            .pipe(finalize(()=>setBookmark(
                typeof list === 'string' ? list.split(',') : list)))
            .subscribe((()=>{}))
            .unsubscribe()
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="demo-multiple-chip-label">BookMark</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={bookmark}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.bookmarks.map((book) => (
                        <MenuItem
                            key={book}
                            value={book}
                            style={getStyles(book, bookmark, theme)}
                        >
                            {book}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}