const {transporter}=require("../config");
async function mailsender(email,subject,html){
    let info;
    try {
        info=await transporter.sendMail({
            from:"Shiksha",
            to:email,
            subject:subject,
            html:html,
        })
        return info
    } catch (error) {
        console.log("rror in mailsender file in util folder");
         console.log(error);
         throw Error("error while sending mail");
        // return error
    }
};

module.exports=mailsender;