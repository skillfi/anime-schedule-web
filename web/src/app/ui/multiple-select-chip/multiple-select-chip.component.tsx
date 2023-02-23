import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem as Menu,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Theme
} from "@mui/material";
import * as React from "react";
import UserListService from "../../sevices/user_list.services";
import {finalize} from "rxjs";
import animeServices from "../../sevices/anime.services";
import {IAnime} from "../../types/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 50,
            width: 25,
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
    all_bookmarks: string[]
}

export default class MultipleSelectChipComponent extends React.Component<MultiplyProps, {
    bookmark: string[],
    all: string[], anime: IAnime
}> {
    constructor(props: MultiplyProps) {
        super(props);
        this.state = {
            bookmark: this.props.bookmarks, all: [], anime: {
                _id: '',
                bookmarks: props.bookmarks,
                title: '',
                release_date: new Date(),
                image: '',
                rating: 0,
                time: 0,
                quality: 0,
                country: '',
                subscribe: false,
                episodes: 0,
                tags: [],
                url: '',
                episode: [],
                full_title: '',
                description: [],
                aid: 0,
                title_jp: '',
                title_en: ''
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.fetch = this.fetch.bind(this)
    }

    all: string[] = []

    fetch() {
        animeServices.getById(this.props.row_id)
            .pipe(finalize(() => this.setState({bookmark: this.state.anime.bookmarks})))
            .subscribe((response) => {
                this.setState({anime: response.data.data})
            })
    }

    handleChange(event: SelectChangeEvent<typeof this.state.bookmark>) {
        event.preventDefault()
        const list = event.target.value
        const data = {
            anime_id: this.props.row_id,
            anime_list: list
        }
        UserListService.updateMyList(data)
            .pipe(finalize(() => this.fetch()))
            .subscribe(((response) => {
                this.setState({anime: response.data.data})
            }))
    }

    render() {
        return (
            <FormControl sx={{width: 'max-content', minWidth: 100}}>
                <InputLabel id="demo-multiple-chip-label">BookMark</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={this.state.bookmark}
                    onChange={this.handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.2}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} size={'small'} variant={'outlined'}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {this.props.all_bookmarks.map((book) => (
                        <Menu
                            key={book}
                            value={book}
                            sx={{bgcolor: 'transparent', fontSize: 10}}
                        >
                            {book}
                        </Menu>
                    ))}
                </Select>
            </FormControl>
        );
    }
}