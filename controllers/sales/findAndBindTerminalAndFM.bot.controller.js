const db = require('../../models');

const TerminalStorage = db.terminalStorage;
const FiskalModStorage = db.fiskalModStorage;


exports.findAndBind = async (req, res, next) => {
  try {
    const terminal = await TerminalStorage.findOne({'statusExisting': 0}),
      fiskal = await FiskalModStorage.findOne({'statusExisting': 0});

    if ((terminal != null) && (fiskal != null)) {
      await TerminalStorage.updateOne({
        '_id':terminal._id
      },
        {
          $set: {
            'fiskalMod': fiskal._id,
            'statusExisting': 1
          }
        }
        );
      await FiskalModStorage.updateOne({
        '_id': fiskal._id
      },
        {
          $set: {
            'terminal': terminal._id,
            'statusExisting': 1
          }
        }
        );

      const newTerminal = await TerminalStorage.findOne({'_id': terminal._id}),
        newFiskal = await FiskalModStorage.findOne({'_id': fiskal._id});

      res.status(200).send({ newTerminal, newFiskal });
    } else if (terminal == null) res.status(200).send('There is no free terminals');
    else res.status(200).send('There is no free FM');
  } catch (error) {
    next(error);
  };
};