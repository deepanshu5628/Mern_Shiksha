const {transporter}=require("../config");
async function mailsender(email,subject,html){
    try {
        let info=await transporter.sendMail({
            from:"Shiksha",
            to:email,
            subject:subject,
            html:html,
        })
    } catch (error) {
        console.log("error in mailsender file in util folder");
        console.log(error);
    }
};

module.exports=mailsender;