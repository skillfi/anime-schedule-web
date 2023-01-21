import {
    Box, Chip,
    FormControl,
    InputLabel,
    OutlinedInput,
    Select,
    SelectChangeEvent, Theme,
    useTheme, MenuItem as Menu
} from "@mui/material";
import MenuItem  from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"
import * as React from "react";
import {useEffect, useState} from "react";
import UserListService from "../../sevices/user_list.services";
import {finalize} from "rxjs";
import animeServices from "../../sevices/anime.services";
import {IAnime} from "../../types/types";

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

function getStyles(bookmark: string, bookmarks: readonly string[], theme: Theme) {
    return {
        fontWeight:
            bookmarks.indexOf(bookmark) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface MultiplyProps{
    bookmarks: string[];
    row_id: string;
    all_bookmarks: string[] | undefined
}

// const StyledMenuItem = withStyles(theme => ({
//         fontWeight: theme.typography.fontWeightRegular
//     }
// ))(MenuItem);

export default class MultipleSelectChipComponent extends React.Component<MultiplyProps, { bookmark: string[],
all: string[]}>{

    anime: IAnime = {id: '', bookmarks: [], name: '', release_date: '', image: '', rating: 0,
        time:0, quality: 0, country: '', subscribe:false, episodes: 0, full_name: '', url: '', episodes_list: []};
    constructor(props: MultiplyProps) {
        super(props);
        this.state = {bookmark: [], all: []}
        this.handleChange = this.handleChange.bind(this)
        this.fetch = this.fetch.bind(this)
    }

    all: string[] = []
    fetch(){
        animeServices.getById(this.props.row_id)
            .pipe(finalize(()=>this.setState({bookmark: this.anime.bookmarks})))
            .subscribe((response) => {
                this.anime = response.data.data
            })
    }

    handleChange(event: SelectChangeEvent<typeof this.state.bookmark>){
        event.preventDefault()
        const list = event.target.value
        const data = {
            anime_id: this.props.row_id,
            anime_list: list
        }
        UserListService.updateMyList(data)
            .pipe(finalize(()=> this.fetch()))
            .subscribe((()=>{}))
            .unsubscribe()
    }

    componentDidMount() {
        this.setState({bookmark: this.props.bookmarks})
    }

    render() {
        return (
            <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="demo-multiple-chip-label">BookMark</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={typeof this.state.bookmark == 'string' ? []: this.state.bookmark}
                    onChange={this.handleChange}
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
                    {typeof this.props.all_bookmarks == 'undefined' ?  this.state.bookmark.map((book) => (
                        <Menu
                            key={book}
                            value={book}
                        >
                            {book}
                        </Menu>
                    )): this.props.all_bookmarks.map((book)=>(
                        <Menu
                            key={book}
                            value={book}
                        >
                            {book}
                        </Menu>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export function MultipleSelectChip(props: MultiplyProps) {
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