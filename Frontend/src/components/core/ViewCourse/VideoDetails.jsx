import {useSelector} from "react-redux";
function VideoDetails() {
    const {videokaurl} = useSelector((state) => state.viewCourse);
    // console.log(videokaurl);

    
    return (
        <div className="relative  flex-col items-center top-14 w-[100%] h-[calc(100vh-3.5rem)] overflow-auto bg-richblack-900 pt-5 p-2" >
            {
                videokaurl ===null ? null:<video  src={videokaurl} className="h-[96%] w-[100%] border-richblack-400 border-2" controls="play" muted loop
                 ></video>
            }
            
        </div>
    )
}

export default VideoDetails;