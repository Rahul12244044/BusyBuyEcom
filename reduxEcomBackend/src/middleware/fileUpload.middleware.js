import multer from "multer";
import path from "path"
const upload=path.join(process.cwd(),"uploads")
const sotrage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,upload);
    },
    filename:(req,file,cb)=>{
        console.log("files");
        console.log(file);
        const fileName=Date.now()+"---"+file.originalname;
        cb(null,fileName);
    }
})
const uploads=multer({storage:sotrage});
export default uploads;

