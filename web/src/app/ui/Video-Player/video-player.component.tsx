import * as React from "react";
import {useRef, useState} from "react";
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {IconButton} from "@mui/joy";

export default function VideoPlayerComponent(props: {src: string}){
    const {src} = props
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [progress, setProgress] = useState(0)
    const videoRef = useRef(null)

    function togglePlay(){
        if (isPlaying){
            // @ts-ignore
            videoRef.current.pause()
        } else {
            // @ts-ignore
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    function handleProgress(){
        // @ts-ignore
        const duration = videoRef.current.duration;
        // @ts-ignore
        const currentTime = videoRef.current.currentTime
        const progress = (currentTime / duration) * 100;
        setProgress(progress)
    }

    return (
        <div>
            <video onTimeUpdate={handleProgress}
                   ref={videoRef}
                   width={500}
                   height={500}
                   controls>
                <source src={src}/>
            </video>
            <div>
                <IconButton onClick={togglePlay}>
                    {isPlaying ? <PausePresentationIcon/> : <PlayArrowIcon/>}
                </IconButton>
                <progress value={progress} max={'100'}/>
            </div>
        </div>
    )
}