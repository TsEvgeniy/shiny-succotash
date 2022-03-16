const { Api } = require('../helper/api.helper');
const { authGenerator } = require('../middlewares/authGeneratorForNits');

exports.getInfoSubjectByTin = async(req, res, next) => {
  try {
    const { tin, pinfl } = req.query;

    const auth = authGenerator();

    if (tin) {
      const info = await Api({
        host: 'https://api.ofd.uz',
        url: `/ccm-api/info/subject/by-tin-pinfl?tin=${tin}&lang=uz`,
        auth
      }),
        balance = await Api({
          host: 'https://api.ofd.uz',
          url: `/ccm-api/info/balance/by-tin?tin=${tin}`,
          auth
        });

      res.send({...info.data, ...balance.data});

    } else {
      const info = await Api({
          host: 'https://api.ofd.uz',
          url: `/ccm-api/info/subject/by-tin-pinfl?pinfl=${pinfl}&lang=uz`,
          auth
        }),
        balance = await Api({
          host: 'https://api.ofd.uz',
          url: `/ccm-api/info/balance/by-tin?pinfl=${pinfl}`,
          auth
        });

      res.send({...info.data, ...balance.data});
    }
      // info = await Api({
      //   host: 'https://api.ofd.uz',
      //   url: `/ccm-api/info/subject/by-tin-pinfl?tin=${tin}&lang=uz`,
      //   auth
      // }),
      // balance = await Api({
      //   host: 'https://api.ofd.uz',
      //   url: `/ccm-api/info/balance/by-tin?tin=${tin}`,
      //   auth
      // });
    // res.send({...info.data, ...balance.data});
  } catch (error) {
    next(error);
  }
};

exports.getInfoRegions = async(req, res, next) => {
  try {
    const { lang } = req.query,
    resApi = await Api({
      host: 'https://api.ofd.uz',
      url: `/ccm-api/info/region-all?lang=${lang ? lang : 'uz'}`,
      auth: authGenerator()
    });
    res.send(resApi);
  } catch (error) {
    next(error);
  }
};

exports.getInfoDistrictsByRegion = async(req, res, next) => {
  try {
    const { code, lang } = req.query,
      resApi = await Api({
        host: 'https://api.ofd.uz',
        url: `/ccm-api/info/distrct/by-region?region_code=${code}&lang=${lang ? lang : 'uz'}`,
        auth: authGenerator()
    });
    res.send(resApi);
  } catch (error) {
    next(error);
  }
};

exports.getInfoActivityGroup = async(req, res, next) => {
  try {
    const { lang } = req.query,
      resApi = await Api({
        host: 'https://api.ofd.uz',
        url: `/ccm-api/info/activity-group?lang=${lang ? lang : 'uz'}`,
        auth: authGenerator()
    });
    res.send(resApi);
  } catch (error) {
    next(error);
  }
};

exports.getInfoActivityList = async(req, res, next) => {
  try {
    const { code, lang } = req.query,
      resApi = await Api({
        host: 'https://api.ofd.uz',
        url: `/ccm-api/info/activity-list?group_code=${code}&lang=${lang ? lang : 'uz'}`,
        auth: authGenerator()
    });
    res.send(resApi);
  } catch (error) {
    next(error);
  }
};

exports.postAddStore = async(req, res, next) => {
  try {
    const resApi = await Api({
      host: 'https://api.ofd.uz',
      url: '/ccm-api/office/add',
      auth: authGenerator(),
      data: {
        "activityGroup": "string",
        "activityType": "string",
        "address": "string",
        "cadastreNumber": "string",
        "districtCode": "string",
        "files": [
          {
            "name": "string",
            "source": "string"
          }
        ],
        "latitude": "string",
        "longitude": "string",
        "name": "string",
        "regionCode": "string",
        "rentNumber": "string",
        "tin": "string"
      }
    })
    res.send(resApi);

  } catch (error) {
    next (error);
  }
};

exports.postAddTerminal = async(req, res, next) => {
  try {
    const resApi = await Api({
      host: 'https://api.ofd.uz',
      url: '/ccm-api/application/tax/add-json',
      auth: authGenerator(),
      data: {
        "applicationFile": [
          {
            "name": "string",
            "source": "string"
          }
        ],
        "ccmCategoryId": "string",
        "ccmSerialNumber": "string",
        "contractFile": [
          {
            "name": "string",
            "source": "string"
          }
        ],
        "officeId": "string",
        "phone": "string",
        "terminalId": "string",
        "tin": "string"
      }
    })
    res.send(resApi);

  } catch (error) {
    next (error);
  }
};
