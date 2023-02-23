import * as React from "react";
import {IconButton} from "@mui/material";
import {Language, LanguageTwoTone} from '@mui/icons-material';
import sessionService from "../../sevices/session.service";
import usersService from "../../sevices/users.service";
import {finalize} from "rxjs";

interface LanguageState{
    language: string
}
export default class LanguageSelectorComponent extends React.Component<any, LanguageState>{

    constructor(props: any) {
        super(props);
        this.state = {language: sessionService.getCurrentUser().language}
        this.updateLanguage = this.updateLanguage.bind(this)
    }

    updateLanguage(language: string){
        usersService.updateUser({language: language})
            // eslint-disable-next-line no-restricted-globals
            .pipe(finalize(()=>location.reload()))
            .subscribe((response)=>{
                sessionService.setCurrentUser(response.data.data)
            })
    }

    checkLanguage(language: string, checked: string){
        if (language == checked){
            return <React.Fragment><LanguageTwoTone/> {language}</React.Fragment>
        }else {
            return <React.Fragment><Language/> {language}</React.Fragment>
        }
    }

    render() {
        const {language} =this.state
        return (
            <React.Fragment>
                <IconButton onClick={()=>this.updateLanguage('ru')}>
                    {this.checkLanguage('ru', language)}
                </IconButton>
                <IconButton onClick={()=>this.updateLanguage('en')}>
                    {this.checkLanguage('en', language)}
                </IconButton>
                <IconButton onClick={()=>this.updateLanguage('uk')}>
                    {this.checkLanguage('uk', language)}
                </IconButton>
                <IconButton onClick={()=>this.updateLanguage('ja')}>
                    {this.checkLanguage('ja', language)}
                </IconButton>
            </React.Fragment>

        );
    }
}