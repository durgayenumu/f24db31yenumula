// const Kite = require('../models/kites');

// exports.kite_list = async function(req, res) {
//   try {
//       const kites = await Kite.find();
//       res.render('kites', { results: kites });
//   } catch (err) {
//       res.status(500).send(`Error: ${err}`);
//   }
// };
  
// //put one update
// // kite controller (controllers/kites.js)
// exports.kite_update_put = async function(req, res) {
//     console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
//     try {
//         let toUpdate = await Kite.findById(req.params.id);
//         // Update properties
//         if (req.body.kite_color) toUpdate.kite_color = req.body.kite_color;
//         if (req.body.material) toUpdate.material = req.body.material;
//         if (req.body.length) toUpdate.length = req.body.length;
//         let result = await toUpdate.save();
//         console.log("Success " + result);
//         res.send(result);
//     } catch (err) {
//         res.status(500);
//         res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
//     }
//   };
  

// // exports.kite_detail = function(req, res) {
// //   res.send('NOT IMPLEMENTED: Kite detail: ' + req.params.id);
// // };

// //read one
// exports.kite_detail = async function(req, res) {
//     console.log("detail" + req.params.id);
//     try {
//         let result = await Kite.findById(req.params.id);
//         res.send(result);
//     } catch (error) {
//         res.status(500);
//         res.send(`{"error": document for id ${req.params.id} not found`);
//     }
//   };

//   //delete one
// exports.kite_delete = async function(req, res) {
//     try {
//         const result = await Kite.findByIdAndDelete(req.params.id);
//         if (!result) {
//             res.status(404).send('Kite not found');
//             return;
//         }
//         res.send(`Kite with id ${req.params.id} was deleted.`);
//     } catch (err) {
//         res.status(500).send(`Error: ${err}`);
//     }
//   };
  
  
  

// exports.kite_create_post = async function(req, res) {
//   let document = new Kite();
//   document.kite_color = req.body.kite_color;
//   document.material = req.body.material;
//   document.length = req.body.length;
//   try {
//     let result = await document.save();
//     res.send(result);
//   } catch (err) {
//     res.status(500);
//     res.send(`{"error": ${err}}`);
//   }
// };

// exports.kite_update_get = async function(req, res) {
//     try {
//         const kite = await Kite.findById(req.params.id);
//         if (!kite) {
//             res.status(404).send('Kite not found');
//             return;
//         }
//         res.render('kite_update', { kite });
//     } catch (err) {
//         res.status(500).send(`Error: ${err}`);
//     }
//   };
  
// //   exports.kite_delete_get = async function(req, res) {
// //     try {
// //         const kite = await Kite.findById(req.params.id);
// //         if (!kite) {
// //             res.status(404).send('Kite not found');
// //             return;
// //         }
// //         res.render('kite_delete', { kite });
// //     } catch (err) {
// //         res.status(500).send(`Error: ${err}`);
// //     }
// //   };
  
// // exports.kite_delete = function(req, res) {
// //   res.send('NOT IMPLEMENTED: Kite delete DELETE ' + req.params.id);
// // };

// // exports.kite_update_put = function(req, res) {
// //   res.send('NOT IMPLEMENTED: Kite update PUT ' + req.params.id);
// // };

const Kite = require('../models/kites');

//Get all Read
exports.kite_list = async function (req, res) {
    try {
        const kites = await Kite.find();
        res.render('kites', { results: kites });
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
};

//create one
exports.kite_create_post = async function (req, res) {
    let document = new Kite();
    document.kite_color = req.body.kite_color;
    document.length = req.body.length;
    document.material = req.body.material;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.kite_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Kite delete DELETE ' + req.params.id);
};

//put one update
// Kite controller (controllers/kites.js)
exports.kite_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Kite.findById(req.params.id);
        // Update properties
        if (req.body.kite_color) toUpdate.kite_color = req.body.kite_color;
        if (req.body.material) toUpdate.material = req.body.material;
        if (req.body.length) toUpdate.length = req.body.length;
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

//read one
exports.kite_detail = async function (req, res) {
    console.log("detail" + req.params.id);
    try {
        let result = await Kite.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

//delete one
exports.kite_delete = async function (req, res) {
    console.log("delete " + req.params.id);
    try {
        const result = await Kite.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};

//single view
exports.kite_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id);
    try {
        result = await Kite.findById(req.query.id);
        res.render('kitesdetail',
            { title: 'Kite Detail', toShow: result });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

exports.kite_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('kitescreate', { title: 'Kite Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}

exports.kite_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Kite.findById(req.query.id)
        res.render('kitesupdate', { title: 'Kites Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.kite_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Kite.findById(req.query.id)
        res.render('kitesdelete', {
            title: 'Kites Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};