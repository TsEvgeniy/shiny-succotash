const db = require('../../models');
const dotenv = require('dotenv');
const fs = require('fs');
const https = require('https');

dotenv.config();

const Terminal = db.terminal;
const baseUrl = process.env.BASE_URL;

exports.addAgreementDoc = async (req, res, next) => {
  const {
    id,
    fileName
  } = req.body;

  // console.log('all info about agreementDocs: ', req.body);

  const exactFileName = new URL(fileName).pathname,
    newFileName = exactFileName.split('/'),
    fileContract = newFileName[4];

  const file = await fs.createWriteStream(`upload/${fileContract}`),
    request = https.get(req.body.fileName, async function(response) {
      const res = await response.pipe(file);
    });

  const terminalWithAgreement = await Terminal.findOne({_id: id});

  console.log('terminalOneOrNot: ', terminalWithAgreement);

  terminalWithAgreement.contractFile.name = `${fileContract}`;
  terminalWithAgreement.contractFile.source = `${baseUrl}/${fileContract}`;
  terminalWithAgreement.status = 6;  //1 or 6 status

  const terminalFromBotWithFile = new Terminal(terminalWithAgreement);
  await terminalFromBotWithFile.save();

  console.log('terminalWithAgreement', terminalFromBotWithFile);

  res.status(200).send('here we are')
};