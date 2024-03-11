const mailsender = require("../Utils/mailsender");

exports.contactUsController = async (req, res) => {
    try {
        // fetch data from rquest ki body
        let { firstName, lastName, email, phoneNo, message } = req.body;
        // perform basic validation's 
        if (!firstName || !lastName || !email || !phoneNo || !message) {
            return res.status(400).json({
                success: false,
                message: "fill in all the details",
            });
        }
        // send mail to the person who contacted you that you have recieved the quresry 
        let requestermsg = await mailsender(email, "From Shiksha", "your  requrest has been recived we will connect to you shoryly !");
        // send mail to your self 
        let ownermsg = await mailsender("deepanshuyaduvanshi786@gmail.com", `${firstName + lastName} has contacted you `, message);
        // send responce
        res.status(200).json({
            success:true,
            message:"Your requrest has been recived",
            requestermsg,
            ownermsg,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "error in contact us  controller",
            data: error.message,
        });
    }
};
