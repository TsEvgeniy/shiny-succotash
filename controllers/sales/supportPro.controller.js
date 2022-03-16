const { Api } = require('../../helper/api.helper');

exports.blockUnblockRestartTerminal = async (req, res, next) => {
    try {
        const paxData = {
            terminalId,
            terminalPushCmd
        } = req.body;

        console.log("&", req.body);

        const resApiPax = await Api({
            host: 'http://10.0.2.201:1077',
            url: '/api/Terminal/PushCmdToTerminal',
            type: 'post',
            data: paxData,
            pax: true
        });

        res.status(200).send(resApiPax);
    } catch (error) {
        next(error);
    };
};

exports.searchTerminal = async (req, res, next) => {
    try {

        const paxData = {
            pageNo: 1,
            pageSize: 1,
            terminalSearchOrderBy: 0,
            status: 0,
            snNameTID: req.query.snNameTID,
            includeGeoLocation: true,
            includeInstalledApks: true,
            includeInstalledFirmware: true
        };

        console.log("^ paxData", req.query.snNameTID);

      const resApiPax = await Api({
            host: 'http://10.0.2.201:1077',
            url: '/api/Terminal/SearchTerminal',
            type: 'post',
            data: paxData,
          pax:true
        });

        res.status(200).send(resApiPax.result.pageInfo.dataSet);
    } catch (error) {
        next(error);
    };
}

exports.allSupportPro = (req, res, next) => {
    res.status(200).send('SupportPro Board');
};

exports.addSupportPro = (req, res, next) => {
    res.status(200).send('Add SupportPro');
};

exports.updateSupportPro = (req, res, next) => {
    res.status(200).send('Update SupportPro');
};

exports.deleteSupportPro = (req, res, next) => {
    res.status(200).send('Delete SupportPro');
};