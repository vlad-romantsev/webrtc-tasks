import { useEffect, useRef } from 'react'

interface Props {
    stream: MediaStream | null
}

export default function VideoPlayer({ stream }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);


    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true
        if (stream) {
            video.srcObject = stream;
            const play = async () => {
                try { await video.play() } catch {}
            }
            play();
        } else {
            video.srcObject = null
        }
    }, [stream])


    return (
        <video
            ref={videoRef}
            className="w-full aspect-video bg-black rounded-2xl"
            playsInline
            autoPlay
        />
    )
}