const authenticateKey = (req, res, next) => {
    let api_key = req.header('x-api-key');
    //let account = users.find((user) => user.api_key == api_key);

    if (api_key === process.env.api_key) {
        console.log('Chamada API Legítima');
        next();
    } else {
        //Reject request if API key doesn't match
        res.status(403).send({
            error: {
                message: 'Você não tem premissão para realizar essa operação.',
            },
        });
    }

    // if (account) {
    //     //If API key matches
    //     //check the number of times the API has been used in a particular day
    //     let today = new Date().toISOString().split('T')[0];
    //     let usageCount = account.usage.findIndex((day) => day.date == today);
    //     if (usageCount >= 0) {
    //         //If API is already used today
    //         if (account.usage[usageCount].count >= MAX) {
    //             //stop if the usage exceeds max API calls
    //             res.status(429).send({
    //                 error: {
    //                     code: 429,
    //                     message: 'Max API calls exceeded.',
    //                 },
    //             });
    //         } else {
    //             //have not hit todays max usage
    //             account.usage[usageCount].count++;
    //             console.log('Good API call', account.usage[usageCount]);
    //             next();
    //         }
    //     } else {
    //         //Push todays's date and count: 1 if there is a past date
    //         account.usage.push({ date: today, count: 1 });
    //         //ok to use again
    //         next();
    //     }
    // } else {
    //     //Reject request if API key doesn't match
    //     res.status(403).send({
    //         error: { code: 403, message: 'You not allowed.' },
    //     });
    // }
};

module.exports = { authenticateKey };
