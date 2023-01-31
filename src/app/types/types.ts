import React from "react";
import {ISetting} from "../components/Menu/Menu.component";

/** ObjectId preview
 * @property {string} $oid - `Object Id`
 */
export interface ObjectId {
    '$oid': string
}

/** Episode Object
 * @property {ObjectId} _id - `Episode Id`
 * @property {string} air_date - `On Tv`
 * @property {number} duration - `Series Duration`
 * @property {number} episode_id - `Episode Nomer`
 * @property {string} full_title - `Episode Full Title`
 * @property {string} title - `Short Title`
 * @property {string} anime_id - `Anime Id`
 */
export interface Episodes {
    id: string;
    air_date: string;
    duration: number;
    episode_id: number;
    full_title: string;
    title: string;
    anime_id: string;
}

/** Episode Interface
 * @property {string} _id - `Episode id`
 * @property {Date} air_date - `Episode Air Date`
 * @property {number} duration - `Episode Duration`
 * @property {number} episode_id - `Episode Number`
 * @property {string} full_title - `Title in another languages`
 * @property {string} title - `Official Title`
 * @property {string} anime_id - `IAnime _id`
 * @property {Array<string>} viewed - `User Viewed`
 */
export interface Episode {
    _id: string;
    air_date: Date;
    duration: number;
    episode_id: number;
    full_title: string;
    title: string;
    anime_id: string;
    viewed: string[];
    view: boolean;
}

export interface IUser {
    birthday?: string | null;
    email?: string;
    id?: string;
    is_admin: boolean;
    main_image?: string | null;
    name?: string;
    surname?: string;
    nickname?: string;
}

export interface ILogin {
    auth_token: string;
    duration: number;
    user: IUser;
}

export interface ALState {
    open: boolean;
    style?: any;
    url: string;
}

/** Anime Interface
 * @property {string} _id - `Anime Id`
 * @property {Array<string>} bookmarks - `User Bookmarks`
 * @property {string} [country] - `Anime Country`
 * @property {Array<Episode>} episode - `Episodes List`
 * @property {number} episodes - `Episodes Count`
 * @property {string} title - `Anime Title`
 * @property {string} image - `Anime Avatar`
 * @property {string} [title_en] - `Anime Title english`
 * @property {string} [title_jp] - `Anime title Japan`
 * @property {number} quality - `Anime Quality`
 * @property {number} rating - `Anime Rating`
 * @property {Date} release_date - `Anime Release`
 * @property {boolean} subscribe - `User Subscribe`
 * @property {Array<string>} subscribers - `Anime Subscribers`
 * @property {Array<string>} tag - `Anime Tags`
 * @property {number} [time] - `Episodes Time`
 * @property {string} url - `Url for Get Updates`
 */
export interface IAnime {
    _id: string;
    bookmarks: string[];
    country?: string;
    episode: Episode[];
    episodes: number;
    title: string;
    image: string;
    title_en?: string;
    title_jp?: string;
    quality: number;
    rating: number;
    release_date: Date;
    subscribe: boolean;
    subscribers?: string[];
    time?: number;
    url: string;
    description?: string;
    tag: string[]
}



export interface MenuItemProps {
    setting: ISetting;
    onClick: (setting: ISetting) => void
}

/** Infoterm Props
 * @property {string, null, undefined} value - `Component value`
 */
export interface IncotermProps {
    value: string | null | undefined;
}

/** Tabs Render
 * @property {JSX.Element} component - `Render Element`
 */
export interface TabComponent{
    component: JSX.Element;
}

/** Tab Style
 * @property {string} label - `Tab Name`
 * @property {JSX.Element} icon - `Tab Render Icon`
 */
export interface TabProps{
    label: string;
    icon: JSX.Element;
}


/** User Bookmark Model
 * @property {string} bookmark_name - `Name`
 * @property {string} user_id - `Owner Id`
 * @property {string} id - `Row Id`
 */
export interface UserBookmark{
    bookmark_name: string;
}

export interface UserBookmarkResponse{
    data: string[]
}


export interface UserBookmarks{
    data: UserBookmark[]
}

/** User List Interface
 * @property {string} bookmark_name - `Name`
 * @property {Array<IAnime>} anime - `Anime List`
 */
export interface IUsersList{
    bookmark_name: string;
    anime: IAnime[]
    user_id: string;
}

export interface IUsersListResponse{
    data: IUsersList[]
}