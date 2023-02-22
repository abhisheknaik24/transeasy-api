import State from '../models/states.js';

const getStates = async (req, res) => {
  if (req.method === 'GET') {
    let states = await State.find({ isActive: true });

    res.status(200).json({
      success: true,
      message: 'States fetched successfully!',
      data: { states: states },
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

const addStates = async (req, res) => {
  if (req.method === 'POST') {
    if (req.body) {
      for (let i of req.body) {
        if (i.state) {
          let state = await State.exists({ state: i.state });

          if (!state) {
            let s = new State({
              state: i.state,
            });

            await s.save();
          }
        }
      }

      let states = await State.find({ isActive: true });

      res.status(200).json({
        success: true,
        message: 'States added successfully!',
        data: { states: states },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Request body is missing!',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

export default {
  getStates,
  addStates,
};
