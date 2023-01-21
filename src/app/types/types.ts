import React from "react";

/** ObjectId preview
 * @property {string} $oid - `Object Id`
 */
export interface ObjectId {
    '$oid': string
}

export interface EpisodesResponse{
    data: Episodes[]
}
export interface EpisodeResponse{
    data: Episode[]
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

export interface Episode {
    _id: ObjectId;
    air_date: string;
    duration: number;
    episode_id: number;
    full_title: string;
    title: string;
    anime_id: string;
}

export interface Anime{
    id: string;
    name: string;
    rating: number;
    episodes: number;
    release_date: string;
    subscribe: boolean;
    quality: number;
    image: string;
    series: Episodes[];
}

/** Anime Response
 * @property {Array<IAnime>} data - `Anime Response Data`
 */
export interface AnimeResponse{
    /**
     * Response Data
     * @type {Array<IAnime>}
     * @default []
     */
    data: IAnime[];
}

/** Anime Response
 * @property {IAnime} data - `Response data`
 */
export interface AnimeIdResponse{
    /**
     * Response Data
     * @type {IAnime}
     * @default IAnime
     */
    data: IAnime;
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

export interface LoginResponse {
    data: ILogin
}

export interface ILogout {
    data: []
}

export interface ALState {
    open: boolean;
    style?: any;

    url: string;
}

export interface Episodes{}

/** Anime Interface
 * @property {string} id - `Anime Id`
 * @property {string} name - `Anime Name`
 * @property {number} rating - `Anime Rating`
 * @property {number} episodes - `Anime Episodes`
 * @property {string} release_date - `Anime Release`
 * @property {string} country - `Anime Country`
 * @property {Array<string>} [genres] - `Anime Genres List`
 * @property {number} quality - `Anime Quality`
 * @property {string} image - `Anime Avatar`
 * @property {Array<Episode>} [episode_list] - `Anime Episode List`
 * @property {number} time - `Anime Time`
 * @property {string} [action] - `Actions on Table`
 * @property {boolean} subscribe - `User Subscribe`
 * @property {string} url - `Anime Url`
 */
export interface IAnime {
    id: string;
    name: string;
    rating: number;
    episodes: number;
    release_date: string;
    country: string;
    genres?: string[];
    quality: number;
    image: string;
    episodes_list: Episode[];
    time: number;
    full_name: string;
    actions?: string;
    subscribe: boolean;
    bookmarks: string[]
    url: string;
}

export interface ISetting {
    icon: React.ReactNode | JSX.Element;
    text: string;
    link: string;
}

export interface SettingsArray<ISetting> {
    settings: ISetting[]
    renderSetting: (setting: ISetting) => React.ReactNode
}

export interface MenuListProps<T> {
    items: T[];
    renderItems: (item: T) => JSX.Element;
    anchorElUser: HTMLElement | null;
    handleCloseUserMenu: (event: Object) => void;
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

export interface UserAnimeProps{
    subscription?: boolean;
}

export interface UAnime{
    anime: IAnime;
    props: UserAnimeProps;
}


/** User List Interface
 * @property {IAnime} anime - `Anime object`
 * @property {string} bookmark_id - `Bookmark id`
 * @property {string} id - `List id`
 */
export interface IUserList{
    anime: IAnime;
    bookmark_id: string;
    id: string;
}

/** User Bookmark Model
 * @property {string} bookmark_name - `Name`
 * @property {string} user_id - `Owner Id`
 * @property {string} id - `Row Id`
 */
export interface UserBookmark{
    bookmark_name: string;
}

/** Users Bookmarks
 * @property {IAnime} anime - `Anime Object`
 * @property {string} bookmark_id - `Id`
 * @property {string} id - `id`
 */
export interface UsersMyBookmarks{
    anime: IAnime;
    bookmark_id: string;
    id: string;
}

export interface UserBookmarkResponse{
    data: string[]
}

/** User Bookmark Model
 * @property {Array<IAnime>} anime_list - `list with anime`
 * @property {string} bookmark_name - `Bookmark name`
 * @property {string} id - `User Bookmark id`
 */
export interface UsersBookmark extends UserBookmark{
    anime_list: UsersMyBookmarks[]
}

/** Users List Response
 * @api /users-list/me
 * @property {Array<UsersBookmark>} data - `Users Bookmark Data`
 */
export interface UsersBookmarkResponse{
    data: UsersBookmark[]
}

export interface UserBookmarks{
    data: UserBookmark[]
}

/** User List Response
 * @property {Array<IUserList>} data - `User List`
 */
export interface IUserListMe{
    data: IUserList[]
}

/** User List Interface
 * @property {IUserList} data - `Anime List`
 */
export interface IUsersList{
    data: IUserList
}

export interface IUsersListResponse{
    data: IUsersList[]
}